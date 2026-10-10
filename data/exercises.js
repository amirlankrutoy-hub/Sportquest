// Упражнения с объяснением техники. figure — ключ анимации в components/ExerciseFigure.js.
// steps — как выполнять, mistakes — частые ошибки. Всё на ru / en / uz.

export const exercises = {
  warmup: {
    figure: "warmup",
    name: { ru: "Разминка", en: "Warm-up", uz: "Badan qizdirish" },
    steps: {
      ru: ["Встань прямо, ноги на ширине плеч.", "Сделай 10 кругов руками вперёд и 10 назад.", "Поверни корпус влево-вправо 10 раз.", "Закончи 30 секундами шага на месте с высоким подъёмом колен."],
      en: ["Stand tall, feet shoulder-width apart.", "Do 10 arm circles forward and 10 backward.", "Twist your torso left and right 10 times.", "Finish with 30 seconds of marching with high knees."],
      uz: ["Toʻgʻri turing, oyoqlar yelka kengligida.", "Qoʻllar bilan 10 marta oldinga va 10 marta orqaga aylanma harakat qiling.", "Gavdani chapga va oʻngga 10 marta buring.", "30 soniya tizzani baland koʻtarib joyida yurish bilan yakunlang."],
    },
    mistakes: {
      ru: ["Резкие рывки вместо плавных движений.", "Пропуск разминки перед тренировкой: так проще травмироваться."],
      en: ["Jerky movements instead of smooth ones.", "Skipping the warm-up: that's how injuries happen."],
      uz: ["Silliq harakat oʻrniga keskin siltanishlar.", "Mashgʻulotdan oldin badan qizdirmaslik: jarohat xavfi oshadi."],
    },
  },
  pushup: {
    figure: "pushup",
    name: { ru: "Отжимания", en: "Push-ups", uz: "Qoʻlda koʻtarilish (otjimaniya)" },
    steps: {
      ru: ["Поставь ладони на пол чуть шире плеч, пальцы смотрят вперёд.", "Вытяни ноги назад: тело от макушки до пяток — одна прямая линия.", "На вдохе согни локти под углом около 45° к корпусу и опустись, пока грудь почти не коснётся пола.", "На выдохе выжми себя вверх до прямых рук, не прогибаясь в пояснице."],
      en: ["Place your palms on the floor slightly wider than your shoulders, fingers pointing forward.", "Extend your legs back so your body forms one straight line from head to heels.", "Breathe in, bend your elbows at about 45° to your body and lower until your chest nearly touches the floor.", "Breathe out and press back up to straight arms without letting your lower back sag."],
      uz: ["Kaftlarni yelkadan biroz kengroq polga qoʻying, barmoqlar oldinga qaraydi.", "Oyoqlarni orqaga choʻzing: tana boshdan tovongacha bitta toʻgʻri chiziq boʻlsin.", "Nafas olib, tirsaklarni tanaga taxminan 45° burchakda bukib, koʻkrak polga deyarli tekkuncha tushing.", "Nafas chiqarib, belni egmasdan qoʻllar toʻgʻrilanguncha koʻtariling."],
    },
    mistakes: {
      ru: ["Провисший таз или поднятая вверх попа.", "Локти разведены строго в стороны — это перегружает плечи."],
      en: ["Sagging hips or hips raised too high.", "Elbows flared straight out to the sides, which overloads the shoulders."],
      uz: ["Tos pastga osilgan yoki yuqoriga koʻtarilgan.", "Tirsaklar butunlay yon tomonga ochilgan — bu yelkaga ortiqcha yuk beradi."],
    },
  },
  knee_pushup: {
    figure: "knee_pushup",
    name: { ru: "Отжимания с колен", en: "Knee push-ups", uz: "Tizzadan otjimaniya" },
    steps: {
      ru: ["Встань на колени, ладони на полу чуть шире плеч.", "Сдвинь руки вперёд, чтобы тело от головы до колен было прямым.", "Опустись грудью к полу, локти под 45° к корпусу.", "Выжми себя вверх, напрягая пресс и ягодицы."],
      en: ["Kneel and put your palms on the floor slightly wider than your shoulders.", "Walk your hands forward so your body is straight from head to knees.", "Lower your chest to the floor with elbows at 45° to your body.", "Press back up while keeping your abs and glutes tight."],
      uz: ["Tizzalab turing, kaftlar yelkadan biroz kengroq polda.", "Qoʻllarni oldinga suring, tana boshdan tizzagacha toʻgʻri boʻlsin.", "Tirsaklarni tanaga 45° burchakda bukib, koʻkrakni polga tushiring.", "Qorin va dumba mushaklarini taranglab yuqoriga koʻtariling."],
    },
    mistakes: {
      ru: ["Сгибание в тазобедренном суставе вместо прямой линии.", "Слишком короткая амплитуда: опускайся до конца."],
      en: ["Bending at the hips instead of keeping a straight line.", "Too short a range of motion: go all the way down."],
      uz: ["Toʻgʻri chiziq oʻrniga sondan bukilish.", "Harakat juda qisqa: oxirigacha tushing."],
    },
  },
  squat: {
    figure: "squat",
    name: { ru: "Приседания", en: "Squats", uz: "Oʻtirib-turish (prisedaniya)" },
    steps: {
      ru: ["Поставь стопы на ширине плеч, носки слегка развернуты наружу.", "Вытяни руки вперёд для баланса.", "Отводи таз назад, как будто садишься на стул, спина прямая.", "Опустись до параллели бёдер с полом и встань, толкаясь пятками."],
      en: ["Stand with feet shoulder-width apart, toes turned slightly out.", "Reach your arms forward for balance.", "Push your hips back as if sitting on a chair, keeping your back straight.", "Lower until your thighs are parallel to the floor, then stand up by driving through your heels."],
      uz: ["Oyoqlarni yelka kengligida qoʻying, uchlari biroz tashqariga.", "Muvozanat uchun qoʻllarni oldinga choʻzing.", "Orqani toʻgʻri tutib, stulga oʻtirayotgandek tosni orqaga suring.", "Sonlar polga parallel boʻlguncha tushing va tovonlar bilan itarib turing."],
    },
    mistakes: {
      ru: ["Колени заваливаются внутрь.", "Пятки отрываются от пола, вес уходит на носки."],
      en: ["Knees caving inward.", "Heels lifting off the floor so the weight shifts to the toes."],
      uz: ["Tizzalar ichkariga qayrilishi.", "Tovonlar poldan uzilib, ogʻirlik oyoq uchiga oʻtishi."],
    },
  },
  plank: {
    figure: "plank",
    name: { ru: "Планка", en: "Plank", uz: "Planka" },
    steps: {
      ru: ["Поставь предплечья на пол, локти строго под плечами.", "Вытяни ноги назад и поднимись на носки.", "Напряги пресс и ягодицы: тело — прямая линия.", "Дыши ровно и держи положение заданное время."],
      en: ["Put your forearms on the floor with elbows directly under your shoulders.", "Extend your legs back and rise onto your toes.", "Brace your abs and glutes so your body is one straight line.", "Breathe steadily and hold for the given time."],
      uz: ["Bilaklarni polga qoʻying, tirsaklar aniq yelka ostida.", "Oyoqlarni orqaga choʻzib, oyoq uchlariga koʻtariling.", "Qorin va dumbani taranglang: tana toʻgʻri chiziq.", "Bir tekis nafas oling va belgilangan vaqt ushlab turing."],
    },
    mistakes: {
      ru: ["Прогиб в пояснице.", "Задержка дыхания."],
      en: ["Arching your lower back.", "Holding your breath."],
      uz: ["Belning egilishi.", "Nafasni ushlab qolish."],
    },
  },
  lunge: {
    figure: "lunge",
    name: { ru: "Выпады", en: "Lunges", uz: "Hamla (vypad)" },
    steps: {
      ru: ["Встань прямо, руки на поясе.", "Сделай широкий шаг вперёд.", "Опустись, пока оба колена не согнутся под 90°, заднее колено почти касается пола.", "Оттолкнись передней ногой и вернись в исходное положение. Чередуй ноги."],
      en: ["Stand tall with hands on your hips.", "Take a big step forward.", "Lower until both knees are bent at 90° and the back knee nearly touches the floor.", "Push off the front foot to return. Alternate legs."],
      uz: ["Toʻgʻri turing, qoʻllar belda.", "Oldinga keng qadam tashlang.", "Ikkala tizza 90° bukilguncha tushing, orqa tizza polga deyarli tegadi.", "Oldingi oyoq bilan itarib, boshlangʻich holatga qayting. Oyoqlarni almashtiring."],
    },
    mistakes: {
      ru: ["Переднее колено уходит далеко за носок.", "Корпус наклоняется вперёд."],
      en: ["Front knee travelling far past the toes.", "Leaning the torso forward."],
      uz: ["Oldingi tizza oyoq uchidan ancha oʻtib ketishi.", "Gavdaning oldinga egilishi."],
    },
  },
  jumping_jack: {
    figure: "jumping_jack",
    name: { ru: "Прыжки «звёздочка»", en: "Jumping jacks", uz: "«Yulduzcha» sakrash" },
    steps: {
      ru: ["Встань прямо, ноги вместе, руки вдоль тела.", "Прыжком расставь ноги шире плеч и подними руки над головой.", "Прыжком вернись в исходное положение.", "Держи ровный ритм и приземляйся мягко на носки."],
      en: ["Stand tall, feet together, arms at your sides.", "Jump your feet wider than your shoulders while raising your arms overhead.", "Jump back to the start position.", "Keep a steady rhythm and land softly on the balls of your feet."],
      uz: ["Toʻgʻri turing, oyoqlar birga, qoʻllar yonda.", "Sakrab oyoqlarni yelkadan kengroq oching va qoʻllarni bosh ustiga koʻtaring.", "Sakrab boshlangʻich holatga qayting.", "Bir tekis ritmni saqlang va oyoq uchiga yumshoq tushing."],
    },
    mistakes: {
      ru: ["Жёсткое приземление на пятки.", "Руки поднимаются не до конца."],
      en: ["Landing hard on your heels.", "Not raising the arms all the way."],
      uz: ["Tovonga qattiq tushish.", "Qoʻllarni oxirigacha koʻtarmaslik."],
    },
  },
  crunch: {
    figure: "crunch",
    name: { ru: "Скручивания", en: "Crunches", uz: "Qorin mashqi (skruchivaniya)" },
    steps: {
      ru: ["Ляг на спину, согни колени, стопы на полу.", "Пальцы рук положи за уши, локти разведены.", "На выдохе оторви лопатки от пола, подтягивая рёбра к тазу.", "Медленно опустись обратно, не расслабляя пресс полностью."],
      en: ["Lie on your back with knees bent and feet flat.", "Place your fingertips behind your ears, elbows wide.", "Breathe out and lift your shoulder blades off the floor, pulling ribs toward your hips.", "Lower slowly without fully relaxing your abs."],
      uz: ["Chalqancha yoting, tizzalarni buking, oyoq kaftlari polda.", "Barmoqlarni quloq orqasiga qoʻying, tirsaklar ochiq.", "Nafas chiqarib, kuraklarni poldan uzing va qovurgʻalarni tosga torting.", "Qorin mushaklarini toʻliq boʻshatmasdan sekin tushing."],
    },
    mistakes: {
      ru: ["Тянешь голову руками за шею.", "Поднимаешься рывком за счёт инерции."],
      en: ["Pulling your head up by the neck.", "Jerking up with momentum."],
      uz: ["Boshni boʻyindan qoʻl bilan tortish.", "Inersiya bilan siltanib koʻtarilish."],
    },
  },
  glute_bridge: {
    figure: "glute_bridge",
    name: { ru: "Ягодичный мост", en: "Glute bridge", uz: "Dumba koʻprigi" },
    steps: {
      ru: ["Ляг на спину, колени согнуты, стопы близко к ягодицам.", "Руки вдоль тела ладонями вниз.", "Толкаясь пятками, подними таз до прямой линии от плеч до колен.", "Сожми ягодицы на секунду вверху и плавно опустись."],
      en: ["Lie on your back with knees bent and feet close to your glutes.", "Arms by your sides, palms down.", "Drive through your heels to lift your hips until shoulders, hips and knees form a line.", "Squeeze your glutes for a second at the top and lower slowly."],
      uz: ["Chalqancha yoting, tizzalar bukilgan, oyoqlar dumbaga yaqin.", "Qoʻllar yonda, kaftlar pastga.", "Tovonlar bilan itarib, tosni yelkadan tizzagacha toʻgʻri chiziq boʻlguncha koʻtaring.", "Tepada bir soniya dumbani siqing va sekin tushing."],
    },
    mistakes: {
      ru: ["Прогиб в пояснице вместо работы ягодиц.", "Стопы стоят слишком далеко."],
      en: ["Arching the lower back instead of using the glutes.", "Feet placed too far away."],
      uz: ["Dumba oʻrniga belni egish.", "Oyoqlar juda uzoqda turishi."],
    },
  },
  burpee: {
    figure: "burpee",
    name: { ru: "Бёрпи", en: "Burpees", uz: "Berpi" },
    steps: {
      ru: ["Из положения стоя присядь и поставь ладони на пол.", "Прыжком отведи ноги назад в упор лёжа.", "Прыжком верни ноги к рукам.", "Выпрыгни вверх, подняв руки над головой."],
      en: ["From standing, squat down and place your palms on the floor.", "Jump your feet back into a high plank.", "Jump your feet back to your hands.", "Explode up into a jump with arms overhead."],
      uz: ["Turgan holatdan choʻkkalab, kaftlarni polga qoʻying.", "Sakrab oyoqlarni orqaga — yotib tayanish holatiga oʻting.", "Sakrab oyoqlarni qoʻllarga qaytaring.", "Qoʻllarni bosh ustiga koʻtarib yuqoriga sakrang."],
    },
    mistakes: {
      ru: ["Провисшая поясница в упоре лёжа.", "Слишком быстрый темп в ущерб технике."],
      en: ["Sagging lower back in the plank.", "Going so fast that technique falls apart."],
      uz: ["Tayanish holatida belning osilishi.", "Texnika hisobiga juda tez temp."],
    },
  },
  jump_rope: {
    figure: "jump_rope",
    name: { ru: "Скакалка", en: "Jump rope", uz: "Arqon sakrash" },
    steps: {
      ru: ["Возьми ручки скакалки, локти прижаты к бокам.", "Вращай скакалку кистями, а не всей рукой.", "Прыгай невысоко, на 2–3 см, на носках.", "Держи спину прямой, взгляд вперёд."],
      en: ["Hold the handles with elbows close to your sides.", "Turn the rope with your wrists, not your whole arms.", "Jump low, just 2–3 cm, on the balls of your feet.", "Keep your back straight and eyes forward."],
      uz: ["Dastaklarni ushlang, tirsaklar yonga yaqin.", "Arqonni butun qoʻl bilan emas, bilak bilan aylantiring.", "Past, 2–3 sm, oyoq uchida sakrang.", "Orqani toʻgʻri tuting, nigoh oldinga."],
    },
    mistakes: {
      ru: ["Высокие прыжки с поджатыми коленями.", "Вращение скакалки плечами."],
      en: ["Jumping too high and tucking the knees.", "Turning the rope with your shoulders."],
      uz: ["Tizzalarni bukib juda baland sakrash.", "Arqonni yelka bilan aylantirish."],
    },
  },
  jab: {
    figure: "jab",
    name: { ru: "Прямой удар (джеб)", en: "Jab", uz: "Toʻgʻri zarba (jeb)" },
    steps: {
      ru: ["Встань в стойку: левая нога впереди, колени мягкие, кулаки у подбородка.", "Выброси левую руку прямо вперёд, разворачивая кулак ладонью вниз.", "В конце удара плечо прикрывает подбородок.", "Так же быстро верни руку к лицу."],
      en: ["Get in stance: left foot forward, soft knees, fists by your chin.", "Snap your left hand straight forward, turning the fist palm-down.", "At the end of the punch your shoulder protects your chin.", "Bring the hand back to your face just as fast."],
      uz: ["Stoykaga turing: chap oyoq oldinda, tizzalar yumshoq, mushtlar iyak yonida.", "Chap qoʻlni toʻgʻri oldinga otib, mushtni kaft pastga burab tashlang.", "Zarba oxirida yelka iyakni yopadi.", "Qoʻlni xuddi shunday tez yuzga qaytaring."],
    },
    mistakes: {
      ru: ["Опущенная вторая рука — открытый подбородок.", "Удар с замахом, а не прямо от лица."],
      en: ["Dropping the other hand and leaving the chin open.", "Winding up instead of punching straight from the face."],
      uz: ["Ikkinchi qoʻlni tushirib, iyakni ochiq qoldirish.", "Yuzdan toʻgʻri emas, silkinib urish."],
    },
  },
  run: {
    figure: "run",
    name: { ru: "Бег", en: "Running", uz: "Yugurish" },
    steps: {
      ru: ["Держи корпус прямо с лёгким наклоном вперёд.", "Руки согнуты под 90°, работают вперёд-назад, а не поперёк тела.", "Ставь стопу под себя, а не далеко впереди.", "Дыши ритмично: например, вдох на 2 шага и выдох на 2 шага."],
      en: ["Keep your torso upright with a slight forward lean.", "Arms bent at 90°, swinging forward and back, not across your body.", "Land with your foot under you, not far in front.", "Breathe in rhythm, for example in for 2 steps and out for 2."],
      uz: ["Gavdani biroz oldinga egib, toʻgʻri tuting.", "Qoʻllar 90° bukilgan, tana boʻylab emas, oldinga-orqaga harakatlanadi.", "Oyoqni uzoq oldinga emas, tana ostiga qoʻying.", "Ritmik nafas oling: masalan, 2 qadamda nafas olish, 2 qadamda chiqarish."],
    },
    mistakes: {
      ru: ["Слишком быстрый старт: к середине сил не остаётся.", "Жёсткое приземление на пятку с прямой ногой."],
      en: ["Starting too fast and running out of energy halfway.", "Landing hard on the heel with a straight leg."],
      uz: ["Juda tez boshlash: yarmida kuch qolmaydi.", "Toʻgʻri oyoq bilan tovonga qattiq tushish."],
    },
  },
  stretch: {
    figure: "stretch",
    name: { ru: "Растяжка", en: "Stretching", uz: "Choʻzilish mashqi" },
    steps: {
      ru: ["Встань прямо и потянись руками вверх.", "Медленно наклонись вперёд с прямой спиной.", "Тянись руками к стопам до лёгкого натяжения, без боли.", "Задержись на 20–30 секунд, спокойно дыша."],
      en: ["Stand tall and reach your arms up.", "Slowly hinge forward with a straight back.", "Reach toward your feet until you feel a gentle stretch, not pain.", "Hold for 20–30 seconds, breathing calmly."],
      uz: ["Toʻgʻri turing va qoʻllarni yuqoriga choʻzing.", "Orqani toʻgʻri tutib sekin oldinga egiling.", "Ogʻriqsiz, yengil taranglik sezilguncha qoʻllarni oyoqqa choʻzing.", "Xotirjam nafas olib 20–30 soniya turing."],
    },
    mistakes: {
      ru: ["Пружинящие рывки вместо статичного удержания.", "Растяжка «через боль»."],
      en: ["Bouncing instead of holding still.", "Stretching through pain."],
      uz: ["Statik ushlash oʻrniga prujinali siltanishlar.", "«Ogʻriq orqali» choʻzilish."],
    },
  },
  swim: {
    figure: "swim",
    name: { ru: "Кроль", en: "Front crawl", uz: "Krol" },
    steps: {
      ru: ["Лежи на воде горизонтально, лицо в воде.", "Вытягивай руку вперёд и делай гребок под собой до бедра.", "Руки работают поочерёдно, ноги делают частые небольшие махи от бедра.", "Вдыхай, поворачивая голову в сторону под гребущую руку, выдыхай в воду."],
      en: ["Lie flat on the water with your face in.", "Reach one arm forward and pull under your body to your hip.", "Arms alternate while your legs make small, fast kicks from the hips.", "Breathe in by turning your head to the side with the pulling arm, breathe out into the water."],
      uz: ["Suvda gorizontal yoting, yuz suvda.", "Qoʻlni oldinga choʻzib, tana ostidan songacha eshkak eshing.", "Qoʻllar navbatma-navbat, oyoqlar sondan kichik va tez silkinadi.", "Eshkak eshayotgan qoʻl tomonga boshni burib nafas oling, suvga nafas chiqaring."],
    },
    mistakes: {
      ru: ["Голова поднята над водой, ноги тонут.", "Задержка дыхания вместо выдоха в воду."],
      en: ["Lifting the head out of the water so the legs sink.", "Holding your breath instead of exhaling into the water."],
      uz: ["Boshni suvdan koʻtarish — oyoqlar choʻkadi.", "Suvga nafas chiqarish oʻrniga nafasni ushlab turish."],
    },
  },
  shot: {
    figure: "shot",
    name: { ru: "Бросок в кольцо", en: "Jump shot", uz: "Halqaga otish" },
    steps: {
      ru: ["Встань лицом к кольцу, ноги на ширине плеч, колени согнуты.", "Мяч лежит на пальцах бросковой руки, вторая рука поддерживает сбоку.", "Выпрямляй ноги и одновременно выталкивай мяч вверх-вперёд.", "Закончи бросок «гусиной шеей»: кисть расслабленно смотрит вниз."],
      en: ["Face the hoop, feet shoulder-width apart, knees bent.", "Ball rests on the fingers of your shooting hand, the other hand supports from the side.", "Extend your legs while pushing the ball up and forward.", "Finish with a 'gooseneck': your wrist relaxed and pointing down."],
      uz: ["Halqaga qarab turing, oyoqlar yelka kengligida, tizzalar bukilgan.", "Toʻp otuvchi qoʻl barmoqlarida, ikkinchi qoʻl yondan ushlab turadi.", "Oyoqlarni toʻgʻrilab, bir vaqtda toʻpni yuqori-oldinga itaring.", "Otishni «gʻoz boʻyni» bilan tugating: bilak boʻshashib pastga qaraydi."],
    },
    mistakes: {
      ru: ["Бросок одними руками без работы ног.", "Мяч лежит на ладони, а не на пальцах."],
      en: ["Shooting with arms only, no leg drive.", "Ball sitting in the palm instead of on the fingers."],
      uz: ["Oyoqsiz faqat qoʻl bilan otish.", "Toʻpning barmoqda emas, kaftda turishi."],
    },
  },
  dribble: {
    figure: "dribble",
    name: { ru: "Ведение мяча", en: "Dribbling", uz: "Toʻpni olib yurish" },
    steps: {
      ru: ["Чуть присядь, корпус слегка наклонён вперёд.", "Толкай мяч подушечками пальцев, а не ладонью.", "Мяч отскакивает не выше пояса.", "Смотри вперёд, а не на мяч."],
      en: ["Bend your knees slightly with your torso leaning forward a little.", "Push the ball with your fingertips, not your palm.", "Keep the bounce below your waist.", "Look ahead, not at the ball."],
      uz: ["Biroz choʻkkalang, gavda oldinga ozgina egilgan.", "Toʻpni kaft bilan emas, barmoq uchlari bilan itaring.", "Toʻp belingizdan baland sakramasin.", "Toʻpga emas, oldinga qarang."],
    },
    mistakes: {
      ru: ["Шлепки ладонью по мячу.", "Взгляд прикован к мячу."],
      en: ["Slapping the ball with your palm.", "Eyes glued to the ball."],
      uz: ["Toʻpga kaft bilan shapaloq urish.", "Koʻzni toʻpdan uzmaslik."],
    },
  },
  kick: {
    figure: "kick",
    name: { ru: "Удар по мячу", en: "Kicking the ball", uz: "Toʻpga zarba" },
    steps: {
      ru: ["Опорную ногу поставь рядом с мячом, носок смотрит на цель.", "Замахнись бьющей ногой от бедра.", "Бей внутренней стороной стопы для точности или подъёмом для силы.", "После удара нога продолжает движение в сторону цели."],
      en: ["Plant your standing foot beside the ball, toes pointing at the target.", "Swing your kicking leg back from the hip.", "Strike with the inside of your foot for accuracy or your laces for power.", "Follow through toward the target."],
      uz: ["Tayanch oyoqni toʻp yoniga qoʻying, uchi nishonga qaraydi.", "Uruvchi oyoqni sondan orqaga silkiting.", "Aniqlik uchun oyoq ichki tomoni, kuch uchun ust tomoni bilan uring.", "Zarbadan keyin oyoq nishon tomon harakatni davom ettiradi."],
    },
    mistakes: {
      ru: ["Опорная нога далеко от мяча.", "Удар носком: мяч летит непредсказуемо."],
      en: ["Standing foot too far from the ball.", "Toe-poking the ball so it flies unpredictably."],
      uz: ["Tayanch oyoqning toʻpdan uzoqligi.", "Oyoq uchi bilan urish: toʻp kutilmagan tomonga uchadi."],
    },
  },
  juggle: {
    figure: "juggle",
    name: { ru: "Чеканка", en: "Keepy-uppy", uz: "Toʻpni tepib ushlab turish" },
    steps: {
      ru: ["Урони мяч на стопу с небольшой высоты.", "Подбивай его подъёмом стопы, носок слегка вытянут.", "Мяч должен подлетать примерно до пояса.", "Начни с одной ноги, потом чередуй."],
      en: ["Drop the ball onto your foot from a small height.", "Tap it up with your laces, toes slightly pointed.", "The ball should rise to about waist height.", "Start with one foot, then alternate."],
      uz: ["Toʻpni oyoqqa uncha baland boʻlmagan joydan tashlang.", "Uni oyoq usti bilan tepib koʻtaring, oyoq uchi biroz choʻzilgan.", "Toʻp taxminan bel balandligigacha koʻtarilsin.", "Bitta oyoqdan boshlang, keyin almashtiring."],
    },
    mistakes: {
      ru: ["Слишком сильный удар.", "Напряжённая, «деревянная» стопа."],
      en: ["Kicking too hard.", "A stiff, tense foot."],
      uz: ["Juda kuchli tepish.", "Taranglashgan, «yogʻoch» oyoq."],
    },
  },
  bump: {
    figure: "bump",
    name: { ru: "Приём снизу", en: "Forearm pass", uz: "Pastdan qabul qilish" },
    steps: {
      ru: ["Встань в низкую стойку: колени согнуты, вес на носках.", "Сложи руки вместе: одна ладонь в другой, большие пальцы рядом.", "Принимай мяч на предплечья, руки прямые.", "Направляй мяч движением ног, а не взмахом рук."],
      en: ["Get low: knees bent, weight on the balls of your feet.", "Join your hands: one palm in the other, thumbs side by side.", "Receive the ball on your forearms with straight arms.", "Direct the ball by lifting with your legs, not by swinging your arms."],
      uz: ["Past stoykaga turing: tizzalar bukilgan, ogʻirlik oyoq uchida.", "Qoʻllarni birlashtiring: bir kaft ikkinchisida, bosh barmoqlar yonma-yon.", "Toʻpni toʻgʻri qoʻllar bilan bilakka qabul qiling.", "Toʻpni qoʻl silkitib emas, oyoq harakati bilan yoʻnaltiring."],
    },
    mistakes: {
      ru: ["Согнутые локти.", "Мах руками вверх выше плеч."],
      en: ["Bent elbows.", "Swinging the arms above shoulder height."],
      uz: ["Bukilgan tirsaklar.", "Qoʻllarni yelkadan baland silkitish."],
    },
  },
  swing: {
    figure: "swing",
    name: { ru: "Удар справа (форхенд)", en: "Forehand", uz: "Oʻngdan zarba (forxend)" },
    steps: {
      ru: ["Повернись боком к сетке, ракетка отведена назад.", "Перенеси вес на переднюю ногу.", "Веди ракетку снизу вверх и встречай мяч перед собой.", "Закончи движение ракеткой над противоположным плечом."],
      en: ["Turn sideways to the net with the racket taken back.", "Shift your weight onto your front foot.", "Swing low to high and meet the ball in front of you.", "Finish with the racket over your opposite shoulder."],
      uz: ["Toʻrga yon tomon bilan buriling, raketka orqaga olingan.", "Ogʻirlikni oldingi oyoqqa oʻtkazing.", "Raketkani pastdan yuqoriga olib, toʻpni oldingizda qarshi oling.", "Harakatni raketka qarama-qarshi yelka ustida boʻlganda tugating."],
    },
    mistakes: {
      ru: ["Удар одной рукой без разворота корпуса.", "Мяч принимается слишком близко к телу."],
      en: ["Hitting with the arm only, no body rotation.", "Meeting the ball too close to your body."],
      uz: ["Gavdani burmasdan faqat qoʻl bilan urish.", "Toʻpni tanaga juda yaqin qabul qilish."],
    },
  },
  superman: {
    figure: "superman",
    name: { ru: "Супермен", en: "Superman", uz: "Supermen" },
    steps: {
      ru: ["Ляг на живот, руки вытянуты вперёд.", "Одновременно подними руки, грудь и ноги от пола.", "Задержись на 2 секунды, сжимая ягодицы.", "Плавно опустись."],
      en: ["Lie face down with arms stretched forward.", "Lift your arms, chest and legs off the floor at the same time.", "Hold for 2 seconds while squeezing your glutes.", "Lower slowly."],
      uz: ["Qorin bilan yoting, qoʻllar oldinga choʻzilgan.", "Bir vaqtda qoʻllar, koʻkrak va oyoqlarni poldan koʻtaring.", "Dumbani siqib 2 soniya turing.", "Sekin tushing."],
    },
    mistakes: {
      ru: ["Запрокидывание головы назад.", "Рывки вместо плавного подъёма."],
      en: ["Cranking your head back.", "Jerking instead of lifting smoothly."],
      uz: ["Boshni orqaga tashlash.", "Silliq koʻtarish oʻrniga siltanish."],
    },
  },
  mountain_climber: {
    figure: "mountain_climber",
    name: { ru: "Скалолаз", en: "Mountain climbers", uz: "Qoya chiqish (skalolaz)" },
    steps: {
      ru: ["Встань в упор лёжа на прямых руках.", "Подтяни одно колено к груди.", "Быстро смени ноги, как будто бежишь.", "Таз держи на уровне плеч."],
      en: ["Get into a high plank on straight arms.", "Drive one knee toward your chest.", "Quickly switch legs as if running.", "Keep your hips level with your shoulders."],
      uz: ["Toʻgʻri qoʻllarda yotib tayanish holatiga turing.", "Bitta tizzani koʻkrakka torting.", "Yugurayotgandek oyoqlarni tez almashtiring.", "Tosni yelka darajasida tuting."],
    },
    mistakes: {
      ru: ["Таз задран вверх.", "Плечи уходят назад за ладони."],
      en: ["Hips piked up high.", "Shoulders drifting back behind the hands."],
      uz: ["Tos yuqoriga koʻtarilgan.", "Yelkalar kaftdan orqaga ketishi."],
    },
  },
  cycle: {
    figure: "cycle",
    name: { ru: "Езда на велосипеде", en: "Cycling", uz: "Velosipedda yurish" },
    steps: {
      ru: ["Отрегулируй седло: в нижней точке нога почти прямая.", "Держи руль расслабленно, локти чуть согнуты.", "Крути педали ровно по кругу, а не только давя вниз.", "Держи частоту около 80–90 оборотов в минуту на лёгкой передаче."],
      en: ["Adjust the saddle so your leg is almost straight at the bottom of the pedal stroke.", "Hold the bars loosely with slightly bent elbows.", "Pedal in smooth circles instead of only pushing down.", "Keep a cadence of about 80–90 rpm in an easy gear."],
      uz: ["Egarni sozlang: pastki nuqtada oyoq deyarli toʻgʻri.", "Rulni boʻsh ushlang, tirsaklar biroz bukilgan.", "Pedalni faqat pastga bosib emas, tekis aylantiring.", "Yengil uzatmada daqiqasiga 80–90 aylanishni saqlang."],
    },
    mistakes: {
      ru: ["Слишком низкое седло — болят колени.", "Езда без шлема."],
      en: ["Saddle too low, which hurts the knees.", "Riding without a helmet."],
      uz: ["Egar juda past — tizzalar ogʻriydi.", "Dubulgʻasiz haydash."],
    },
  },
  high_kick: {
    figure: "high_kick",
    name: { ru: "Удар ногой", en: "Kick", uz: "Oyoq zarbasi" },
    steps: {
      ru: ["Встань в боевую стойку, руки защищают лицо.", "Подними колено бьющей ноги к груди.", "Разверни опорную стопу и выпрями ногу, ударяя подъёмом стопы или пяткой.", "Быстро верни ногу через колено и снова встань в стойку."],
      en: ["Get into a fighting stance with your hands guarding your face.", "Lift the knee of your kicking leg toward your chest.", "Pivot on your standing foot and extend the leg, striking with the top of the foot or the heel.", "Snap the leg back through the knee and return to stance."],
      uz: ["Jangovar stoykaga turing, qoʻllar yuzni himoya qiladi.", "Uruvchi oyoq tizzasini koʻkrakka koʻtaring.", "Tayanch oyoqni burib, oyoqni toʻgʻrilang va oyoq usti yoki tovon bilan uring.", "Oyoqni tizza orqali tez qaytaring va yana stoykaga turing."],
    },
    mistakes: {
      ru: ["Руки опускаются во время удара.", "Опорная стопа не разворачивается — страдает колено."],
      en: ["Dropping your hands while kicking.", "Not pivoting the standing foot, which strains the knee."],
      uz: ["Zarba paytida qoʻllarni tushirish.", "Tayanch oyoqni burmaslik — tizza zarar koʻradi."],
    },
  },
  deadlift: {
    figure: "deadlift",
    name: { ru: "Подъём штанги", en: "Barbell lift", uz: "Shtanga koʻtarish" },
    steps: {
      ru: ["Встань так, чтобы гриф был над серединой стопы, ноги на ширине таза.", "Присядь и возьми гриф хватом чуть шире плеч, спина прямая, грудь вперёд.", "Подними штангу, разгибая одновременно колени и таз, гриф идёт вдоль ног.", "Наверху выпрямись полностью и так же ровно опусти штангу. Начинай с пустого грифа или палки."],
      en: ["Stand with the bar over the middle of your feet, feet hip-width apart.", "Squat down and grip the bar slightly wider than your shoulders, back straight, chest up.", "Lift by extending knees and hips together, keeping the bar close to your legs.", "Stand fully upright at the top, then lower with the same control. Start with an empty bar or a stick."],
      uz: ["Shtanga oyoq oʻrtasi ustida boʻlsin, oyoqlar tos kengligida.", "Choʻkkalab, shtangani yelkadan biroz kengroq ushlang, orqa toʻgʻri, koʻkrak oldinga.", "Tizza va tosni bir vaqtda yozib koʻtaring, shtanga oyoqlar boʻylab harakatlanadi.", "Tepada toʻliq toʻgʻrilaning va shunday tekis tushiring. Boʻsh shtanga yoki tayoqdan boshlang."],
    },
    mistakes: {
      ru: ["Круглая спина — главный риск травмы.", "Слишком большой вес без отработанной техники."],
      en: ["A rounded back: the main injury risk.", "Too much weight before the technique is solid."],
      uz: ["Bukilgan orqa — jarohatning asosiy xavfi.", "Texnikani oʻzlashtirmasdan juda ogʻir vazn."],
    },
  },
  pullup: {
    figure: "pullup",
    name: { ru: "Подтягивания", en: "Pull-ups", uz: "Turnikda tortilish" },
    steps: {
      ru: ["Возьмись за перекладину хватом чуть шире плеч, ладони от себя.", "Повисни на прямых руках, напряги пресс, ноги вместе.", "Тянись вверх, сводя лопатки, пока подбородок не окажется над перекладиной.", "Медленно опустись до прямых рук. Если пока не получается — начни с вися и австралийских подтягиваний."],
      en: ["Grip the bar slightly wider than your shoulders, palms facing away.", "Hang on straight arms with your core tight and legs together.", "Pull up by squeezing your shoulder blades until your chin is over the bar.", "Lower slowly to straight arms. If you can't yet, start with dead hangs and inverted rows."],
      uz: ["Turnikni yelkadan biroz kengroq ushlang, kaftlar oldinga qaragan.", "Toʻgʻri qoʻllarda osiling, qorinni taranglang, oyoqlar birga.", "Kuraklarni yaqinlashtirib, iyak turnikdan oshguncha torting.", "Toʻgʻri qoʻllargacha sekin tushing. Hozircha chiqmasa, osilib turish va past tortilishdan boshlang."],
    },
    mistakes: {
      ru: ["Раскачивание корпусом вместо работы спины.", "Неполная амплитуда: опускайся до прямых рук."],
      en: ["Swinging the body instead of using your back.", "Partial reps: go all the way down to straight arms."],
      uz: ["Orqa oʻrniga tanani silkitish.", "Toʻliq boʻlmagan harakat: toʻgʻri qoʻllargacha tushing."],
    },
  },
  takedown: {
    figure: "takedown",
    name: { ru: "Проход в ноги", en: "Double-leg takedown", uz: "Oyoqqa kirish" },
    steps: {
      ru: ["Из стойки опусти уровень, сгибая колени, а не спину.", "Сделай глубокий шаг вперёд передней ногой.", "Руками обхвати воображаемые ноги соперника под коленями.", "Голова прямо, спина ровная, толчок задней ногой."],
      en: ["From your stance, drop your level by bending the knees, not the back.", "Take a deep step forward with your lead leg.", "Wrap your arms around the imaginary opponent's legs behind the knees.", "Head up, back straight, drive off your rear leg."],
      uz: ["Stoykadan belni emas, tizzalarni bukib pastlang.", "Oldingi oyoq bilan chuqur qadam tashlang.", "Xayoliy raqibning oyoqlarini tizza ortidan quchoqlang.", "Bosh toʻgʻri, orqa tekis, orqa oyoq bilan itaring."],
    },
    mistakes: {
      ru: ["Наклон спиной вместо приседа.", "Взгляд в пол."],
      en: ["Bending at the waist instead of lowering with the legs.", "Looking at the floor."],
      uz: ["Choʻkish oʻrniga beldan egilish.", "Polga qarash."],
    },
  },
};
