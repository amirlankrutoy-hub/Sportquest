"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { questMeta, quests, QUEST_BONUS_XP } from "@/data/quests";
import { initialState, levelInfo, newAchievements } from "@/lib/progress";
import { rankSports } from "@/lib/scoring";
import { formatDose, pick, pluralWord, translate } from "@/lib/i18n";
import { exercises } from "@/data/exercises";
import XPBurst from "./XPBurst";

const AppContext = createContext(null);
const STORAGE_KEY = "sport-quest-v1";
const LANG_KEY = "sport-quest-lang";
const DEFAULT_NAME = { ru: "Алексей", en: "Alexey", uz: "Aleksey" };

// Поля, которые сохраняются на сервере (всё, кроме данных входа)
const progressOf = ({ user, ...rest }) => rest;

export function AppProvider({ children }) {
  const [state, setStateRaw] = useState(initialState);
  const [lang, setLangRaw] = useState("ru");
  const [ready, setReady] = useState(false);
  const [burst, setBurst] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const stateRef = useRef(state);
  const syncTimer = useRef(null);

  const setState = useCallback((next) => {
    stateRef.current = next;
    setStateRaw(next);
  }, []);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        // имя по умолчанию теперь зависит от языка, поэтому старое «Алексей» сбрасываем
        const user = { ...initialState.user, ...saved.user };
        if (user.name === "Алексей" && !user.token) user.name = null;
        setState({ ...initialState, ...saved, user });
      }
      const savedLang = localStorage.getItem(LANG_KEY);
      if (["ru", "en", "uz"].includes(savedLang)) setLangRaw(savedLang);
    } catch {}
    setReady(true);
  }, [setState]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangRaw(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
    if (!state.user.token) return;
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${state.user.token}` },
        body: JSON.stringify({ progress: progressOf(state) }),
      }).catch(() => {});
    }, 600);
  }, [state, ready]);

  // Применяет новое состояние, открывает выполненные достижения (с их бонусным XP)
  // и запускает анимацию с итоговым приростом опыта. label — { key, vars } для перевода.
  const commit = useCallback(
    (next, label = null) => {
      const startXp = stateRef.current.xp;
      const prevLevel = levelInfo(startXp).key;
      const unlocked = [];
      for (let i = 0; i < 3; i++) {
        const fresh = newAchievements(next);
        if (!fresh.length) break;
        unlocked.push(...fresh);
        next = {
          ...next,
          unlocked: [...next.unlocked, ...fresh.map((a) => a.id)],
          xp: next.xp + fresh.reduce((n, a) => n + a.xp, 0),
        };
      }
      setState(next);
      const amount = next.xp - startXp;
      const newLevel = levelInfo(next.xp).key;
      if (amount > 0 || unlocked.length) {
        setBurst({ id: Date.now(), amount, label, achievements: unlocked, levelUp: newLevel !== prevLevel ? newLevel : null });
      }
    },
    [setState]
  );

  const finishQuiz = useCallback(
    (answers) => {
      const results = rankSports(answers);
      commit({ ...stateRef.current, answers, results }, { key: "quiz.passed" });
      return results;
    },
    [commit]
  );

  const startQuest = useCallback(
    (questId) => {
      const s = stateRef.current;
      setState({
        ...s,
        activeQuest: questId,
        quests: s.quests[questId] ? s.quests : { ...s.quests, [questId]: { completed: [], startedAt: new Date().toISOString() } },
      });
    },
    [setState]
  );

  const completeDay = useCallback(
    (questId, dayIndex) => {
      const s = stateRef.current;
      const quest = s.quests[questId] ?? { completed: [], startedAt: new Date().toISOString() };
      if (quest.completed.includes(dayIndex)) return;
      const day = quests[questId].days[dayIndex];
      const completed = [...quest.completed, dayIndex];
      const finished = completed.length === quests[questId].days.length;
      commit(
        {
          ...s,
          xp: s.xp + day.xp + (finished ? QUEST_BONUS_XP : 0),
          streak: s.streak + 1,
          quests: { ...s.quests, [questId]: { ...quest, completed, finishedAt: finished ? new Date().toISOString() : null } },
        },
        finished ? { key: "quest.finished", questId } : { key: "quest.dayDone", vars: { n: dayIndex + 1 } }
      );
    },
    [commit]
  );

  const viewSport = useCallback(
    (id) => {
      const s = stateRef.current;
      if (s.viewed.includes(id)) return;
      const next = { ...s, viewed: [...s.viewed, id] };
      if (newAchievements(next).length) commit(next);
      else setState(next);
    },
    [commit, setState]
  );

  const markMapOpened = useCallback(() => {
    const s = stateRef.current;
    const next = { ...s, mapOpened: (s.mapOpened ?? 0) + 1 };
    if (newAchievements(next).length) commit(next);
    else setState(next);
  }, [commit, setState]);

  const resetQuest = useCallback(
    (questId) => {
      const s = stateRef.current;
      setState({ ...s, quests: { ...s.quests, [questId]: { completed: [], startedAt: new Date().toISOString() } } });
    },
    [setState]
  );

  // Имя сохраняется и локально, и на сервере
  const setName = useCallback(
    async (name) => {
      setState({ ...stateRef.current, user: { ...stateRef.current.user, name } });
      const token = stateRef.current.user.token;
      if (token) {
        await fetch("/api/auth/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name }),
        }).catch(() => {});
      }
    },
    [setState]
  );

  // Шаг 1 входа по почте: просим сервер отправить код
  const requestCode = useCallback(
    async (email) => {
      const res = await fetch("/api/auth/email/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const err = new Error(data.error || "generic");
        err.wait = data.wait;
        throw err;
      }
      return data;
    },
    [lang]
  );

  const auth = useCallback(
    async (mode, form, extraHeaders = {}) => {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...extraHeaders },
        // при регистрации и первом входе через Google переносим уже набранный прогресс
        body: JSON.stringify(mode === "login" ? form : { ...form, progress: progressOf(stateRef.current) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "generic");
      const progress = mode !== "register" && data.progress ? data.progress : progressOf(stateRef.current);
      setState({ ...initialState, ...progress, user: data.user });
      return data.user;
    },
    [setState]
  );

  const logout = useCallback(async () => {
    // чтобы Google не входил автоматически сразу после выхода
    window.google?.accounts?.id?.disableAutoSelect();
    // если вход был через Clerk, сначала завершаем сессию там, иначе мост сразу войдёт снова
    await window.Clerk?.signOut?.().catch(() => {});
    setState({ ...initialState });
  }, [setState]);

  // При загрузке проверяем, что сохранённая сессия ещё действительна, и обновляем имя и аватар
  useEffect(() => {
    if (!ready || !state.user.token) return;
    fetch("/api/progress", { headers: { Authorization: `Bearer ${state.user.token}` } })
      .then((r) => (r.status === 401 ? null : r.json()))
      .then((data) => {
        if (data === null) setState({ ...stateRef.current, user: { ...initialState.user } });
        else if (data?.user) setState({ ...stateRef.current, user: { ...stateRef.current.user, ...data.user, name: stateRef.current.user.name || data.user.name } });
      })
      .catch(() => {});
    // проверяем один раз после загрузки
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // помощники перевода
  const i18n = useMemo(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      L: (value) => pick(lang, value),
      plural: (n, key) => pluralWord(lang, n, key),
      dose: (d) => formatDose(lang, d),
      questName: (id) => pick(lang, questMeta(id)?.name),
      dayTitle: (day) => pick(lang, day.title) || pick(lang, exercises[day.ex]?.name),
    }),
    [lang, setLang]
  );

  const level = levelInfo(state.xp);
  const value = {
    ...state,
    ...i18n,
    user: { ...state.user, name: state.user.name || DEFAULT_NAME[lang] },
    needsName: Boolean(state.user.token && !state.user.name),
    requestCode,
    ready,
    level: { ...level, name: i18n.t(level.key), next: level.nextKey ? i18n.t(level.nextKey) : null },
    finishQuiz,
    startQuest,
    completeDay,
    resetQuest,
    viewSport,
    markMapOpened,
    setName,
    auth,
    logout,
    authOpen,
    setAuthOpen,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <XPBurst burst={burst} onDone={() => setBurst(null)} />
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
