// Переводы интерфейса. Ключ → { ru, en, uz }. Подстановки: {name}.
// Для склонений в ru используются массивы форм [один, несколько, много].

export const LANGS = [
  { id: "ru", label: "RU", name: "Русский" },
  { id: "en", label: "EN", name: "English" },
  { id: "uz", label: "UZ", name: "Oʻzbekcha" },
];

const T = (ru, en, uz) => ({ ru, en, uz });

const dict = {
  // навигация
  "nav.home": T("Главная", "Home", "Bosh sahifa"),
  "nav.how": T("Как это работает", "How it works", "Qanday ishlaydi"),
  "nav.sports": T("Виды спорта", "Sports", "Sport turlari"),
  "nav.quest": T("Квест", "Quest", "Kvest"),
  "nav.map": T("Карта", "Map", "Xarita"),
  "nav.profile": T("Мой профиль", "My profile", "Mening profilim"),
  "nav.notifications": T("Уведомления", "Notifications", "Bildirishnomalar"),
  "nav.allRead": T("Всё прочитано", "All caught up", "Hammasi oʻqilgan"),
  "nav.demo": T("Демо-режим, прогресс в браузере", "Demo mode, progress saved in browser", "Demo rejim, natija brauzerda saqlanadi"),
  "nav.login": T("Войти или зарегистрироваться", "Log in or sign up", "Kirish yoki roʻyxatdan oʻtish"),
  "nav.logout": T("Выйти", "Log out", "Chiqish"),
  "nav.menu": T("Меню", "Menu", "Menyu"),
  "nav.account": T("Аккаунт", "Account", "Akkaunt"),
  "nav.language": T("Язык", "Language", "Til"),

  "notif.quiz": T("Пройди тест за 3 минуты и узнай, какой спорт тебе подходит", "Take the 3-minute quiz and find the sport that suits you", "3 daqiqalik testdan oʻting va sizga mos sportni bilib oling"),
  "notif.today": T("Сегодня: день {n}, «{title}» (+{xp} XP)", "Today: day {n}, “{title}” (+{xp} XP)", "Bugun: {n}-kun, «{title}» (+{xp} XP)"),
  "notif.startQuest": T("Начни квест «{name}»", "Start the “{name}” quest", "«{name}» kvestini boshlang"),
  "notif.streak": T("Серия: {n}. Не прерывай её!", "Streak: {n}. Don't break it!", "Seriya: {n}. Uni uzmang!"),
  "notif.achievements": T("Открыто достижений: {n}", "Achievements unlocked: {n}", "Ochilgan yutuqlar: {n}"),
  "notif.map": T("Найди ближайший зал на карте Ташкента", "Find the nearest gym on the Tashkent map", "Toshkent xaritasida eng yaqin zalni toping"),

  // главная
  "hero.badge": T("10 вопросов · 3 минуты", "10 questions · 3 minutes", "10 ta savol · 3 daqiqa"),
  "hero.find": T("Найди свой", "Find your", "Oʻz sportingni"),
  "hero.sport": T("Спорт", "Sport", "Top"),
  "hero.text": T(
    "Пройди короткий тест, узнай, какой вид спорта подходит именно тебе, и начни свой путь к лучшей версии себя.",
    "Take a short quiz, find out which sport suits you best, and start your path to a better version of yourself.",
    "Qisqa testdan oʻting, aynan sizga qaysi sport mos kelishini bilib oling va oʻzingizning eng yaxshi versiyangiz sari yoʻl boshlang."
  ),
  "hero.cta": T("Найти мой спорт", "Find my sport", "Sportimni topish"),
  "hero.stat1": T(["вид спорта", "вида спорта", "видов спорта"], ["sport", "sports"], "sport turi"),
  "hero.stat2": T(["квест", "квеста", "квестов"], ["quest", "quests"], "kvest"),
  "hero.stat3": T("чтобы начать", "to start", "boshlash uchun"),
  "hero.best": T("Лучшее совпадение", "Best match", "Eng yaxshi moslik"),
  "hero.streak": T("4 дня подряд", "4-day streak", "Ketma-ket 4 kun"),
  "adv.1.t": T("Персональный подбор спорта", "Personal sport match", "Shaxsiy sport tanlovi"),
  "adv.1.d": T("10 вопросов и алгоритм совместимости", "10 questions and a matching algorithm", "10 ta savol va moslik algoritmi"),
  "adv.2.t": T("Интересные квесты", "Fun quests", "Qiziqarli kvestlar"),
  "adv.2.d": T("С анимацией техники каждого упражнения", "With animated technique for every exercise", "Har bir mashq texnikasi animatsiyasi bilan"),
  "adv.3.t": T("XP и достижения", "XP and achievements", "XP va yutuqlar"),
  "adv.3.d": T("Уровни, серии и награды", "Levels, streaks and rewards", "Darajalar, seriyalar va mukofotlar"),
  "adv.4.t": T("Залы рядом с тобой", "Gyms near you", "Yaqiningizdagi zallar"),
  "adv.4.d": T("Карта Ташкента по твоему спорту", "Tashkent map for your sport", "Sportingiz boʻyicha Toshkent xaritasi"),

  "home.problem.kicker": T("Проблема", "The problem", "Muammo"),
  "home.problem.title1": T("Хочется заниматься,", "You want to train,", "Shugʻullangingiz keladi,"),
  "home.problem.title2": T("но что-то мешает", "but something gets in the way", "lekin nimadir xalaqit beradi"),
  "home.problem.text": T(
    "Большинство бросает спорт не из-за лени. Просто первый выбор оказался неудачным, а поддержки рядом не было.",
    "Most people don't quit sport out of laziness. Their first choice just didn't fit, and there was no support around.",
    "Koʻpchilik sportni dangasalikdan emas, balki birinchi tanlov mos kelmagani va yonida qoʻllab-quvvatlash boʻlmagani uchun tashlaydi."
  ),
  "home.p1.t": T("Не знаю, что выбрать", "Don't know what to choose", "Nimani tanlashni bilmayman"),
  "home.p1.d": T("Видов спорта десятки, а пробовать всё подряд долго и дорого.", "There are dozens of sports, and trying them all is slow and expensive.", "Sport turlari oʻnlab, hammasini sinab koʻrish esa uzoq va qimmat."),
  "home.p2.t": T("Страшно начинать", "Scared to start", "Boshlash qoʻrqinchli"),
  "home.p2.d": T("Кажется, что все вокруг уже умеют, а ты будешь выглядеть глупо.", "It feels like everyone already knows how and you'll look silly.", "Atrofdagilar hammasi biladigandek, siz esa kulgili koʻrinadigandeksiz."),
  "home.p3.t": T("Мотивация пропадает", "Motivation fades", "Motivatsiya yoʻqoladi"),
  "home.p3.d": T("Первую неделю горишь, а потом тренировки тихо сходят на нет.", "You're on fire for a week, then the workouts quietly fade away.", "Birinchi hafta yonib turasiz, keyin mashgʻulotlar asta-sekin toʻxtaydi."),
  "home.p4.t": T("Спорт «не мой»", "“Not my sport”", "«Meniki emas» sport"),
  "home.p4.d": T("Выбрал то, что модно, а не то, что подходит характеру, и бросил.", "You picked what's trendy, not what fits your personality, and quit.", "Xarakteringizga mosini emas, moda boʻlganini tanladingiz va tashladingiz."),

  "home.how.title": T("От теста до привычки за 4 шага", "From quiz to habit in 4 steps", "Testdan odatgacha 4 qadam"),
  "home.s1.t": T("Пройди тест", "Take the quiz", "Testdan oʻting"),
  "home.s1.d": T("10 вопросов о характере, нагрузке, суставах и том, где тебе нравится заниматься.", "10 questions about your personality, intensity, joints and where you like to train.", "Xarakter, yuklama, boʻgʻimlar va qayerda shugʻullanishni yoqtirishingiz haqida 10 ta savol."),
  "home.s2.t": T("Получи подбор", "Get your match", "Tanlovni oling"),
  "home.s2.d": T("Алгоритм сравнит ответы с профилем {n} видов спорта и покажет залы рядом на карте.", "The algorithm compares your answers with {n} sport profiles and shows nearby gyms on the map.", "Algoritm javoblarni {n} ta sport profili bilan solishtiradi va xaritada yaqin zallarni koʻrsatadi."),
  "home.s3.t": T("Начни квест", "Start a quest", "Kvestni boshlang"),
  "home.s3.d": T("7 дней заданий. К каждому есть анимация техники и пошаговое объяснение.", "7 days of tasks, each with an animated technique demo and step-by-step guide.", "7 kunlik vazifalar. Har biriga texnika animatsiyasi va bosqichma-bosqich tushuntirish bor."),
  "home.s4.t": T("Расти в уровне", "Level up", "Darajangizni oshiring"),
  "home.s4.d": T("XP за каждый день, серии, достижения и новые уровни в профиле.", "XP for every day, streaks, achievements and new levels in your profile.", "Har kun uchun XP, seriyalar, yutuqlar va profilda yangi darajalar."),
  "home.how.cta": T("Пройти тест", "Take the quiz", "Testdan oʻtish"),

  "home.catalog.kicker": T("Каталог", "Catalogue", "Katalog"),
  "home.catalog.title": T("{n} {w}", "{n} {w}", "{n} ta sport turi"),
  "home.catalog.text": T("От настольного тенниса до кураша и MMA. У каждого свой характер и свой квест.", "From table tennis to kurash and MMA. Each has its own character and its own quest.", "Stol tennisidan kurash va MMA gacha. Har birining oʻz xarakteri va kvesti bor."),
  "home.catalog.all": T("Смотреть все", "See all", "Hammasini koʻrish"),

  "home.map.kicker": T("Карта Ташкента", "Tashkent map", "Toshkent xaritasi"),
  "home.map.title": T("Бассейн, корт или зал в двух шагах", "A pool, court or gym just around the corner", "Basseyn, kort yoki zal yoningizda"),
  "home.map.text": T(
    "Выбери вид спорта, и карта покажет ближайшие к тебе места в Ташкенте с расстоянием и маршрутом.",
    "Pick a sport and the map shows the nearest places in Tashkent with distance and directions.",
    "Sport turini tanlang, xarita esa Toshkentdagi eng yaqin joylarni masofa va yoʻnalish bilan koʻrsatadi."
  ),
  "home.map.cta": T("Открыть карту", "Open the map", "Xaritani ochish"),

  "home.game.kicker": T("Геймификация", "Gamification", "Geymifikatsiya"),
  "home.game.title1": T("Тренировка как игра.", "Training as a game.", "Mashgʻulot — oʻyin kabi."),
  "home.game.title2": T("Только прокачиваешь себя", "Except you level up yourself", "Faqat oʻzingizni rivojlantirasiz"),
  "home.game.text": T(
    "За каждый день квеста начисляется опыт. Серия не даёт пропустить тренировку, а достижения отмечают каждый важный шаг.",
    "Every quest day earns you experience. Your streak keeps you from skipping, and achievements mark every big step.",
    "Kvestning har bir kuni uchun tajriba beriladi. Seriya mashgʻulotni oʻtkazib yuborishga yoʻl qoʻymaydi, yutuqlar esa har bir muhim qadamni belgilaydi."
  ),

  "home.cta.title1": T("Не ищи мотивацию.", "Don't look for motivation.", "Motivatsiya izlama."),
  "home.cta.title2": T("Найди свой спорт.", "Find your sport.", "Oʻz sportingni top."),
  "home.cta.text": T("Тест займёт три минуты. Первое задание квеста займёт пять.", "The quiz takes three minutes. The first quest task takes five.", "Test uch daqiqa oladi. Kvestning birinchi vazifasi besh daqiqa."),

  "footer.tagline": T("Не ищи мотивацию. Найди свой спорт. Тест, квесты и опыт за каждую тренировку.", "Don't look for motivation. Find your sport. Quiz, quests and XP for every workout.", "Motivatsiya izlama. Oʻz sportingni top. Test, kvestlar va har bir mashgʻulot uchun tajriba."),
  "footer.platform": T("Платформа", "Platform", "Platforma"),
  "footer.account": T("Аккаунт", "Account", "Akkaunt"),
  "footer.results": T("Мои результаты", "My results", "Natijalarim"),
  "footer.copy": T("© 2026 SPORT QUEST · Проект для хакатона · Фото: Unsplash, Wikimedia Commons (CC BY/BY-SA, авторы в README) · Карта: © OpenStreetMap", "© 2026 SPORT QUEST · Hackathon project · Photos: Unsplash, Wikimedia Commons (CC BY/BY-SA, authors in README) · Map: © OpenStreetMap", "© 2026 SPORT QUEST · Xakaton loyihasi · Rasmlar: Unsplash, Wikimedia Commons (CC BY/BY-SA, mualliflar README da) · Xarita: © OpenStreetMap"),

  // тест
  "quiz.kicker": T("Что тебе больше нравится?", "What do you like more?", "Sizga nima koʻproq yoqadi?"),
  "quiz.counter": T("Вопрос {n} из {total}", "Question {n} of {total}", "{total} tadan {n}-savol"),
  "quiz.pick": T("Выбери один вариант", "Choose one option", "Bitta variantni tanlang"),
  "quiz.keys": T("можно нажать цифру 1–{n}", "or press 1–{n}", "1–{n} raqamini bosish mumkin"),
  "quiz.back": T("Назад", "Back", "Orqaga"),
  "quiz.next": T("Далее", "Next", "Keyingi"),
  "quiz.finish": T("Показать результат", "Show results", "Natijani koʻrsatish"),
  "quiz.analyzing": T("Подбираем твой спорт", "Finding your sport", "Sportingizni tanlayapmiz"),
  "quiz.analyzingText": T("Сравниваем ответы с профилями {n} видов спорта…", "Comparing your answers with {n} sport profiles…", "Javoblarni {n} ta sport profili bilan solishtiryapmiz…"),
  "quiz.passed": T("Тест пройден", "Quiz complete", "Test yakunlandi"),

  // результаты
  "results.emptyTitle": T("Сначала тест", "Quiz first", "Avval test"),
  "results.emptyText": T("Ответь на 10 вопросов, и мы покажем, какие виды спорта подходят тебе больше всего.", "Answer 10 questions and we'll show which sports suit you best.", "10 ta savolga javob bering, sizga eng mos sport turlarini koʻrsatamiz."),
  "results.kicker": T("Результат теста", "Quiz result", "Test natijasi"),
  "results.title1": T("Тебе", "Your", "Sizga"),
  "results.title2": T("подходят:", "matches:", "mos keladi:"),
  "results.retake": T("Пройти заново", "Retake", "Qaytadan"),
  "results.answers": T("Твои ответы:", "Your answers:", "Javoblaringiz:"),
  "results.others": T("Остальные виды", "Other sports", "Boshqa turlar"),
  "results.othersText": T("Совместимость с каждым видом из каталога. Нажми, чтобы найти место на карте.", "Your match with every sport in the catalogue. Tap to find a place on the map.", "Katalogdagi har bir tur bilan moslik. Xaritada joy topish uchun bosing."),
  "results.best": T("Лучшее совпадение", "Best match", "Eng yaxshi moslik"),
  "results.start": T("Начать квест", "Start quest", "Kvestni boshlash"),
  "results.map": T("Где заниматься", "Where to train", "Qayerda shugʻullanish"),
  "results.match": T("{n}% совпадение", "{n}% match", "{n}% moslik"),
  "common.difficulty": T("Сложность", "Difficulty", "Qiyinlik"),

  // квест
  "quest.kicker": T("7-дневный квест", "7-day quest", "7 kunlik kvest"),
  "quest.choose": T("Выбери свой квест", "Choose your quest", "Kvestingizni tanlang"),
  "quest.sorted": T("Виды спорта отсортированы по совместимости с твоими ответами.", "Sports are sorted by how well they match your answers.", "Sport turlari javoblaringizga mosligi boʻyicha saralangan."),
  "quest.noQuiz": T("Не знаешь, что выбрать? Пройди тест или начни с челленджа.", "Not sure what to pick? Take the quiz or start with a challenge.", "Nimani tanlashni bilmaysizmi? Testdan oʻting yoki chellenjdan boshlang."),
  "quest.title": T("Квест:", "Quest:", "Kvest:"),
  "quest.change": T("Сменить квест", "Change quest", "Kvestni almashtirish"),
  "quest.doneTitle": T("Квест пройден!", "Quest complete!", "Kvest yakunlandi!"),
  "quest.doneText": T("7 дней подряд, {xp} XP и одна новая привычка. Пройди квест ещё раз или попробуй другой.", "7 days in a row, {xp} XP and one new habit. Do it again or try another quest.", "Ketma-ket 7 kun, {xp} XP va bitta yangi odat. Kvestni qayta bajaring yoki boshqasini sinang."),
  "quest.new": T("Новый квест", "New quest", "Yangi kvest"),
  "quest.restart": T("Пройти заново", "Restart", "Qaytadan boshlash"),
  "quest.progress": T("Прогресс квеста", "Quest progress", "Kvest jarayoni"),
  "quest.earned": T("Заработано", "Earned", "Toʻplangan"),
  "quest.bonus": T("За весь квест бонус +{xp} XP", "Bonus for the whole quest: +{xp} XP", "Butun kvest uchun bonus +{xp} XP"),
  "quest.pickText": T("Прогресс по каждому квесту сохраняется.", "Progress is saved for every quest.", "Har bir kvest boʻyicha natija saqlanadi."),
  "quest.tabSports": T("По виду спорта", "By sport", "Sport turi boʻyicha"),
  "quest.tabChallenges": T("Челленджи", "Challenges", "Chellenjlar"),
  "quest.day": T("День {n}", "Day {n}", "{n}-kun"),
  "quest.complete": T("Выполнено", "Done", "Bajarildi"),
  "quest.locked": T("Откроется после дня {n}", "Unlocks after day {n}", "{n}-kundan keyin ochiladi"),
  "quest.how": T("Как выполнять", "How to do it", "Qanday bajarish"),
  "quest.findPlace": T("Где заниматься рядом", "Where to train nearby", "Yaqin atrofda qayerda shugʻullanish"),
  "quest.dayDone": T("День {n} выполнен", "Day {n} done", "{n}-kun bajarildi"),
  "quest.finished": T("Квест «{name}» пройден!", "“{name}” quest complete!", "«{name}» kvesti yakunlandi!"),
  "quest.challenge": T("Челлендж", "Challenge", "Chellenj"),

  // упражнение
  "ex.task": T("Задание на сегодня", "Today's task", "Bugungi vazifa"),
  "ex.steps": T("Как выполнять", "How to do it", "Qanday bajarish"),
  "ex.mistakes": T("Частые ошибки", "Common mistakes", "Koʻp uchraydigan xatolar"),
  "ex.timer": T("Таймер", "Timer", "Taymer"),
  "ex.start": T("Старт", "Start", "Boshlash"),
  "ex.pause": T("Пауза", "Pause", "Pauza"),
  "ex.reset": T("Сброс", "Reset", "Qayta"),
  "ex.timeUp": T("Время вышло! Отметь задание, если справился.", "Time's up! Mark the task done if you made it.", "Vaqt tugadi! Uddalagan boʻlsangiz, vazifani belgilang."),
  "ex.safety": T("Если появилась боль, остановись. Это не соревнование.", "Stop if you feel pain. This isn't a race.", "Ogʻriq paydo boʻlsa, toʻxtang. Bu musobaqa emas."),

  "dose.setsReps": T("{sets} × {reps} повторений", "{sets} × {reps} reps", "{sets} × {reps} takror"),
  "dose.setsSec": T("{sets} × {sec} сек", "{sets} × {sec} sec", "{sets} × {sec} soniya"),
  "dose.setsMin": T("{sets} × {min} мин", "{sets} × {min} min", "{sets} × {min} daqiqa"),
  "dose.setsM": T("{sets} × {m} м", "{sets} × {m} m", "{sets} × {m} m"),
  "dose.rounds": T("{rounds} раунда × {min} мин", "{rounds} rounds × {min} min", "{rounds} raund × {min} daqiqa"),
  "dose.min": T("{min} мин", "{min} min", "{min} daqiqa"),
  "dose.sec": T("{sec} сек", "{sec} sec", "{sec} soniya"),
  "dose.km": T("{km} км", "{km} km", "{km} km"),
  "dose.m": T("{m} м", "{m} m", "{m} m"),
  "dose.count": T("{count} раз", "{count} reps", "{count} marta"),
  "dose.max": T("Максимум за подход", "Max reps in one set", "Bir yondashuvda maksimum"),
  "dose.maxSec": T("Максимум за {sec} сек", "Max in {sec} sec", "{sec} soniyada maksimum"),

  // XP и уровни
  "xp.level": T("Уровень {n}", "Level {n}", "{n}-daraja"),
  "xp.toNext": T("до уровня «{next}»", "to “{next}”", "«{next}» darajasigacha"),
  "xp.max": T("Максимальный уровень", "Max level", "Eng yuqori daraja"),
  "xp.newLevel": T("Новый уровень", "New level", "Yangi daraja"),
  "xp.days": T(["день", "дня", "дней"], ["day", "days"], "kun"),
  "level.0": T("Новичок", "Rookie", "Yangi boshlovchi"),
  "level.1": T("Любитель", "Amateur", "Havaskor"),
  "level.2": T("Спортсмен", "Athlete", "Sportchi"),
  "level.3": T("Атлет", "Pro athlete", "Atlet"),
  "level.4": T("Чемпион", "Champion", "Chempion"),
  "ach.unlocked": T("Достижение открыто", "Achievement unlocked", "Yutuq ochildi"),
  "ach.open": T("Открыто", "Unlocked", "Ochildi"),

  // каталог
  "sports.title1": T("Виды", "All", "Sport"),
  "sports.title2": T("спорта", "sports", "turlari"),
  "sports.withQuiz": T("Процент на карточке показывает совместимость с твоими ответами.", "The percentage on each card shows how well it matches your answers.", "Kartadagi foiz javoblaringizga moslikni koʻrsatadi."),
  "sports.noQuiz": T("Пройди тест, и на карточках появится процент совместимости.", "Take the quiz and a match percentage will appear on each card.", "Testdan oʻting va kartalarda moslik foizi paydo boʻladi."),
  "filter.all": T("Все", "All", "Hammasi"),
  "filter.team": T("Командные", "Team", "Jamoaviy"),
  "filter.solo": T("Одиночные", "Solo", "Yakka"),
  "filter.strength": T("Сила", "Strength", "Kuch"),
  "filter.speed": T("Скорость", "Speed", "Tezlik"),
  "filter.combat": T("Единоборства", "Combat", "Yakkakurash"),
  "filter.endurance": T("Выносливость", "Endurance", "Chidamlilik"),
  "sports.equipment": T("Оборудование", "Equipment", "Jihozlar"),
  "sports.energy": T("Расход энергии", "Energy burn", "Energiya sarfi"),
  "sports.kcal": T("до {kcal} ккал/час", "up to {kcal} kcal/h", "soatiga {kcal} kkal gacha"),
  "sports.start": T("Начать квест «{name}»", "Start the “{name}” quest", "«{name}» kvestini boshlash"),
  "sports.map": T("Залы на карте", "Places on the map", "Xaritadagi joylar"),
  "diff.1": T("Очень легко", "Very easy", "Juda oson"),
  "diff.2": T("Легко", "Easy", "Oson"),
  "diff.3": T("Средне", "Medium", "Oʻrtacha"),
  "diff.4": T("Сложно", "Hard", "Qiyin"),
  "diff.5": T("Очень сложно", "Very hard", "Juda qiyin"),

  // профиль
  "profile.kicker": T("Мой спортивный профиль", "My sports profile", "Mening sport profilim"),
  "profile.achCount": T("{a}/{b} достижений", "{a}/{b} achievements", "{a}/{b} yutuq"),
  "profile.demoTitle": T("Сейчас ты в демо-режиме", "You're in demo mode", "Siz demo rejimdasiz"),
  "profile.demoText": T("Прогресс хранится в браузере. Создай аккаунт, чтобы не потерять XP и квесты.", "Progress is stored in your browser. Create an account so you don't lose your XP and quests.", "Natija brauzerda saqlanadi. XP va kvestlarni yoʻqotmaslik uchun akkaunt yarating."),
  "profile.save": T("Сохранить прогресс", "Save progress", "Natijani saqlash"),
  "profile.stats": T("Твои спортивные показатели", "Your sports stats", "Sport koʻrsatkichlaringiz"),
  "profile.refine": T("Уточнить тестом →", "Refine with the quiz →", "Test bilan aniqlash →"),
  "profile.favorites": T("Любимые виды спорта", "Favourite sports", "Sevimli sport turlari"),
  "profile.top1": T("Топ-1", "Top 1", "Top-1"),
  "profile.achievements": T("Достижения", "Achievements", "Yutuqlar"),
  "profile.history": T("История квестов", "Quest history", "Kvestlar tarixi"),
  "profile.emptyHistory": T("Ты ещё не выполнил ни одного задания. Первое займёт около 5 минут.", "You haven't completed any tasks yet. The first one takes about 5 minutes.", "Hali birorta vazifa bajarmadingiz. Birinchisi taxminan 5 daqiqa oladi."),
  "profile.toQuest": T("К квесту", "To the quest", "Kvestga"),
  "profile.edit": T("Изменить имя", "Edit name", "Ismni oʻzgartirish"),
  "profile.saveName": T("Сохранить", "Save", "Saqlash"),
  "stat.strength": T("Сила", "Strength", "Kuch"),
  "stat.speed": T("Скорость", "Speed", "Tezlik"),
  "stat.endurance": T("Выносливость", "Endurance", "Chidamlilik"),
  "stat.team": T("Командная игра", "Teamwork", "Jamoaviy oʻyin"),
  "stat.discipline": T("Дисциплина", "Discipline", "Intizom"),

  // вход
  "auth.registerTitle": T("Сохрани прогресс", "Save your progress", "Natijangizni saqlang"),
  "auth.loginTitle": T("С возвращением", "Welcome back", "Xush kelibsiz"),
  "auth.registerText": T("Твой XP, квесты и достижения перенесутся в аккаунт.", "Your XP, quests and achievements will move to your account.", "XP, kvestlar va yutuqlaringiz akkauntga oʻtadi."),
  "auth.loginText": T("Войди, чтобы продолжить свой квест.", "Log in to continue your quest.", "Kvestni davom ettirish uchun kiring."),
  "auth.register": T("Регистрация", "Sign up", "Roʻyxatdan oʻtish"),
  "auth.login": T("Вход", "Log in", "Kirish"),
  "auth.name": T("Имя", "Name", "Ism"),
  "auth.email": T("Email", "Email", "Email"),
  "auth.password": T("Пароль", "Password", "Parol"),
  "auth.passwordHint": T("Минимум 6 символов", "At least 6 characters", "Kamida 6 ta belgi"),
  "auth.create": T("Создать аккаунт", "Create account", "Akkaunt yaratish"),
  "auth.submitLogin": T("Войти", "Log in", "Kirish"),
  "auth.err.fields": T("Заполни имя, email и пароль от 6 символов", "Enter a name, email and a password of at least 6 characters", "Ism, email va kamida 6 belgili parolni kiriting"),
  "auth.err.exists": T("Пользователь с таким email уже есть", "A user with this email already exists", "Bu email bilan foydalanuvchi allaqachon mavjud"),
  "auth.err.invalid": T("Неверный email или пароль", "Wrong email or password", "Email yoki parol notoʻgʻri"),
  "auth.err.generic": T("Что-то пошло не так. Попробуй ещё раз", "Something went wrong. Please try again", "Nimadir xato ketdi. Qayta urinib koʻring"),

  // карта
  "map.kicker": T("Карта Ташкента", "Tashkent map", "Toshkent xaritasi"),
  "map.title": T("Где заниматься:", "Where to train:", "Qayerda shugʻullanish:"),
  "map.text": T("Ближайшие к тебе места по данным OpenStreetMap.", "The places nearest to you, based on OpenStreetMap data.", "OpenStreetMap maʼlumotlari boʻyicha sizga eng yaqin joylar."),
  "map.locating": T("Определяем твоё местоположение…", "Finding your location…", "Joylashuvingiz aniqlanmoqda…"),
  "map.located": T("Отсортировано по расстоянию от тебя", "Sorted by distance from you", "Sizdan masofa boʻyicha saralangan"),
  "map.fallback": T("Местоположение недоступно, считаем расстояние от центра Ташкента", "Location unavailable, measuring from Tashkent city centre", "Joylashuv mavjud emas, masofa Toshkent markazidan hisoblanmoqda"),
  "map.far": T("Ты далеко от Ташкента, поэтому считаем от центра города", "You're far from Tashkent, so we measure from the city centre", "Siz Toshkentdan uzoqdasiz, shuning uchun shahar markazidan hisoblaymiz"),
  "map.found": T("Найдено мест: {n}", "Places found: {n}", "Topilgan joylar: {n}"),
  "map.none": T("Для этого вида поблизости ничего не нашлось", "Nothing found nearby for this sport", "Bu tur uchun yaqin atrofda hech narsa topilmadi"),
  "map.route": T("Маршрут", "Directions", "Yoʻnalish"),
  "map.km": T("{d} км", "{d} km", "{d} km"),
  "map.m": T("{d} м", "{d} m", "{d} m"),
  "map.nearest": T("Ближайшее", "Nearest", "Eng yaqin"),
  "map.findMe": T("Где я?", "Locate me", "Men qayerda?"),
  "map.you": T("Ты здесь", "You are here", "Siz shu yerdasiz"),
  "map.center": T("Центр Ташкента", "Tashkent centre", "Toshkent markazi"),
  "map.related": T("Отдельных залов мало, поэтому показаны и спортивные центры, где обычно есть такие секции.", "There are few dedicated gyms, so sports centres that usually host these classes are shown too.", "Alohida zallar kam, shuning uchun odatda bunday seksiyalar boʻladigan sport markazlari ham koʻrsatilgan."),
  "map.verified": T("Проверенный список залов и секций с адресами.", "A verified list of gyms and clubs with addresses.", "Manzillari bilan tekshirilgan zallar va seksiyalar roʻyxati."),
  "map.approx": T("точка на карте приблизительная, ориентируйся на адрес", "map pin is approximate, use the address", "xaritadagi nuqta taxminiy, manzilga qarang"),
  "map.source": T("Данные: © участники OpenStreetMap", "Data: © OpenStreetMap contributors", "Maʼlumotlar: © OpenStreetMap ishtirokchilari"),
  "map.hours": T("Часы работы", "Opening hours", "Ish vaqti"),
  "map.showMore": T("Показать ещё", "Show more", "Yana koʻrsatish"),
  "place.pool": T("Бассейн", "Swimming pool", "Basseyn"),
  "place.fitness": T("Фитнес-клуб", "Fitness club", "Fitnes klub"),
  "place.pitch": T("Спортивная площадка", "Sports ground", "Sport maydonchasi"),
  "place.stadium": T("Стадион", "Stadium", "Stadion"),
  "place.track": T("Беговая дорожка", "Running track", "Yugurish yoʻlakchasi"),
  "place.centre": T("Спортивный центр", "Sports centre", "Sport markazi"),
  "place.bike": T("Велосипеды", "Bicycles", "Velosipedlar"),
  "place.dojo": T("Зал единоборств", "Martial arts gym", "Yakkakurash zali"),
  "place.park": T("Аквапарк", "Water park", "Akvapark"),


  // экран входа
  "login.kicker": T("Вход", "Sign in", "Kirish"),
  "login.title": T("Добро пожаловать в SPORT QUEST", "Welcome to SPORT QUEST", "SPORT QUEST ga xush kelibsiz"),
  "login.text": T("Войди, чтобы сохранять XP, квесты и достижения и продолжать с любого устройства.", "Sign in to save your XP, quests and achievements and continue on any device.", "XP, kvestlar va yutuqlarni saqlash hamda istalgan qurilmada davom ettirish uchun kiring."),
  "login.or": T("или", "or", "yoki"),
  "login.withEmail": T("Войти по email", "Continue with email", "Email orqali kirish"),
  "login.hideEmail": T("Скрыть", "Hide", "Yashirish"),
  "login.notConfigured": T("Вход через Google не настроен: добавь NEXT_PUBLIC_GOOGLE_CLIENT_ID в файл .env.local и перезапусти сервер.", "Google sign-in isn't configured: add NEXT_PUBLIC_GOOGLE_CLIENT_ID to .env.local and restart the server.", "Google orqali kirish sozlanmagan: .env.local fayliga NEXT_PUBLIC_GOOGLE_CLIENT_ID qoʻshing va serverni qayta ishga tushiring."),
  "login.loadError": T("Не удалось загрузить кнопку Google. Проверь интернет.", "Couldn't load the Google button. Check your connection.", "Google tugmasini yuklab boʻlmadi. Internetni tekshiring."),
  "login.secure": T("Мы получаем от Google только имя, email и фото профиля.", "We only receive your name, email and profile photo from Google.", "Google'dan faqat ismingiz, email va profil rasmingizni olamiz."),
  "login.f1": T("Подбор спорта под твой характер", "A sport matched to your personality", "Xarakteringizga mos sport"),
  "login.f2": T("Квесты с объяснением техники", "Quests with technique guides", "Texnika tushuntirilgan kvestlar"),
  "login.f3": T("Залы рядом на карте Ташкента", "Nearby gyms on the Tashkent map", "Toshkent xaritasida yaqin zallar"),
  "auth.err.google_invalid": T("Google не подтвердил вход. Попробуй ещё раз", "Google couldn't confirm the sign-in. Please try again", "Google kirishni tasdiqlamadi. Qayta urinib koʻring"),
  "auth.err.not_configured": T("Вход через Google не настроен на сервере", "Google sign-in isn't configured on the server", "Serverda Google orqali kirish sozlanmagan"),
  "otp.emailLabel": T("Твой Gmail", "Your Gmail", "Gmail manzilingiz"),
  "otp.getCode": T("Получить код", "Get code", "Kod olish"),
  "otp.step": T("Шаг {n} из 2", "Step {n} of 2", "{n}/2-qadam"),
  "otp.emailTitle": T("Вход по почте", "Sign in with email", "Pochta orqali kirish"),
  "otp.emailText": T("Введи свой Gmail, и мы отправим на него код подтверждения.", "Enter your Gmail and we'll send you a verification code.", "Gmail manzilingizni kiriting, unga tasdiqlash kodini yuboramiz."),
  "otp.codeTitle": T("Введи код из письма", "Enter the code from the email", "Xatdagi kodni kiriting"),
  "otp.codeSent": T("Мы отправили 6-значный код на", "We sent a 6-digit code to", "6 xonali kod yuborildi:"),
  "otp.change": T("Изменить почту", "Change email", "Pochtani oʻzgartirish"),
  "otp.resend": T("Отправить код ещё раз", "Resend code", "Kodni qayta yuborish"),
  "otp.resendIn": T("Новый код через {s} с", "New code in {s}s", "Yangi kod {s} soniyadan keyin"),
  "otp.verify": T("Подтвердить", "Verify", "Tasdiqlash"),
  "otp.demo": T("Демо-режим: почта для отправки не настроена, поэтому письмо не ушло. Твой код:", "Demo mode: no sending mailbox is configured, so no email was sent. Your code:", "Demo rejim: yuboruvchi pochta sozlanmagan, xat yuborilmadi. Kodingiz:"),
  "otp.spam": T("Не пришло? Проверь папку «Спам».", "Didn't get it? Check your spam folder.", "Kelmadimi? «Spam» papkasini tekshiring."),
  "otp.sent": T("Новый код отправлен", "A new code was sent", "Yangi kod yuborildi"),
  "name.title": T("Как тебя зовут?", "What's your name?", "Ismingiz nima?"),
  "name.text": T("Почта подтверждена! Осталось указать имя для профиля.", "Email confirmed! Just add a name for your profile.", "Pochta tasdiqlandi! Profil uchun ismingizni kiriting."),
  "name.continue": T("Продолжить", "Continue", "Davom etish"),
  "auth.err.email_invalid": T("Проверь адрес почты", "Check your email address", "Pochta manzilini tekshiring"),
  "auth.err.code_wait": T("Подожди {s} с перед новым кодом", "Wait {s}s before requesting a new code", "Yangi kod uchun {s} soniya kuting"),
  "auth.err.code_invalid": T("Неверный код. Попробуй ещё раз", "Wrong code. Please try again", "Kod notoʻgʻri. Qayta urinib koʻring"),
  "auth.err.code_expired": T("Код истёк. Запроси новый", "The code has expired. Request a new one", "Kod muddati tugadi. Yangisini soʻrang"),
  "auth.err.code_attempts": T("Слишком много попыток. Запроси новый код", "Too many attempts. Request a new code", "Urinishlar juda koʻp. Yangi kod soʻrang"),
  "auth.err.mail_failed": T("Не удалось отправить письмо. Попробуй позже", "Couldn't send the email. Please try later", "Xatni yuborib boʻlmadi. Keyinroq urinib koʻring"),
  "clerk.linkError": T("Вход выполнен, но сайт не смог открыть твой профиль.", "You're signed in, but the site couldn't open your profile.", "Kirish bajarildi, lekin sayt profilingizni ocha olmadi."),
  "clerk.retry": T("Повторить", "Retry", "Qayta urinish"),
  "clerk.slow": T("Вход загружается дольше обычного. Проверь интернет.", "Sign-in is taking longer than usual. Check your connection.", "Kirish odatdagidan uzoqroq yuklanmoqda. Internetni tekshiring."),
  "clerk.reload": T("Обновить страницу", "Reload page", "Sahifani yangilash"),
  "profile.viaGoogle": T("Вход через Google", "Signed in with Google", "Google orqali kirilgan"),
  "profile.viaEmail": T("Вход по email", "Signed in with email", "Email orqali kirilgan"),

  "common.close": T("Закрыть", "Close", "Yopish"),
  "common.loading": T("Загрузка…", "Loading…", "Yuklanmoqda…"),
};

export function translate(lang, key, vars) {
  const entry = dict[key];
  let s = entry ? entry[lang] ?? entry.ru : key;
  if (Array.isArray(s)) s = s[0];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

// Слово в нужной форме для числа: plural(lang, 3, "xp.days") → «дня» / «days» / «kun»
export function pluralWord(lang, n, key) {
  const forms = dict[key]?.[lang] ?? dict[key]?.ru;
  if (!Array.isArray(forms)) return forms;
  if (lang === "en") return n === 1 ? forms[0] : forms[1];
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

// Выбор перевода у объекта данных { ru, en, uz }
export function pick(lang, value) {
  if (value && typeof value === "object" && !Array.isArray(value) && "ru" in value) return value[lang] ?? value.ru;
  return value;
}

export function formatDose(lang, dose) {
  const t = (k) => translate(lang, k, dose);
  if (dose.max && dose.sec) return t("dose.maxSec");
  if (dose.max) return t("dose.max");
  if (dose.rounds) return t("dose.rounds");
  if (dose.sets && dose.reps) return t("dose.setsReps");
  if (dose.sets && dose.sec) return t("dose.setsSec");
  if (dose.sets && dose.min) return t("dose.setsMin");
  if (dose.sets && dose.m) return t("dose.setsM");
  if (dose.km) return t("dose.km");
  if (dose.m) return t("dose.m");
  if (dose.count) return t("dose.count");
  if (dose.min) return t("dose.min");
  if (dose.sec) return t("dose.sec");
  return "";
}

// Длительность для таймера, в секундах (если у задания есть время)
export function doseSeconds(dose) {
  if (dose.rounds) return dose.rounds * dose.min * 60;
  if (dose.sets && dose.sec) return dose.sec;
  if (dose.sets && dose.min) return dose.min * 60;
  if (dose.min) return dose.min * 60;
  if (dose.sec) return dose.sec;
  return null;
}
