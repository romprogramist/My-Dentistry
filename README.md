# Моя Стоматология — сайт клиники

Сайт стоматологической клиники **«Моя Стоматология»** (Сочи, Донская 52) на Next.js 16 со статическим экспортом.

## Документация

- [Спецификация проекта](docs/superpowers/specs/2026-05-06-moya-stomatologiya-design.md) — что и зачем мы строим
- [План имплементации MVP](docs/superpowers/plans/2026-05-06-mvp-implementation.md) — пошаговая разработка
- [Инструкция деплоя](DEPLOY.md)
- [Booking handler](server/booking-handler/README.md) — отдельный Express-сервер для приёма заявок

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000.

## Сборка

```bash
npm run build
# Результат в out/, генерируется sitemap.xml + robots.txt
```

## Тесты

```bash
npm test           # одноразовый прогон
npm run test:watch # watch-режим
```

## Стек

- **Next.js 16** (App Router, static export — `output: 'export'`)
- **TypeScript** (strict + noUncheckedIndexedAccess)
- **TailwindCSS 4** (CSS-first config через `@theme`)
- **shadcn/ui** на base-ui (button, input, accordion, sheet, card, и т.д.)
- **MDX** для блога (`@next/mdx` + gray-matter)
- **react-hook-form + zod** для форм
- **vitest** + `@testing-library/react`
- **embla-carousel-react** для отзывов
- **next-sitemap** для генерации sitemap

## Структура

```
app/                    # Next.js App Router pages
components/
  ui/                   # shadcn/ui (10+ базовых компонентов)
  layout/               # Header, Footer, Breadcrumbs, MobileNav
  blocks/               # FAQ, ReviewsCarousel
  home/                 # 7 блоков главной страницы
  forms/                # BookingForm
content/
  blog/*.mdx            # Статьи блога
  reviews/index.ts      # Курированные отзывы
lib/
  constants/            # NAP, services, прайс
  schema/               # Schema.org JSON-LD builders (TDD)
  seo/                  # createPageMetadata helper
  forms/                # zod-схема + submit
  blog/                 # MDX loader
  utils/                # transliterate (TDD)
server/
  booking-handler/      # Express-сервер для Telegram-форвардинга
tests/                  # 18 тестов (transliterate, schema, booking)
docs/
  superpowers/specs/    # Спецификация
  superpowers/plans/    # План MVP
public/                 # Статика (фото, лицензия — заглушки)
DEPLOY.md               # Инструкция деплоя на nginx
```

## Что заполняется в Phase 2 (после MVP)

В коде заглушки на месте этих ассетов — заменяются после получения от заказчика:

- Фото клиники, врачей, оборудования (микроскоп), зубного техника
- Скан медицинской лицензии (`public/docs/`)
- Контент 12 страниц услуг (сейчас заполнена 1 — циркониевые коронки)
- Расширенная биография 2 врачей (имена, специализации, цитаты — есть)
- 30 статей блога (сейчас 1 — про эндодонтию под микроскопом)
- Telegram-бот: токен и chat_id в `server/booking-handler/.env`

## Лицензия и реквизиты

Сайт построен для ООО «Моя Стоматология» (ОГРН 1202300026532).
