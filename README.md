# SPORT QUEST

Не ищи мотивацию. Найди свой спорт.

Платформа подбирает вид спорта по короткому тесту и предлагает 7-дневный квест с XP, уровнями, серией и достижениями.

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
```

Сборка: `npm run build && npm start`.

## Вход и регистрация

На сайт нельзя попасть без входа: первым открывается экран входа. Есть два способа.

**По коду из письма.** 1) Пользователь вводит свой Gmail и жмёт «Получить код». 2) На почту приходит 6-значный код, его нужно ввести на втором шаге. 3) Новых пользователей сайт спрашивает имя. Код живёт 10 минут, хранится только в виде хеша, даётся 5 попыток, повторная отправка не чаще раза в минуту.

Чтобы письма реально отправлялись, нужен почтовый ящик-отправитель (подойдёт Gmail):

1. В аккаунте Google включи двухэтапную проверку.
2. Создай пароль приложения: https://myaccount.google.com/apppasswords
3. Добавь в `.env.local`:
   ```
   SMTP_USER=твой.ящик@gmail.com
   SMTP_PASS=пароль приложения из 16 букв без пробелов
   ```
4. Перезапусти сервер.

Пока почта не настроена, сайт работает в демо-режиме: письмо не отправляется, а код показывается прямо на экране (с пометкой) и в консоли сервера.

**Через Google** (фото аккаунта появляется в шапке и профиле). Настройка ниже.

### Вход через Google

Чтобы кнопка Google заработала, нужен свой Client ID:

1. Открой https://console.cloud.google.com/ и создай проект (или выбери существующий).
2. **APIs & Services → OAuth consent screen**: тип *External*, заполни название приложения и email, сохрани.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**, тип *Web application*.
4. В **Authorized JavaScript origins** добавь `http://localhost:3000` (и адрес сайта после деплоя). Redirect URI не нужен.
5. Скопируй Client ID и создай в корне проекта файл `.env.local` (образец лежит в `.env.local.example`):
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=твой-id.apps.googleusercontent.com
   ```
6. Перезапусти `npm run dev` (для `npm start` нужно заново сделать `npm run build`).

Пока приложение в статусе *Testing*, войти смогут только аккаунты, добавленные в **Test users** на экране OAuth consent.

Как это устроено: кнопка Google Identity Services возвращает ID-токен, сервер (`/api/auth/google`) проверяет его у Google (подпись, срок, что выдан для нашего Client ID) и только потом создаёт сессию.

## Страницы

| Путь | Что там |
|---|---|
| `/` | Главная: hero, проблема, как это работает, каталог, геймификация |
| `/quiz` | Тест из 10 вопросов (клавиши 1–4, Enter, стрелки) |
| `/results` | Совместимость со всеми видами спорта, топ-3 с фото |
| `/quest` | 16 квестов (10 по видам спорта и 6 челленджей). У каждого задания есть анимация техники, шаги, частые ошибки и таймер |
| `/sports` | Каталог из 10 видов с фильтрами и подробной карточкой |
| `/profile` | Уровень, XP, показатели, любимые виды, достижения, история |
| `/map?sport=swimming` | Карта Ташкента: ближайшие места для выбранного спорта, расстояние и маршрут |

## Языки

Русский, английский и узбекский (латиница). Переключатель в шапке, выбор запоминается. Тексты интерфейса лежат в `lib/i18n.js`, тексты данных хранятся прямо в `data/*` в виде `{ ru, en, uz }`.

## Карта

`data/places-tashkent.json` — реальные бассейны, залы, поля и корты Ташкента, один раз выгруженные из OpenStreetMap (Overpass API). `/api/places` сортирует их по расстоянию от пользователя. Если геолокация недоступна или пользователь не в Ташкенте, расстояние считается от центра города. Безымянные бассейны и клубы скрыты: обычно это частные объекты. Для бокса и MMA отдельных залов в OSM мало, поэтому показаны и спортивные центры.

## Как устроено

- `data/`: виды спорта, вопросы, квесты, упражнения и достижения (mock-данные, готовые к переносу в БД).
- `components/ExerciseFigure.js`: анимированные схемы техники для 25 упражнений (позы человечка, Framer Motion).
- `lib/scoring.js`: подбор. Каждый ответ добавляет вес измерениям (team, solo, strength, speed, endurance, competition, self, water, outdoor, indoor, court). У каждого вида спорта свои коэффициенты. Совместимость считается как взвешенное среднее коэффициентов по важным для пользователя измерениям (80%) плюс совпадение по нагрузке (20%).
- `lib/progress.js`: уровни и проверка достижений.
- `components/AppProvider.js`: состояние пользователя. Хранится в localStorage, после входа синхронизируется с сервером.
- `app/api/`: регистрация, вход и сохранение прогресса (Route Handlers). Данные лежат в `.data/db.json`, пароли хешируются scrypt. Для продакшена файл стоит заменить на настоящую БД: все обращения собраны в `lib/db.js`.

Без входа сайт работает в демо-режиме под пользователем «Алексей».

Фото: Unsplash.

## Авторы фото

Основные фото: Unsplash. Фото новых видов спорта: Wikimedia Commons:

- wrestling: «Women's Freestyle 65kg Gold Medal Match Wrestling CHN-UKR YOG18 13-10-2018 (2).jpg», Mauricio V. Genta, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File%3AWomen's_Freestyle_65kg_Gold_Medal_Match_Wrestling_CHN-UKR_YOG18_13-10-2018_(2).jpg)
- judo: «Judo throw.jpg», Schnuffel2002, CC BY-SA 3.0 (https://commons.wikimedia.org/wiki/File%3AJudo_throw.jpg)
- taekwondo: «Pia Hoffmann während eines Wettkampfes.jpg», Dr. Matthias Hoffmann, CC BY 4.0 (https://commons.wikimedia.org/wiki/File%3APia_Hoffmann_w%C3%A4hrend_eines_Wettkampfes.jpg)
- karate: «2026-05-24 61. Karate-Europameisterschaften 2026 Frankfurt-Main STP 6787.jpg», Steffen Prößdorf, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File%3A2026-05-24_61._Karate-Europameisterschaften_2026_Frankfurt-Main_STP_6787.jpg)
- kickboxing: «Hamid Amni the Captain of the Iran Kickboxing National team at the Asian Indoor and Martial Arts Games 2017..jpg», Pegah hadad, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File%3AHamid_Amni_the_Captain_of_the_Iran_Kickboxing_National_team_at_the_Asian_Indoor_and_Martial_Arts_Games_2017..jpg)
- jsa (IJSA): миниатюра из Google Картинок, автор неизвестен (https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8V2npVDBr6n9x6aTtFQUAyNF2526BOIItnOsFqffdMA&s=10)
- kurash: «Kurash at village. Uzbek national sport1.jpg», Sinchalak Musulmon, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File%3AKurash_at_village._Uzbek_national_sport1.jpg)
- athletics: «141100 - Athletics track Gerrard Gosens guide action - 3b - 2000 Sydney race photo.jpg», Sport the library, CC BY-SA 3.0 (https://commons.wikimedia.org/wiki/File%3A141100_-_Athletics_track_Gerrard_Gosens_guide_action_-_3b_-_2000_Sydney_race_photo.jpg)
- weightlifting: «Sargis Martirosjan snatch-4593.jpg», Isiwal, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File%3ASargis_Martirosjan_snatch-4593.jpg)
- gymnastics: «2018-10-07 Gymnastics at 2018 Summer Youth Olympics – Boys' Artistic Gymnastics – Floor qualification (Martin Rulsch) 0028.jpg», Martin Rulsch, Wikimedia Commons, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File%3A2018-10-07_Gymnastics_at_2018_Summer_Youth_Olympics_%E2%80%93_Boys'_Artistic_Gymnastics_%E2%80%93_Floor_qualification_(Martin_Rulsch)_0028.jpg)
- climbing: «Sport climbing lead at the CISM Winter World Games 2017 in Sochi.jpg», SKas, CC BY-SA 4.0 (https://commons.wikimedia.org/wiki/File%3ASport_climbing_lead_at_the_CISM_Winter_World_Games_2017_in_Sochi.jpg)
- table_tennis: «Mondial Ping - Men's Doubles - Semifinals - 34.jpg», Pierre-Yves Beaudouin, CC BY-SA 3.0 (https://commons.wikimedia.org/wiki/File%3AMondial_Ping_-_Men's_Doubles_-_Semifinals_-_34.jpg)
- badminton: «Smash Return (7758861620).jpg», Antony Stanley from Gloucester, UK, CC BY-SA 2.0 (https://commons.wikimedia.org/wiki/File%3ASmash_Return_(7758861620).jpg)
- handball: «CZE vs FRA (01) - 2010 European Men's Handball Championship.jpg», Steindy, CC BY-SA 3.0 (https://commons.wikimedia.org/wiki/File%3ACZE_vs_FRA_(01)_-_2010_European_Men's_Handball_Championship.jpg)
