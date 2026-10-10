import { achievements } from "@/data/achievements";

// Пороги уровней. Названия — в словаре: level.0 … level.4
export const LEVELS = [0, 500, 1200, 2500, 4500];

export function levelInfo(xp) {
  const i = LEVELS.findLastIndex((from) => xp >= from);
  const from = LEVELS[i];
  const next = LEVELS[i + 1];
  return {
    index: i + 1,
    key: `level.${i}`,
    nextKey: next != null ? `level.${i + 1}` : null,
    from,
    to: next ?? from,
    progress: next != null ? (xp - from) / (next - from) : 1,
  };
}

export const initialState = {
  user: { name: null, email: null, token: null, picture: null },
  answers: {},
  results: [],
  activeQuest: null,
  quests: {},
  xp: 100,
  streak: 0,
  unlocked: [],
  viewed: [],
  mapOpened: 0,
};

// Возвращает новые достижения, которые выполнены, но ещё не открыты.
export function newAchievements(state) {
  return achievements.filter((a) => !state.unlocked.includes(a.id) && a.check(state));
}
