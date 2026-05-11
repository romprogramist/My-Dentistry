# Адаптация сайта «Моя Стоматология» под устройства 320–1536+

**Дата:** 2026-05-11
**Статус:** spec (черновик до утверждения)
**Контекст:** сайт уже частично адаптивен (Tailwind v4, `md:/lg:`-классы в 40 файлах, `MobileNav` через Sheet). Систематической проверки на узких устройствах (≤640px) и крупных мониторах (≥1536) не было.

## Цель

Сделать все 27 экранов сайта корректно отображаемыми и удобными в использовании на устройствах от **320px** (iPhone SE 1, узкие Android) до **1536+** (широкие десктопы), сохранив текущий дизайн-язык. Режим работ — «fix + polish»: чиним поломки и улучшаем шероховатости, без полного редизайна.

## Ключевые решения

| Решение | Выбор |
|---|---|
| Минимальная ширина | **320px** |
| Глубина изменений | Fix + polish |
| Sticky mobile CTA | Да |
| Иконка телефона в Header < md | Да |
| Тач-таргеты ≥ 44×44 px | Да |
| Responsive images (next/image + sizes) | Да |
| Свайп-карусели | Нет (вне scope) |
| Collapsible-секции | Нет (вне scope) |
| Порядок работ | Hybrid: фундамент → постранично |

## Breakpoint-лестница

| Token | min-width | Целевое устройство | Базовый layout |
|---|---|---|---|
| (базовый) | 320 px | iPhone SE 1, узкий Android | 1 колонка, всё стекается |
| `xs:` (новый) | 480 px | Крупные телефоны | Кнопки в 2 ряда, увеличенные карточки |
| `sm:` | 640 px | Фаблеты, ландшафт | 2-кол сетки |
| `md:` | 768 px | iPad портрет | Появляется desktop-меню, hero 2-кол |
| `lg:` | 1024 px | iPad ландшафт, ноутбук | 3-кол сетки |
| `xl:` | 1280 px | Desktop | 4-кол, `max-w-7xl` контейнер |
| `2xl:` | 1536 px | Широкие мониторы | Просторные отступы, hero крупнее |

`xs:480` добавляется через `@theme` в `app/globals.css`. Остальные точки — стандарт Tailwind, уже работают.

## Архитектура изменений

### Фаза 1 — Фундамент (один коммит на каждый пункт)

1. **Breakpoint-токен `xs`** — `app/globals.css`, секция `@theme inline`.
2. **`.touch-target` utility** — `min-h-11 min-w-11` (44px), новый CSS-класс в `globals.css` или Tailwind utility.
3. **`MobileStickyCTA` компонент** — новый файл `components/layout/MobileStickyCTA.tsx`:
   - Виден только на `<md`;
   - Две кнопки: «Позвонить» (tel:CLINIC.phones[0].tel) и «Записаться» (`/zapis/`);
   - Прилипает к низу viewport с `fixed bottom-0`, `z-50`, фон `bg-white border-t shadow-lg`.
4. **Body padding под sticky CTA** — `app/layout.tsx`: `pb-[72px] md:pb-0` на основном контейнере.
5. **Header phone-icon** — `components/layout/Header.tsx`: рядом с бургер-кнопкой иконка `Phone` как `<a href={"tel:..."}>` с 44px hit-area, видна только `<md`.
6. **Footer** — `components/layout/Footer.tsx`: сетка 1-кол базово → `sm:grid-cols-2` → `lg:grid-cols-4`.
7. **MobileNav (Sheet)** — добавить телефонный CTA внутри панели, увеличить нав-ссылки до 44px высоты, сохранить ширину 280px (помещается в 320 viewport).
8. **Container px** — единый стандарт `.container px-4 md:px-6 lg:px-8` (где сейчас расхождения).
9. **Replace `<img>` → `<Image>` в shared-компонентах** — `components/home/HomeHero.tsx` и `components/home/HomeLab.tsx` (единственные места с прямым `<img>` в `components/`). Используем `fill` + `sizes="(max-width: 768px) 100vw, 50vw"`. В остальных страничных файлах с `<img>` миграция делается в рамках их группы Фазы 2.

### Фаза 2 — Постраничный проход (один коммит на страницу)

**Группа A — Главная и Запись** (наивысший приоритет)
- `app/page.tsx` (главная) — 7 секций: hero, services, advantages, doctors, microscope, lab, contact
- `app/zapis/page.tsx` — booking flow

**Группа B — Услуги** (index + 8 подстраниц, общий шаблон)
- `app/uslugi/page.tsx`
- `app/uslugi/implantaciya/page.tsx`
- `app/uslugi/endodontiya-pod-mikroskopom/page.tsx`
- `app/uslugi/khirurgiya/page.tsx`
- `app/uslugi/lechenie-kariesa/page.tsx`
- `app/uslugi/professionalnaya-gigiena/page.tsx`
- `app/uslugi/lechenie-kanalov/page.tsx`
- `app/uslugi/protezirovanie/page.tsx`
- `app/uslugi/restavraciya-zubov/page.tsx`

**Группа C — Врачи** (index + 2 профиля)
- `app/vrachi/page.tsx`
- `app/vrachi/khechoyan-armen-aratovich/page.tsx`
- `app/vrachi/navasardyan-marine-movsesovna/page.tsx`

**Группа D — Информационные** (общий шаблон info-page)
- `app/o-klinike/page.tsx`
- `app/kontakty/page.tsx`
- `app/garantiya/page.tsx`
- `app/laboratoriya/page.tsx`
- `app/oborudovanie/page.tsx`
- `app/litsenziya/page.tsx`
- `app/nalogovyy-vychet/page.tsx`
- `app/rassrochka-i-oplata/page.tsx`

**Группа E — Контент и служебные**
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/otzyvy/page.tsx`
- `app/policy/page.tsx`
- `app/not-found.tsx`

### Постраничные правила (применяются к каждой странице соответствующей группы)

**Главная (`/`):**
- HomeHero: на `<md` картинка над текстом (`flex-col-reverse md:grid md:grid-cols-2`); h1 30→36→48px; кнопки stack на `<480`, row на `xs:`.
- HomeServices: `grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`; одинаковый `min-h` карточек; иконки 32→40px.
- HomeDoctors: на `<sm` сетка `grid-cols-1`, фото `aspect-[4/5]`; `sm:grid-cols-2 lg:grid-cols-3`.
- HomeAdvantages/Microscope/Lab: на `<md` 1-кол, текст под картинкой; на `md+` зебра 2-кол.
- HomeContact: карта `max-h-[280px] md:max-h-[420px]`; контактный блок над картой на `<md`.

**Запись (`/zapis/`):**
- Input/textarea: `min-h-11`, `text-base` (≥16px против iOS zoom).
- `TimeChips`: `grid-cols-3 sm:grid-cols-4 md:grid-cols-6`; если переполняется — `overflow-x-auto` обёртка.
- `PhoneInput`: `inputMode="tel"` уже стоит — проверить.
- `BookingSuccess`: центрирование, `px-4` на 320, `max-w-md` на десктопе.

**Услуги (шаблон):**
- Hero: 1-кол на `<md`, 2-кол на `md:`.
- Sidebar «Записаться»: на `md+` — sticky `top-20`, на `<md` — обычный inline-блок над футером.
- Таблица цен: обёрнуть в `overflow-x-auto`.
- FAQ-аккордеоны (компонент `FAQ.tsx`): проверить padding и тач-таргеты.
- Related-блок: 1→2→3 кол.

**Врачи (профиль):**
- Фото: 1-кол `<md` → 2-кол `md:`, `aspect-[4/5]`.
- Biography: `prose prose-sm md:prose-base max-w-prose`.
- Дипломы (если есть): `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

**Информационные:**
- Hero с картинкой → 2-кол на `md+`.
- Длинная prose-секция: `max-w-prose mx-auto`.
- CTA внизу: full-width на `<md`.
- Лицензия/вычет с embed-документом: обёртка `aspect-[4/5] w-full` для iframe.

**Контент:**
- `/blog/` — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, обложки c `sizes="(max-width:640px) 100vw, 50vw"`.
- `/blog/[slug]` — `prose prose-sm md:prose-base`, изображения внутри MDX `<img className="w-full">`, code-блоки `overflow-x-auto`.
- `/otzyvy/` — `ReviewsCarousel` уже embla, проверить тач-свайп, ширина слайдов `basis-full sm:basis-1/2 lg:basis-1/3`.
- `/policy/` — `max-w-prose`, table-of-contents `<md:` скрыто или collapsed.
- `/not-found` — центрирование `min-h-screen flex items-center justify-center px-4`.

## Тестирование

### Слой 1: Playwright smoke

Добавить dev-dependency `@playwright/test`. Один тест:

- Перебрать 27 маршрутов;
- Для каждого — 8 ширин viewport: 320, 375, 480, 640, 768, 1024, 1280, 1536;
- Проверка `document.body.scrollWidth ≤ window.innerWidth + 1` (нет горизонтального скролла);
- Скриншот в `tests/screens/{route}-{width}.png`.

Запуск: `npx playwright test`. Скриншоты — артефакты для review.

### Слой 2: Ручная DevTools

Chrome DevTools → Responsive mode → 320 / 375 / 393 / 480 / 768 / 1024 / 1280:

- Тач-симуляция, проверка тач-таргетов через DevTools Accessibility tools.
- На `/uslugi/*` — раскрытие FAQ.
- На `/zapis/` — заполнение формы, проверка iOS-keyboard симуляции.
- Sticky CTA не перекрывает контент при скролле.

Опционально — физический iPhone для финальной проверки sticky-CTA и tel:-ссылок.

### Acceptance criteria (на каждую страницу)

1. Нет горизонтального скролла на 320, 375, 480, 640, 768, 1024, 1280, 1536.
2. Все интерактивные элементы ≥ 44×44 px hit-area на `<md`.
3. Body-текст ≥ 16 px на mobile (иначе iOS зумит).
4. Все картинки — `<Image>` с `sizes`, не вылезают за контейнер.
5. Sticky CTA не перекрывает контент (body `pb-[72px]` на `<md`).
6. Header phone-иконка кликабельна, ведёт на `tel:`.
7. Lighthouse Mobile Performance ≥ 85, Accessibility = 100 (на главной, /uslugi, /vrachi, /zapis).

## Definition of Done

1. Фаза 1 закоммичена. По умолчанию — один общий коммит `responsive: foundations`; допустимо разбить на 2–3 коммита по логическим блокам (токены/CTA/изображения), если по ходу всплывают зависимости.
2. Каждая страница Фазы 2 — отдельный коммит вида `responsive: {page} 320-1536`. Подстраницы внутри одной группы услуг (8 шт.), если правки по единому шаблону, допускается объединить в один коммит на группу.
3. Playwright тесты зелёные.
4. Lighthouse скриншоты для 4 ключевых страниц в `tests/lighthouse/`.
5. Финальная live-проверка на `http://localhost:3002` через DevTools mobile mode.

## Вне scope

- Свайп-карусели для services/отзывов (оставляем grid).
- Collapsible-секции на длинных info-страницах.
- Темная тема (токены есть, но визуально не трогаем).
- Редизайн hero, новые анимации, новые секции.
- Изменения серверной логики, форм, MDX-контента.

## Риски

- **Playwright первый раз в проекте** — установка браузеров (~200 МБ). Принимаем.
- **Замена `<img>` → `<Image>`** в shared-компонентах может задеть LCP — следим за Lighthouse после Фазы 1.
- **Sticky CTA** перекрывает футер на коротких страницах (`/not-found`, `/policy`-якоря) — добавляем `pb-[72px] md:pb-0` глобально, проверяем 404.

## Следующий шаг

После утверждения этого спека — `writing-plans` skill превратит его в implementation plan с задачами, готовыми к параллельной/последовательной реализации.
