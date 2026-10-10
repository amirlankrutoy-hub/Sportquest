// Вопросы теста. effects прибавляются к профилю пользователя,
// intensity задаёт желаемый уровень нагрузки (1..3).

const o = (id, icon, ru, en, uz, extra) => ({
  id,
  icon,
  title: { ru: ru[0], en: en[0], uz: uz[0] },
  subtitle: { ru: ru[1], en: en[1], uz: uz[1] },
  ...extra,
});

export const questions = [
  {
    id: "format",
    title: {
      ru: "Ты предпочитаешь заниматься один или в команде?",
      en: "Do you prefer training alone or in a team?",
      uz: "Yolgʻiz shugʻullanishni yoqtirasizmi yoki jamoada?",
    },
    options: [
      o("team", "Users", ["Командные игры", "Лучше всего в команде"], ["Team games", "Best with a team"], ["Jamoaviy oʻyinlar", "Jamoada eng yaxshi"], { effects: { team: 1 } }),
      o("solo", "Headphones", ["Одиночные виды", "Предпочитаю сам"], ["Solo sports", "I prefer on my own"], ["Yakka sport", "Oʻzim afzal"], { effects: { solo: 1 } }),
    ],
  },
  {
    id: "quality",
    title: { ru: "Что тебе нравится больше?", en: "What do you like more?", uz: "Sizga nima koʻproq yoqadi?" },
    options: [
      o("strength", "Dumbbell", ["Сила", "Хочу быть сильнее"], ["Strength", "I want to be stronger"], ["Kuch", "Kuchliroq boʻlmoqchiman"], { effects: { strength: 1 } }),
      o("speed", "Zap", ["Скорость", "Хочу быть быстрее"], ["Speed", "I want to be faster"], ["Tezlik", "Tezroq boʻlmoqchiman"], { effects: { speed: 1 } }),
      o("endurance", "HeartPulse", ["Выносливость", "Могу долго не сдаваться"], ["Endurance", "I can keep going for long"], ["Chidamlilik", "Uzoq taslim boʻlmayman"], { effects: { endurance: 1 } }),
    ],
  },
  {
    id: "competition",
    title: {
      ru: "Какой формат соревнований тебе интереснее?",
      en: "Which format of competition interests you more?",
      uz: "Qaysi musobaqa formati sizga qiziqroq?",
    },
    options: [
      o("compete", "Trophy", ["Соревнования", "Люблю соревноваться"], ["Competition", "I love to compete"], ["Musobaqa", "Bellashishni yaxshi koʻraman"], { effects: { competition: 1 } }),
      o("self", "TrendingUp", ["Для себя", "Хочу становиться лучше себя"], ["For myself", "I want to beat my old self"], ["Oʻzim uchun", "Oʻzimdan yaxshiroq boʻlmoqchiman"], { effects: { self: 1 } }),
    ],
  },
  {
    id: "place",
    title: { ru: "Где тебе больше нравится заниматься?", en: "Where do you like to train most?", uz: "Qayerda shugʻullanish sizga koʻproq yoqadi?" },
    options: [
      o("indoor", "Building2", ["Зал", "Тепло, снаряды, тренер рядом"], ["Gym", "Warm, equipment, coach nearby"], ["Zal", "Issiq, jihozlar, murabbiy yonida"], { effects: { indoor: 1 } }),
      o("outdoor", "Trees", ["Улица", "Свежий воздух и простор"], ["Outdoors", "Fresh air and space"], ["Koʻcha", "Toza havo va kenglik"], { effects: { outdoor: 1 } }),
      o("water", "Waves", ["Вода", "Бассейн или открытая вода"], ["Water", "Pool or open water"], ["Suv", "Basseyn yoki ochiq suv"], { effects: { water: 1 } }),
      o("court", "Goal", ["Спортивная площадка", "Корт, поле, коробка"], ["Sports ground", "Court, pitch, cage"], ["Sport maydonchasi", "Kort, maydon, korobka"], { effects: { court: 1 } }),
    ],
  },
  {
    id: "load",
    title: {
      ru: "Какой уровень нагрузки ты предпочитаешь?",
      en: "What level of intensity do you prefer?",
      uz: "Qanday yuklama darajasini afzal koʻrasiz?",
    },
    options: [
      o("light", "Sprout", ["Лёгкий", "Начну спокойно"], ["Light", "I'll start easy"], ["Yengil", "Sekin boshlayman"], { intensity: 1 }),
      o("medium", "Flame", ["Средний", "Хочу почувствовать работу"], ["Medium", "I want to feel the work"], ["Oʻrtacha", "Mehnatni his qilmoqchiman"], { intensity: 2 }),
      o("high", "Rocket", ["Высокий", "Выжимать максимум"], ["High", "Push to the max"], ["Yuqori", "Maksimumgacha"], { intensity: 3 }),
    ],
  },
  {
    id: "contact",
    title: {
      ru: "Как ты относишься к контакту с соперником?",
      en: "How do you feel about physical contact with an opponent?",
      uz: "Raqib bilan jismoniy aloqaga qanday qaraysiz?",
    },
    options: [
      o("love", "Swords", ["Люблю борьбу", "Контакт заряжает"], ["Love it", "Contact fires me up"], ["Kurashni yoqtiraman", "Aloqa quvvat beradi"], { effects: { contact: 1 } }),
      o("some", "Hand", ["Немного можно", "Толчки в игре не пугают"], ["A little is fine", "Bumps in a game are OK"], ["Biroz mumkin", "Oʻyindagi turtkilar qoʻrqitmaydi"], { effects: { contact: 0.5, nocontact: 0.5 } }),
      o("none", "Feather", ["Без контакта", "Хочу соревноваться без столкновений"], ["No contact", "Compete without collisions"], ["Aloqasiz", "Toʻqnashuvsiz bellashmoqchiman"], { effects: { nocontact: 1 } }),
    ],
  },
  {
    id: "joints",
    title: {
      ru: "Бывают ли у тебя боли в суставах или спине?",
      en: "Do you ever have joint or back pain?",
      uz: "Boʻgʻim yoki belingizda ogʻriq boʻladimi?",
    },
    options: [
      o("no", "CircleCheck", ["Нет", "Готов к любым нагрузкам"], ["No", "Ready for any load"], ["Yoʻq", "Har qanday yuklamaga tayyorman"], { effects: {} }),
      o("sometimes", "Shield", ["Иногда", "Хочу беречь себя"], ["Sometimes", "I want to be careful"], ["Baʼzan", "Oʻzimni asramoqchiman"], { effects: { gentle: 0.6 } }),
      o("yes", "Bandage", ["Да", "Нужна мягкая нагрузка"], ["Yes", "I need gentle exercise"], ["Ha", "Yumshoq yuklama kerak"], { effects: { gentle: 1.2 } }),
    ],
  },
  {
    id: "schedule",
    title: {
      ru: "Как тебе удобнее тренироваться?",
      en: "How do you prefer to schedule training?",
      uz: "Qanday mashq qilish sizga qulay?",
    },
    options: [
      o("flex", "Clock", ["Когда удобно", "Гибкий график, без привязки"], ["Whenever I want", "Flexible, no fixed times"], ["Qulay paytda", "Erkin jadval"], { effects: { flex: 1 } }),
      o("fixed", "CalendarDays", ["По расписанию", "Секция 2–3 раза в неделю"], ["On a schedule", "A club 2–3 times a week"], ["Jadval boʻyicha", "Haftada 2–3 marta seksiya"], { effects: { technique: 0.4, competition: 0.3 } }),
      o("friends", "UsersRound", ["С друзьями", "Когда соберёмся"], ["With friends", "When we get together"], ["Doʻstlar bilan", "Yigʻilganimizda"], { effects: { team: 0.6 } }),
    ],
  },
  {
    id: "focus",
    title: {
      ru: "Что для тебя главное в тренировке?",
      en: "What matters most to you in a workout?",
      uz: "Mashgʻulotda siz uchun eng muhimi nima?",
    },
    options: [
      o("technique", "GraduationCap", ["Техника", "Оттачивать мастерство"], ["Technique", "Polishing my skills"], ["Texnika", "Mahoratni oshirish"], { effects: { technique: 1 } }),
      o("drive", "Gauge", ["Драйв", "Эмоции и адреналин"], ["Thrill", "Emotions and adrenaline"], ["Drayv", "Hissiyot va adrenalin"], { effects: { competition: 0.4, speed: 0.4 } }),
      o("health", "Leaf", ["Здоровье", "Самочувствие и форма"], ["Health", "Wellbeing and shape"], ["Salomatlik", "Yaxshi kayfiyat va qomat"], { effects: { self: 0.5, endurance: 0.3, gentle: 0.3 } }),
      o("social", "MessageCircle", ["Общение", "Новые знакомства"], ["Social", "Meeting new people"], ["Muloqot", "Yangi tanishlar"], { effects: { team: 0.7 } }),
    ],
  },
  {
    id: "motivation",
    title: {
      ru: "Что тебя больше всего мотивирует?",
      en: "What motivates you the most?",
      uz: "Sizni eng koʻp nima ruhlantiradi?",
    },
    options: [
      o("win", "Medal", ["Победа", "Быть первым"], ["Winning", "Being first"], ["Gʻalaba", "Birinchi boʻlish"], { effects: { competition: 0.7 } }),
      o("progress", "ChartLine", ["Прогресс", "Видеть, как расту"], ["Progress", "Seeing myself grow"], ["Taraqqiyot", "Oʻsishimni koʻrish"], { effects: { self: 0.7, endurance: 0.3 } }),
      o("team", "Handshake", ["Команда", "Общий азарт"], ["Team", "Shared excitement"], ["Jamoa", "Umumiy hayajon"], { effects: { team: 0.7 } }),
      o("result", "Target", ["Результат", "Цифры и форма"], ["Results", "Numbers and shape"], ["Natija", "Raqamlar va qomat"], { effects: { strength: 0.35, speed: 0.35 } }),
    ],
  },
];
