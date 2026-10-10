// 7-дневные квесты: по видам спорта и общие челленджи.
// Каждый день ссылается на упражнение из data/exercises.js (ex) — оттуда берутся
// анимация и объяснение техники. dose — объём (подходы, время, дистанция),
// title — своё название дня, если оно отличается от названия упражнения.

import { getSport } from "./sports";

const d = (ex, dose, title, xp = 100) => ({ ex, dose, title, xp });
const T = (ru, en, uz) => ({ ru, en, uz });

export const QUEST_BONUS_XP = 300;

export const quests = {
  boxing: {
    kind: "sport",
    tagline: T("Попробуй бокс за 7 дней и почувствуй разницу!", "Try boxing for 7 days and feel the difference!", "7 kun boks bilan shugʻullanib, farqni his qiling!"),
    days: [
      d("warmup", { min: 5 }),
      d("jab", { rounds: 3, min: 2 }, T("Стойка и джеб", "Stance and jab", "Stoyka va jeb")),
      d("jump_rope", { sets: 4, sec: 60 }),
      d("jab", { rounds: 4, min: 2 }, T("Бой с тенью", "Shadow boxing", "Soya bilan jang")),
      d("crunch", { sets: 3, reps: 15 }, T("Пресс бойца", "Fighter's core", "Jangchi qorni")),
      d("plank", { sets: 3, sec: 40 }),
      d("jab", { rounds: 5, min: 2 }, T("Финальный раунд", "Final round", "Final raund"), 150),
    ],
  },
  football: {
    kind: "sport",
    tagline: T("7 дней, чтобы влюбиться в мяч.", "7 days to fall in love with the ball.", "Toʻpni sevib qolish uchun 7 kun."),
    days: [
      d("warmup", { min: 5 }),
      d("juggle", { count: 20 }),
      d("kick", { sets: 3, reps: 10 }, T("Удары по цели", "Shots on target", "Nishonga zarbalar")),
      d("run", { sets: 8, m: 20 }, T("Рывки", "Sprints", "Tezlanishlar")),
      d("lunge", { sets: 3, reps: 10 }, T("Сила ног", "Leg strength", "Oyoq kuchi")),
      d("run", { min: 30 }, T("Мини-матч с друзьями", "Mini match with friends", "Doʻstlar bilan mini-oʻyin")),
      d("juggle", { count: 30 }, T("Рекорд чеканки", "Keepy-uppy record", "Tepish rekordi"), 150),
    ],
  },
  basketball: {
    kind: "sport",
    tagline: T("Неделя у кольца: от первого броска до серии попаданий.", "A week at the hoop: from your first shot to a scoring streak.", "Halqa yonida bir hafta: birinchi otishdan aniq seriyagacha."),
    days: [
      d("warmup", { min: 5 }),
      d("dribble", { min: 10 }),
      d("shot", { count: 20 }, T("Штрафные броски", "Free throws", "Jarima otishlari")),
      d("squat", { sets: 3, reps: 12 }, T("Прыжковая сила", "Jump power", "Sakrash kuchi")),
      d("dribble", { min: 12 }, T("Ведение двумя руками", "Two-hand dribbling", "Ikki qoʻlda olib yurish")),
      d("shot", { min: 30 }, T("Стритбол", "Streetball", "Stritbol")),
      d("shot", { count: 20 }, T("Снова штрафные", "Free throws again", "Yana jarima otishlari"), 150),
    ],
  },
  running: {
    kind: "sport",
    tagline: T("От дивана до уверенной пробежки за неделю.", "From the couch to a confident run in a week.", "Divandan ishonchli yugurishgacha bir hafta."),
    days: [
      d("warmup", { min: 10 }, T("Прогулка-разминка", "Warm-up walk", "Isinish sayri")),
      d("run", { min: 20 }, T("Бег и ходьба", "Run and walk", "Yugurish va yurish")),
      d("stretch", { min: 10 }),
      d("run", { sets: 6, min: 2 }, T("Интервалы", "Intervals", "Intervallar")),
      d("lunge", { sets: 3, reps: 10 }, T("Сила ног", "Leg strength", "Oyoq kuchi")),
      d("run", { min: 25 }, T("Длинная пробежка", "Long run", "Uzoq yugurish")),
      d("run", { km: 3 }, T("Первые 3 км", "Your first 3 km", "Birinchi 3 km"), 150),
    ],
  },
  swimming: {
    kind: "sport",
    tagline: T("Неделя в воде: дыхание, техника и первые 500 метров.", "A week in the water: breathing, technique and your first 500 m.", "Suvda bir hafta: nafas, texnika va birinchi 500 metr."),
    days: [
      d("swim", { min: 15 }, T("Знакомство с водой", "Getting used to water", "Suv bilan tanishuv")),
      d("swim", { sets: 3, reps: 10 }, T("Выдох в воду", "Exhaling into water", "Suvga nafas chiqarish")),
      d("swim", { sets: 4, m: 25 }, T("Работа ног", "Leg kicks", "Oyoq ishi")),
      d("swim", { sets: 6, m: 25 }),
      d("superman", { sets: 3, reps: 12 }, T("Суша: спина", "Dry land: back", "Quruqlikda: orqa")),
      d("swim", { m: 300 }, T("Длинный заплыв", "Long swim", "Uzoq suzish")),
      d("swim", { m: 500 }, T("500 метров", "500 metres", "500 metr"), 150),
    ],
  },
  tennis: {
    kind: "sport",
    tagline: T("7 дней, чтобы уверенно держать ракетку.", "7 days to hold the racket with confidence.", "Raketkani ishonch bilan ushlash uchun 7 kun."),
    days: [
      d("warmup", { min: 5 }),
      d("swing", { count: 20 }, T("Хват и набивка", "Grip and bouncing", "Ushlash va toʻp tepish")),
      d("run", { sets: 5, sec: 60 }, T("Работа ног", "Footwork", "Oyoq harakati")),
      d("swing", { count: 30 }, T("Форхенд у стенки", "Forehand at the wall", "Devorga forxend")),
      d("swing", { count: 30 }, T("Бэкхенд у стенки", "Backhand at the wall", "Devorga bekxend")),
      d("swing", { min: 30 }, T("Розыгрыш с партнёром", "Rally with a partner", "Sherik bilan oʻyin")),
      d("swing", { min: 15 }, T("Рекорд у стенки", "Wall rally record", "Devor rekordi"), 150),
    ],
  },
  cycling: {
    kind: "sport",
    tagline: T("Неделя в седле: от разведки маршрута до 20 км.", "A week in the saddle: from scouting routes to 20 km.", "Egarda bir hafta: yoʻnalishni oʻrganishdan 20 km gacha."),
    days: [
      d("cycle", { min: 10 }, T("Настройка велосипеда", "Bike set-up", "Velosipedni sozlash")),
      d("cycle", { min: 20 }, T("Лёгкий выезд", "Easy ride", "Yengil sayr")),
      d("stretch", { min: 10 }),
      d("cycle", { sets: 6, min: 1 }, T("Интервалы", "Intervals", "Intervallar")),
      d("cycle", { min: 30 }, T("Новый маршрут", "New route", "Yangi yoʻnalish")),
      d("squat", { sets: 3, reps: 15 }, T("Сила ног", "Leg strength", "Oyoq kuchi")),
      d("cycle", { km: 20 }, T("20 километров", "20 kilometres", "20 kilometr"), 150),
    ],
  },
  volleyball: {
    kind: "sport",
    tagline: T("7 дней, чтобы не бояться мяча над сеткой.", "7 days to stop fearing the ball over the net.", "Toʻr ustidagi toʻpdan qoʻrqmaslik uchun 7 kun."),
    days: [
      d("warmup", { min: 5 }),
      d("bump", { count: 15 }),
      d("shot", { count: 15 }, T("Пас сверху", "Overhead pass", "Yuqoridan uzatma")),
      d("squat", { sets: 3, reps: 10 }, T("Прыжок", "Jump", "Sakrash")),
      d("shot", { count: 20 }, T("Подача", "Serve", "Toʻp uzatish")),
      d("bump", { min: 40 }, T("Игра с друзьями", "Game with friends", "Doʻstlar bilan oʻyin")),
      d("bump", { count: 25 }, T("Рекорд приёма", "Passing record", "Qabul rekordi"), 150),
    ],
  },
  mma: {
    kind: "sport",
    tagline: T("Неделя бойца: удары, борьба и характер.", "A fighter's week: strikes, wrestling and grit.", "Jangchi haftasi: zarbalar, kurash va xarakter."),
    days: [
      d("warmup", { min: 8 }),
      d("jab", { rounds: 3, min: 2 }, T("Стойка и удары", "Stance and strikes", "Stoyka va zarbalar")),
      d("takedown", { sets: 5, reps: 6 }),
      d("burpee", { sets: 5, reps: 10 }),
      d("mountain_climber", { sets: 3, sec: 40 }),
      d("burpee", { rounds: 4, min: 3 }, T("Круговая тренировка", "Circuit", "Aylanma mashq")),
      d("jab", { rounds: 5, min: 2 }, T("Тест бойца", "Fighter test", "Jangchi testi"), 150),
    ],
  },
  fitness: {
    kind: "sport",
    tagline: T("7 дней, чтобы тренировки стали привычкой.", "7 days to make training a habit.", "Mashgʻulotni odatga aylantirish uchun 7 kun."),
    days: [
      d("warmup", { min: 5 }),
      d("squat", { sets: 3, reps: 15 }),
      d("knee_pushup", { sets: 3, reps: 10 }),
      d("jumping_jack", { sets: 3, sec: 40 }),
      d("stretch", { min: 15 }),
      d("burpee", { rounds: 3, min: 5 }, T("Всё тело", "Full body", "Butun tana")),
      d("squat", { sec: 60, max: true }, T("Тест силы", "Strength test", "Kuch testi"), 150),
    ],
  },

  wrestling: {
    kind: "sport",
    tagline: T("7 дней, чтобы почувствовать себя борцом.", "7 days to feel like a wrestler.", "Oʻzingizni kurashchidek his qilish uchun 7 kun."),
    days: [
      d("warmup", { min: 8 }),
      d("takedown", { sets: 4, reps: 6 }, T("Проход в ноги", "Leg attack", "Oyoqqa kirish")),
      d("glute_bridge", { sets: 3, reps: 12 }, T("Борцовский мост", "Wrestler's bridge", "Kurashchi koʻprigi")),
      d("squat", { sets: 4, reps: 15 }, T("Сильные ноги", "Strong legs", "Kuchli oyoqlar")),
      d("pushup", { sets: 3, reps: 10 }),
      d("burpee", { rounds: 4, min: 2 }, T("Темп схватки", "Match pace", "Bellashuv sur'ati")),
      d("takedown", { sets: 6, reps: 8 }, T("Финальная схватка", "Final bout", "Final bellashuv"), 150),
    ],
  },
  judo: {
    kind: "sport",
    tagline: T("Неделя дзюдо: падать, держать баланс и бросать.", "A week of judo: falling, balance and throws.", "Dzyudo haftasi: yiqilish, muvozanat va otish."),
    days: [
      d("warmup", { min: 8 }),
      d("crunch", { sets: 3, reps: 15 }, T("Сильный корпус для страховки", "Core for safe falls", "Xavfsiz yiqilish uchun korpus")),
      d("lunge", { sets: 3, reps: 10 }, T("Баланс в стойке", "Balance in stance", "Stoykada muvozanat")),
      d("takedown", { sets: 4, reps: 6 }, T("Вход на бросок", "Throw entry", "Otishga kirish")),
      d("plank", { sets: 3, sec: 40 }),
      d("pullup", { sets: 3, reps: 5 }, T("Хват дзюдоиста", "Judoka grip", "Dzyudochi ushlashi")),
      d("takedown", { sets: 6, reps: 6 }, T("Серия бросков", "Throw series", "Otishlar seriyasi"), 150),
    ],
  },
  taekwondo: {
    kind: "sport",
    tagline: T("Неделя высоких ударов и гибкости.", "A week of high kicks and flexibility.", "Baland zarbalar va egiluvchanlik haftasi."),
    days: [
      d("warmup", { min: 8 }),
      d("stretch", { min: 10 }, T("Растяжка ног", "Leg stretch", "Oyoq choʻzilishi")),
      d("high_kick", { sets: 3, reps: 10 }, T("Прямой удар ногой", "Front kick", "Toʻgʻri oyoq zarbasi")),
      d("jump_rope", { sets: 4, sec: 60 }, T("Скорость ног", "Foot speed", "Oyoq tezligi")),
      d("high_kick", { sets: 4, reps: 10 }, T("Круговой удар", "Roundhouse kick", "Aylanma zarba")),
      d("lunge", { sets: 3, reps: 12 }),
      d("high_kick", { rounds: 4, min: 2 }, T("Спарринг с тенью", "Shadow sparring", "Soya bilan sparring"), 150),
    ],
  },
  karate: {
    kind: "sport",
    tagline: T("7 дней дисциплины, точности и ката.", "7 days of discipline, precision and kata.", "Intizom, aniqlik va kata bilan 7 kun."),
    days: [
      d("warmup", { min: 8 }),
      d("jab", { sets: 4, reps: 15 }, T("Прямой удар рукой", "Straight punch", "Toʻgʻri qoʻl zarbasi")),
      d("stretch", { min: 10 }),
      d("high_kick", { sets: 3, reps: 10 }, T("Удар ногой (маэ-гери)", "Front kick (mae-geri)", "Oyoq zarbasi (mae-geri)")),
      d("squat", { sets: 3, reps: 15 }, T("Низкая стойка", "Low stance", "Past stoyka")),
      d("jab", { rounds: 3, min: 3 }, T("Связки ударов", "Combinations", "Zarbalar zanjiri")),
      d("high_kick", { rounds: 4, min: 2 }, T("Своё ката", "Your own kata", "Oʻz katangiz"), 150),
    ],
  },
  kickboxing: {
    kind: "sport",
    tagline: T("Неделя кикбоксинга: руки, ноги и кардио.", "A kickboxing week: hands, legs and cardio.", "Kikboksing haftasi: qoʻllar, oyoqlar va kardio."),
    days: [
      d("warmup", { min: 6 }),
      d("jab", { rounds: 3, min: 2 }, T("Стойка и удары руками", "Stance and punches", "Stoyka va qoʻl zarbalari")),
      d("high_kick", { sets: 3, reps: 10 }, T("Удар ногой", "Kick", "Oyoq zarbasi")),
      d("jump_rope", { sets: 5, sec: 60 }),
      d("mountain_climber", { sets: 3, sec: 40 }),
      d("burpee", { sets: 4, reps: 10 }),
      d("high_kick", { rounds: 5, min: 2 }, T("Бой с тенью: руки и ноги", "Shadow fight: hands and feet", "Soya bilan jang: qoʻl va oyoq"), 150),
    ],
  },
  jsa: {
    kind: "sport",
    tagline: T("Неделя IJSA: удары ногами, руки и немного борьбы.", "An IJSA week: kicks, hands and a bit of grappling.", "IJSA haftasi: oyoq zarbalari, qoʻllar va biroz kurash."),
    days: [
      d("warmup", { min: 8 }),
      d("stretch", { min: 10 }, T("Растяжка ног", "Leg stretch", "Oyoq choʻzilishi")),
      d("high_kick", { sets: 3, reps: 10 }, T("Удары ногами", "Kicks", "Oyoq zarbalari")),
      d("jab", { rounds: 3, min: 2 }, T("Удары руками", "Punches", "Qoʻl zarbalari")),
      d("takedown", { sets: 3, reps: 8 }, T("Захват и бросок", "Clinch and throw", "Ushlash va uloqtirish")),
      d("jump_rope", { sets: 4, sec: 60 }, T("Скорость ног", "Foot speed", "Oyoq tezligi")),
      d("high_kick", { rounds: 4, min: 2 }, T("Бой с тенью: ноги и руки", "Shadow fight: feet and hands", "Soya bilan jang: oyoq va qoʻl"), 150),
    ],
  },
  kurash: {
    kind: "sport",
    tagline: T("Неделя национальной борьбы: стойка, хват и бросок.", "A week of national wrestling: stance, grip and throw.", "Milliy kurash haftasi: stoyka, ushlash va otish."),
    days: [
      d("warmup", { min: 8 }),
      d("squat", { sets: 4, reps: 12 }, T("Устойчивая стойка", "Solid stance", "Mustahkam stoyka")),
      d("pullup", { sets: 3, reps: 5 }, T("Сильный хват", "Strong grip", "Kuchli ushlash")),
      d("takedown", { sets: 4, reps: 6 }, T("Подход к сопернику", "Closing the distance", "Raqibga yaqinlashish")),
      d("plank", { sets: 3, sec: 45 }),
      d("burpee", { rounds: 3, min: 3 }, T("Выносливость курашиста", "Kurash stamina", "Kurashchi chidamliligi")),
      d("takedown", { sets: 6, reps: 6 }, T("Бросок через бедро", "Hip throw", "Son orqali otish"), 150),
    ],
  },
  athletics: {
    kind: "sport",
    tagline: T("Неделя «королевы спорта»: спринт, прыжки, выносливость.", "A week of the queen of sport: sprints, jumps, endurance.", "«Sport malikasi» haftasi: sprint, sakrash, chidamlilik."),
    days: [
      d("warmup", { min: 10 }),
      d("run", { sets: 6, m: 60 }, T("Спринт 60 м", "60 m sprints", "60 m sprint")),
      d("squat", { sets: 4, reps: 10 }, T("Прыжковая сила", "Jump power", "Sakrash kuchi")),
      d("run", { min: 20 }, T("Лёгкий кросс", "Easy run", "Yengil kross")),
      d("lunge", { sets: 3, reps: 12 }),
      d("stretch", { min: 12 }),
      d("run", { m: 400 }, T("Круг стадиона на время", "400 m time trial", "Stadion aylanasi vaqtga"), 150),
    ],
  },
  weightlifting: {
    kind: "sport",
    tagline: T("7 дней, чтобы поставить технику подъёма штанги.", "7 days to build your lifting technique.", "Shtanga koʻtarish texnikasini qoʻyish uchun 7 kun."),
    days: [
      d("warmup", { min: 8 }),
      d("squat", { sets: 4, reps: 10 }, T("Присед — основа всего", "Squat: the foundation", "Prisedaniya — hamma narsa asosi")),
      d("deadlift", { sets: 4, reps: 6 }, T("Техника с палкой", "Technique with a stick", "Tayoq bilan texnika")),
      d("plank", { sets: 3, sec: 45 }),
      d("deadlift", { sets: 5, reps: 5 }, T("Подъём с пустым грифом", "Empty bar lifts", "Boʻsh shtanga bilan")),
      d("stretch", { min: 12 }, T("Мобильность плеч и таза", "Shoulder and hip mobility", "Yelka va tos harakatchanligi")),
      d("deadlift", { sets: 5, reps: 3 }, T("Тест техники", "Technique test", "Texnika testi"), 150),
    ],
  },
  gymnastics: {
    kind: "sport",
    tagline: T("Неделя гибкости и контроля тела.", "A week of flexibility and body control.", "Egiluvchanlik va tanani nazorat qilish haftasi."),
    days: [
      d("warmup", { min: 8 }),
      d("stretch", { min: 12 }),
      d("plank", { sets: 3, sec: 40 }, T("Жёсткий корпус", "Hollow core", "Qattiq korpus")),
      d("glute_bridge", { sets: 3, reps: 12 }, T("Мостик", "Bridge", "Koʻprik")),
      d("pullup", { sets: 3, reps: 5 }),
      d("superman", { sets: 3, reps: 12 }),
      d("stretch", { min: 15 }, T("Шпагат: первый замер", "Splits: first measure", "Shpagat: birinchi oʻlchov"), 150),
    ],
  },
  climbing: {
    kind: "sport",
    tagline: T("Неделя хвата, спины и смелости.", "A week of grip, back strength and courage.", "Ushlash, orqa kuchi va jasorat haftasi."),
    days: [
      d("warmup", { min: 8 }),
      d("pullup", { sets: 3, reps: 4 }, T("Вис и подтягивания", "Hangs and pull-ups", "Osilish va tortilish")),
      d("plank", { sets: 3, sec: 40 }),
      d("superman", { sets: 3, reps: 12 }, T("Сильная спина", "Strong back", "Kuchli orqa")),
      d("pullup", { sets: 4, reps: 5 }),
      d("stretch", { min: 12 }, T("Гибкость бёдер", "Hip flexibility", "Son egiluvchanligi")),
      d("pullup", { max: true }, T("Первый поход на скалодром", "First climbing gym visit", "Skalodromga birinchi tashrif"), 150),
    ],
  },
  table_tennis: {
    kind: "sport",
    tagline: T("7 дней, чтобы уверенно держать розыгрыш.", "7 days to hold a confident rally.", "Ishonchli oʻyin uchun 7 kun."),
    days: [
      d("warmup", { min: 5 }),
      d("swing", { count: 50 }, T("Набивка мяча ракеткой", "Ball bouncing", "Raketka bilan toʻp tepish")),
      d("run", { sets: 5, sec: 30 }, T("Работа ног у стола", "Footwork at the table", "Stol yonida oyoq ishi")),
      d("swing", { count: 40 }, T("Накат справа", "Forehand drive", "Oʻngdan zarba")),
      d("swing", { count: 40 }, T("Подрезка", "Backspin push", "Kesib urish")),
      d("swing", { min: 30 }, T("Игра с партнёром", "Game with a partner", "Sherik bilan oʻyin")),
      d("swing", { min: 15 }, T("Рекорд розыгрыша", "Rally record", "Oʻyin rekordi"), 150),
    ],
  },
  badminton: {
    kind: "sport",
    tagline: T("Неделя бадминтона: скорость, прыжок и смэш.", "A badminton week: speed, jump and smash.", "Badminton haftasi: tezlik, sakrash va smesh."),
    days: [
      d("warmup", { min: 5 }),
      d("swing", { count: 30 }, T("Хват и набивка волана", "Grip and shuttle taps", "Ushlash va volan tepish")),
      d("run", { sets: 6, sec: 30 }, T("Челночный бег", "Shuttle runs", "Mokili yugurish")),
      d("swing", { count: 30 }, T("Высокий удар", "Clear shot", "Baland zarba")),
      d("squat", { sets: 3, reps: 12 }, T("Прыжок для смэша", "Jump for the smash", "Smesh uchun sakrash")),
      d("swing", { min: 30 }, T("Игра в парке", "Game in the park", "Parkda oʻyin")),
      d("swing", { count: 20 }, T("Серия смэшей", "Smash series", "Smeshlar seriyasi"), 150),
    ],
  },
  handball: {
    kind: "sport",
    tagline: T("7 дней командной игры и мощного броска.", "7 days of teamwork and a powerful shot.", "Jamoaviy oʻyin va kuchli otish bilan 7 kun."),
    days: [
      d("warmup", { min: 6 }),
      d("dribble", { min: 10 }, T("Ведение мяча", "Ball dribbling", "Toʻpni olib yurish")),
      d("shot", { count: 20 }, T("Бросок в прыжке", "Jump shot", "Sakrab otish")),
      d("run", { sets: 8, m: 20 }, T("Рывки", "Sprints", "Tezlanishlar")),
      d("pushup", { sets: 3, reps: 10 }, T("Сила рук для броска", "Arm power for throws", "Otish uchun qoʻl kuchi")),
      d("shot", { min: 30 }, T("Игра с друзьями", "Game with friends", "Doʻstlar bilan oʻyin")),
      d("shot", { count: 30 }, T("Точность бросков", "Shooting accuracy", "Otish aniqligi"), 150),
    ],
  },

  // ------- Челленджи -------
  ch_pushups: {
    kind: "challenge",
    image: "/images/hero-athlete.jpg",
    title: T("Отжимания", "Push-ups", "Otjimaniya"),
    tagline: T("От отжиманий с колен до 40 повторений за неделю.", "From knee push-ups to 40 reps in a week.", "Tizzadan otjimaniyadan bir haftada 40 martagacha."),
    days: [
      d("knee_pushup", { sets: 3, reps: 8 }),
      d("knee_pushup", { sets: 3, reps: 12 }),
      d("pushup", { sets: 3, reps: 5 }),
      d("plank", { sets: 3, sec: 30 }, T("День корпуса", "Core day", "Korpus kuni")),
      d("pushup", { sets: 3, reps: 8 }),
      d("pushup", { sets: 4, reps: 10 }),
      d("pushup", { max: true }, T("Максимум за подход", "Max in one set", "Bir yondashuvda maksimum"), 150),
    ],
  },
  ch_squats: {
    kind: "challenge",
    image: "/images/fitness.jpg",
    title: T("Приседания", "Squats", "Prisedaniya"),
    tagline: T("Сильные ноги за 7 дней и 100 приседаний в финале.", "Strong legs in 7 days and 100 squats in the finale.", "7 kunda kuchli oyoqlar va finalda 100 ta prisedaniya."),
    days: [
      d("squat", { sets: 3, reps: 10 }),
      d("squat", { sets: 3, reps: 15 }),
      d("lunge", { sets: 3, reps: 10 }),
      d("glute_bridge", { sets: 3, reps: 15 }),
      d("squat", { sets: 4, reps: 15 }),
      d("squat", { sets: 4, reps: 20 }),
      d("squat", { count: 100 }, T("100 приседаний", "100 squats", "100 ta prisedaniya"), 150),
    ],
  },
  ch_plank: {
    kind: "challenge",
    image: "/images/fitness.jpg",
    title: T("Планка", "Plank", "Planka"),
    tagline: T("Железный корпус: от 20 секунд до 2 минут.", "An iron core: from 20 seconds to 2 minutes.", "Temir korpus: 20 soniyadan 2 daqiqagacha."),
    days: [
      d("plank", { sets: 3, sec: 20 }),
      d("plank", { sets: 3, sec: 30 }),
      d("superman", { sets: 3, reps: 10 }),
      d("plank", { sets: 3, sec: 45 }),
      d("mountain_climber", { sets: 3, sec: 30 }),
      d("plank", { sets: 3, sec: 60 }),
      d("plank", { min: 2 }, T("2 минуты в планке", "2-minute plank", "2 daqiqa planka"), 150),
    ],
  },
  ch_abs: {
    kind: "challenge",
    image: "/images/hero-athlete.jpg",
    title: T("Пресс", "Abs", "Qorin pressi"),
    tagline: T("Неделя для крепкого пресса без тренажёров.", "A week for strong abs, no machines needed.", "Trenajyorsiz kuchli qorin uchun bir hafta."),
    days: [
      d("crunch", { sets: 3, reps: 12 }),
      d("plank", { sets: 3, sec: 30 }),
      d("crunch", { sets: 3, reps: 15 }),
      d("mountain_climber", { sets: 3, sec: 30 }),
      d("superman", { sets: 3, reps: 12 }),
      d("crunch", { sets: 4, reps: 20 }),
      d("crunch", { count: 100 }, T("100 скручиваний", "100 crunches", "100 ta skruchivaniya"), 150),
    ],
  },
  ch_cardio: {
    kind: "challenge",
    image: "/images/running.jpg",
    title: T("Кардио", "Cardio", "Kardio"),
    tagline: T("Сердце и дыхание: прыжки, скакалка и бёрпи.", "Heart and lungs: jumps, jump rope and burpees.", "Yurak va nafas: sakrash, arqon va berpi."),
    days: [
      d("jumping_jack", { sets: 3, sec: 30 }),
      d("jump_rope", { sets: 4, sec: 30 }),
      d("burpee", { sets: 3, reps: 8 }),
      d("run", { min: 10 }, T("Бег на месте", "Running in place", "Joyida yugurish")),
      d("jump_rope", { sets: 5, sec: 60 }),
      d("burpee", { sets: 4, reps: 10 }),
      d("jump_rope", { count: 300 }, T("300 прыжков", "300 skips", "300 ta sakrash"), 150),
    ],
  },
  ch_flex: {
    kind: "challenge",
    image: "/images/hero-runner.jpg",
    title: T("Гибкость", "Flexibility", "Egiluvchanlik"),
    tagline: T("7 дней мягкой растяжки, чтобы тело стало свободнее.", "7 days of gentle stretching for a freer body.", "Tanani erkinroq qilish uchun 7 kunlik yumshoq choʻzilish."),
    days: [
      d("warmup", { min: 5 }),
      d("stretch", { min: 5 }),
      d("glute_bridge", { sets: 2, reps: 12 }),
      d("stretch", { min: 8 }),
      d("superman", { sets: 2, reps: 10 }),
      d("stretch", { min: 12 }),
      d("stretch", { min: 15 }, T("Финальная растяжка", "Final stretch", "Yakuniy choʻzilish"), 150),
    ],
  },
};

export const CHALLENGES = Object.keys(quests).filter((id) => quests[id].kind === "challenge");

// Название, эмодзи и картинка квеста — у видов спорта берутся из каталога
export function questMeta(id) {
  const q = quests[id];
  if (!q) return null;
  if (q.kind === "challenge") return { id, kind: q.kind, name: q.title, image: q.image, sportId: null };
  const s = getSport(id);
  return { id, kind: q.kind, name: s.name, image: s.image, sportId: id };
}
