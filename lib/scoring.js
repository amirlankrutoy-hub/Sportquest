import { questions } from "@/data/questions";
import { sports } from "@/data/sports";

// Профиль пользователя: сумма effects выбранных ответов по каждому измерению
// и желаемая интенсивность.
export function buildProfile(answers) {
  const vector = {};
  let intensity = 2;
  for (const q of questions) {
    const option = q.options.find((o) => o.id === answers[q.id]);
    if (!option) continue;
    if (option.intensity) intensity = option.intensity;
    for (const [dim, value] of Object.entries(option.effects || {})) {
      vector[dim] = (vector[dim] || 0) + value;
    }
  }
  return { vector, intensity };
}

// Совместимость = взвешенное среднее весов спорта по тому, что важно пользователю
// (80%) + совпадение по нагрузке (20%). Степень 1.6 растягивает шкалу, чтобы
// слабые совпадения не выглядели почти такими же, как сильные.
export function scoreSport(sport, profile) {
  const entries = Object.entries(profile.vector);
  const total = entries.reduce((n, [, v]) => n + v, 0);
  const fit = total ? entries.reduce((n, [d, v]) => n + v * (sport.weights[d] ?? 0), 0) / total : 0.5;
  const loadFit = 1 - Math.abs(profile.intensity - sport.intensity) / 2;
  const raw = 0.8 * fit + 0.2 * loadFit;
  return Math.round(Math.max(12, Math.min(98, 100 * Math.pow(Math.max(0, raw), 1.6))));
}

export function rankSports(answers) {
  const profile = buildProfile(answers);
  return sports
    .map((s) => ({ id: s.id, score: scoreSport(s, profile) }))
    .sort((a, b) => b.score - a.score);
}

// Показатели для профиля (1..5) из ответов теста.
export function profileStats(answers) {
  const { vector, intensity } = buildProfile(answers);
  const to5 = (v, base = 2) => Math.max(1, Math.min(5, Math.round(base + v * 2)));
  return [
    { id: "strength", value: to5(vector.strength || 0) },
    { id: "speed", value: to5(vector.speed || 0) },
    { id: "endurance", value: to5(vector.endurance || 0) },
    { id: "team", value: to5(vector.team || 0) },
    { id: "discipline", value: to5(((vector.self || 0) + (vector.competition || 0) + (vector.technique || 0)) / 2 + (intensity - 2) * 0.5) },
  ];
}

// Выбранные варианты ответов (для подписи «Твои ответы»).
export function explain(answers) {
  return questions.map((q) => q.options.find((o) => o.id === answers[q.id])).filter(Boolean);
}
