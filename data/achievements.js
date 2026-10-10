// Условия проверяются на клиенте по состоянию пользователя (lib/progress.js).
import { quests } from "./quests";

const T = (ru, en, uz) => ({ ru, en, uz });

export const achievements = [
  {
    id: "first_challenge",
    icon: "Target",
    title: T("Первый спортивный челлендж", "First sports challenge", "Birinchi sport chellenji"),
    description: T("Пройди тест и узнай свой спорт", "Take the quiz and find your sport", "Testdan oʻting va sportingizni toping"),
    xp: 50,
    check: (s) => s.results.length > 0,
  },
  {
    id: "first_quest",
    icon: "Trophy",
    title: T("Первый квест", "First quest", "Birinchi kvest"),
    description: T("Выполни первое задание квеста", "Complete your first quest task", "Kvestning birinchi vazifasini bajaring"),
    xp: 50,
    check: (s) => totalCompleted(s) >= 1,
  },
  {
    id: "streak_3",
    icon: "Flame",
    title: T("3 дня подряд", "3 days in a row", "Ketma-ket 3 kun"),
    description: T("Держи серию три дня", "Keep a three-day streak", "Uch kunlik seriyani saqlang"),
    xp: 100,
    check: (s) => s.streak >= 3,
    progress: (s) => [Math.min(s.streak, 3), 3],
  },
  {
    id: "xp_500",
    icon: "Zap",
    title: T("500 XP", "500 XP", "500 XP"),
    description: T("Набери 500 очков опыта", "Earn 500 experience points", "500 tajriba ochkosi toʻplang"),
    xp: 0,
    check: (s) => s.xp >= 500,
    progress: (s) => [Math.min(s.xp, 500), 500],
  },
  {
    id: "quest_done",
    icon: "Crown",
    title: T("Квест пройден", "Quest complete", "Kvest yakunlandi"),
    description: T("Заверши все 7 дней одного квеста", "Finish all 7 days of one quest", "Bitta kvestning 7 kunini tugating"),
    xp: 200,
    check: (s) => Object.values(s.quests).some((q) => q.completed.length >= 7),
    progress: (s) => [Math.max(0, ...Object.values(s.quests).map((q) => q.completed.length)), 7],
  },
  {
    id: "challenger",
    icon: "Award",
    title: T("Челленджер", "Challenger", "Chellenjer"),
    description: T("Выполни 3 задания в челленджах", "Complete 3 challenge tasks", "Chellenjlarda 3 ta vazifani bajaring"),
    xp: 100,
    check: (s) => challengeCompleted(s) >= 3,
    progress: (s) => [Math.min(challengeCompleted(s), 3), 3],
  },
  {
    id: "explorer",
    icon: "Compass",
    title: T("Исследователь", "Explorer", "Tadqiqotchi"),
    description: T("Изучи 5 видов спорта в каталоге", "Explore 5 sports in the catalogue", "Katalogda 5 ta sport turini oʻrganing"),
    xp: 50,
    check: (s) => s.viewed.length >= 5,
    progress: (s) => [Math.min(s.viewed.length, 5), 5],
  },
  {
    id: "scout",
    icon: "MapPin",
    title: T("Разведчик", "Scout", "Razvedkachi"),
    description: T("Найди место для тренировок на карте", "Find a place to train on the map", "Xaritada mashgʻulot joyini toping"),
    xp: 50,
    check: (s) => (s.mapOpened ?? 0) >= 1,
  },
];

function totalCompleted(s) {
  return Object.values(s.quests).reduce((n, q) => n + q.completed.length, 0);
}

function challengeCompleted(s) {
  return Object.entries(s.quests)
    .filter(([id]) => quests[id]?.kind === "challenge")
    .reduce((n, [, q]) => n + q.completed.length, 0);
}
