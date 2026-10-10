"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, RefreshCw, Repeat, Trophy } from "lucide-react";
import QuestCard from "@/components/QuestCard";
import ExerciseModal from "@/components/ExerciseModal";
import XPBar from "@/components/XPBar";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import ProgressBar from "@/components/ProgressBar";
import { useApp } from "@/components/AppProvider";
import { sports } from "@/data/sports";
import { CHALLENGES, questMeta, quests, QUEST_BONUS_XP } from "@/data/quests";
import Icon, { SportThumb } from "@/components/Icon";

function QuestPicker({ onPick }) {
  const { results, quests: progress, t, L } = useApp();
  const [tab, setTab] = useState("sports");
  const scoreOf = (id) => results.find((r) => r.id === id)?.score;
  const sportIds = results.length ? results.map((r) => r.id) : sports.map((s) => s.id);
  const ids = tab === "sports" ? sportIds : CHALLENGES;

  return (
    <div>
      <div className="relative inline-grid grid-cols-2 rounded-2xl bg-void/60 p-1 ring-1 ring-line">
        {[
          ["sports", t("quest.tabSports")],
          ["challenges", t("quest.tabChallenges")],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`relative isolate rounded-xl px-5 py-2.5 text-sm font-bold transition ${tab === id ? "text-void" : "text-mute hover:text-ink"}`}
          >
            {tab === id && <motion.span layoutId="quest-tab" className="absolute inset-0 -z-10 rounded-xl bg-accent" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            {label}
          </button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ids.map((id, i) => {
          const m = questMeta(id);
          const done = progress[id]?.completed.length ?? 0;
          return (
            <motion.button
              key={id}
              onClick={() => onPick(id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -5 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-line text-left transition-colors hover:border-accent/50"
            >
              <Image src={m.image} alt={L(m.name)} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
              {scoreOf(id) != null && (
                <span className="absolute right-3 top-3 rounded-lg bg-void/70 px-2 py-1 font-display text-sm font-bold text-accent-3 backdrop-blur">{scoreOf(id)}%</span>
              )}
              {m.kind === "challenge" && (
                <span className="absolute left-3 top-3 rounded-lg bg-accent px-2 py-1 text-[10px] font-black uppercase tracking-wider text-void">{t("quest.challenge")}</span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-xl font-bold uppercase leading-tight text-ink">{L(m.name)}</p>
                {done > 0 && (
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${(done / 7) * 100}%` }} />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function QuestPage() {
  const app = useApp();
  const { t, L } = app;
  const [picker, setPicker] = useState(false);
  const [how, setHow] = useState({ open: false, index: 0 });

  if (!app.ready) return <main className="min-h-[60vh]" />;

  const questId = quests[app.activeQuest] ? app.activeQuest : null;

  if (!questId) {
    return (
      <main className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{t("quest.kicker")}</p>
        <h1 className="mt-3 font-display text-5xl font-bold uppercase text-ink sm:text-6xl">{t("quest.choose")}</h1>
        <p className="mt-3 max-w-xl text-mute">{app.results.length ? t("quest.sorted") : t("quest.noQuiz")}</p>
        {!app.results.length && (
          <Button href="/quiz" size="md" className="mt-6">
            {t("home.how.cta")} <ArrowRight size={16} />
          </Button>
        )}
        <div className="mt-10">
          <QuestPicker onPick={app.startQuest} />
        </div>
      </main>
    );
  }

  const meta = questMeta(questId);
  const quest = quests[questId];
  const completed = app.quests[questId]?.completed ?? [];
  const doneCount = completed.length;
  const finished = doneCount === quest.days.length;
  const totalXp = quest.days.reduce((n, d) => n + d.xp, 0) + QUEST_BONUS_XP;
  const earned = quest.days.filter((_, i) => completed.includes(i)).reduce((n, d) => n + d.xp, 0) + (finished ? QUEST_BONUS_XP : 0);
  const status = (i) => (completed.includes(i) ? "done" : i === doneCount ? "current" : "locked");

  return (
    <main className="pb-10">
      {/* шапка квеста */}
      <section className="relative overflow-hidden border-b border-line">
        <Image src={meta.image} alt={L(meta.name)} fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
            <SportThumb src={meta.image} className="h-7 w-7 rounded-full" /> {meta.kind === "challenge" ? t("quest.challenge") : t("quest.kicker")}
          </motion.p>
          <motion.h1
            key={questId + app.lang}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 font-display text-5xl font-bold uppercase leading-none text-ink sm:text-7xl"
          >
            {t("quest.title")} <span className="neon neon-glow">{L(meta.name)}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 max-w-xl text-lg text-ink-2/80">
            {L(quest.tagline)}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-8 flex flex-wrap gap-3">
            <Button variant="ghost" size="md" onClick={() => setPicker(true)}>
              <Repeat size={16} /> {t("quest.change")}
            </Button>
            {meta.sportId && (
              <Button variant="ghost" size="md" href={`/map?sport=${meta.sportId}`}>
                <MapPin size={16} /> {t("quest.findPlace")}
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 sm:px-6 lg:grid-cols-[1fr_380px]">
        {/* таймлайн */}
        <div>
          <AnimatePresence>
            {finished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative mb-8 overflow-hidden rounded-[2rem] border border-accent/40 bg-gradient-to-br from-accent/20 via-panel to-deep p-7 shadow-glow-lg"
              >
                <motion.span className="absolute -right-6 -top-6 text-accent opacity-15" animate={{ rotate: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                  <Icon name="Trophy" size={150} strokeWidth={1.5} />
                </motion.span>
                <Trophy className="text-accent" size={32} />
                <h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink">{t("quest.doneTitle")}</h2>
                <p className="mt-2 max-w-md text-ink-2/80">{t("quest.doneText", { xp: earned })}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="md" onClick={() => setPicker(true)}>
                    {t("quest.new")} <ArrowRight size={16} />
                  </Button>
                  <Button size="md" variant="dark" onClick={() => app.resetQuest(questId)}>
                    <RefreshCw size={16} /> {t("quest.restart")}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ol className="relative space-y-5">
            <span className="absolute bottom-8 left-6 top-8 w-px bg-line sm:left-7" />
            <span
              className="absolute left-6 top-8 w-px bg-gradient-to-b from-accent-3 to-accent-2 shadow-[0_0_10px_#18f5b5] transition-[height] duration-700 ease-out sm:left-7"
              style={{ height: `calc((100% - 4rem) * ${Math.min(doneCount, quest.days.length - 1) / (quest.days.length - 1)})` }}
            />
            {quest.days.map((day, i) => (
              <QuestCard
                key={questId + i}
                day={day}
                index={i}
                status={status(i)}
                onComplete={() => app.completeDay(questId, i)}
                onHow={() => setHow({ open: true, index: i })}
              />
            ))}
          </ol>
        </div>

        {/* боковая панель */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <XPBar />
          <div className="card rounded-3xl p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-mute">{t("quest.progress")}</p>
              <p className="font-display text-2xl font-bold text-ink">
                {doneCount}
                <span className="text-mute">/{quest.days.length}</span>
              </p>
            </div>
            <ProgressBar value={doneCount / quest.days.length} className="mt-4" />
            <div className="mt-5 grid grid-cols-7 gap-1.5">
              {quest.days.map((_, i) => (
                <motion.span
                  key={i}
                  layout
                  className={`grid aspect-square place-items-center rounded-lg text-xs font-bold ${
                    completed.includes(i) ? "bg-accent text-void" : i === doneCount ? "text-accent ring-1 ring-accent" : "bg-white/[0.04] text-mute"
                  }`}
                >
                  {i + 1}
                </motion.span>
              ))}
            </div>
            <div className="mt-5 flex justify-between border-t border-line pt-4 text-sm">
              <span className="text-mute">{t("quest.earned")}</span>
              <span className="font-bold text-ink">
                {earned} / {totalXp} XP
              </span>
            </div>
            <p className="mt-2 text-xs text-mute">{t("quest.bonus", { xp: QUEST_BONUS_XP })}</p>
          </div>
        </aside>
      </div>

      <ExerciseModal
        open={how.open}
        onClose={() => setHow((h) => ({ ...h, open: false }))}
        day={quest.days[how.index]}
        index={how.index}
        canComplete={status(how.index) === "current"}
        onComplete={() => app.completeDay(questId, how.index)}
      />

      <Modal open={picker} onClose={() => setPicker(false)} className="max-w-5xl">
        <div className="p-6 sm:p-8">
          <h2 className="font-display text-3xl font-bold uppercase text-ink">{t("quest.choose")}</h2>
          <p className="mt-1 text-sm text-mute">{t("quest.pickText")}</p>
          <div className="mt-6">
            <QuestPicker
              onPick={(id) => {
                app.startQuest(id);
                setPicker(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </Modal>
    </main>
  );
}
