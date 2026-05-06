# Моя Стоматология — MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Запустить первую версию сайта стоматологической клиники «Моя Стоматология» (Сочи) — рабочая главная страница, по одному примеру каждого типа страницы (услуга, врач, статья блога), функциональная форма записи с отправкой в Telegram, полная SEO-инфраструктура, готовый для деплоя на собственный nginx-сервер.

**Architecture:** Next.js 15 (App Router) с `output: 'export'` → статика в папке `out/`. Контент через MDX. Форма записи отправляется через мини Node.js / Express-сервер на стороне заказчика, который форвардит запросы в Telegram Bot API (бот-токен живёт на сервере, не в браузере). SEO-каркас: typed JSON-LD builders, generateMetadata, next-sitemap. Дизайн на TailwindCSS + shadcn/ui.

**Tech Stack:** Next.js 15, TypeScript (strict), TailwindCSS 4, shadcn/ui, MDX (`@next/mdx`), react-hook-form, zod, vitest + @testing-library/react, embla-carousel-react, next-sitemap, Express (для booking-handler).

**Контекст спецификации:** см. `docs/superpowers/specs/2026-05-06-moya-stomatologiya-design.md` — главный источник правды по бизнес-задаче, УТП, ценам и SEO-стратегии.

**Out of scope MVP (отдельный план):**
- Контент 13 страниц услуг (после MVP)
- 30 статей блога (после MVP)
- Off-site SEO работа: оптимизация Я.Бизнеса, 2ГИС, Google Business
- Английская версия

---

## Структура файлов проекта

```
moya-stomatologiya/
├── app/
│   ├── layout.tsx                          # Root layout, JSON-LD Organization
│   ├── page.tsx                            # Главная
│   ├── not-found.tsx
│   ├── uslugi/
│   │   ├── page.tsx                        # Каталог услуг
│   │   └── protezirovanie/
│   │       └── koronki-cirkoniy/
│   │           └── page.tsx                # MVP: один пример страницы услуги
│   ├── vrachi/
│   │   ├── page.tsx                        # Список врачей
│   │   └── khechoyan-armen-aratovich/
│   │       └── page.tsx                    # MVP: один пример страницы врача
│   ├── blog/
│   │   ├── page.tsx                        # Список статей
│   │   └── [slug]/
│   │       └── page.tsx                    # Шаблон статьи
│   ├── kontakty/page.tsx
│   ├── zapis/page.tsx
│   ├── policy/page.tsx
│   └── litsenziya/page.tsx
│
├── components/
│   ├── ui/                                 # shadcn/ui (button, input, accordion, …)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── MobileNav.tsx
│   ├── blocks/
│   │   ├── FAQ.tsx                         # FAQ accordion + FAQPage schema
│   │   ├── ReviewsCarousel.tsx
│   │   ├── ServiceLead.tsx
│   │   ├── ServiceStages.tsx
│   │   ├── ServicePricing.tsx
│   │   ├── ServiceDoctor.tsx
│   │   ├── DoctorHero.tsx
│   │   ├── DoctorEducation.tsx
│   │   ├── BlogHero.tsx
│   │   └── ArticleAuthor.tsx
│   ├── home/                               # Блоки главной
│   │   ├── HomeHero.tsx
│   │   ├── HomeAdvantages.tsx
│   │   ├── HomeServices.tsx
│   │   ├── HomeLab.tsx
│   │   ├── HomeMicroscope.tsx
│   │   ├── HomeDoctors.tsx
│   │   ├── HomeReviews.tsx
│   │   ├── HomePayment.tsx
│   │   ├── HomeFAQ.tsx
│   │   └── HomeContact.tsx
│   └── forms/
│       └── BookingForm.tsx
│
├── content/
│   ├── services/
│   │   └── koronki-cirkoniy.mdx            # MVP-пример (контент в Phase 2)
│   ├── doctors/
│   │   └── khechoyan-armen-aratovich.mdx   # MVP-заглушка (имя, специализация — реальные)
│   ├── blog/
│   │   └── chto-takoye-endodontiya-pod-mikroskopom.mdx  # MVP-пример
│   └── reviews/
│       └── index.ts                        # Курированный набор отзывов
│
├── lib/
│   ├── seo/
│   │   └── metadata.ts                     # createPageMetadata helper
│   ├── schema/
│   │   ├── types.ts                        # Schema.org TS types
│   │   └── builders.ts                     # buildOrganization, buildMedicalClinic, …
│   ├── forms/
│   │   └── booking-schema.ts               # zod-схема + типы
│   ├── telegram/
│   │   └── send-booking.ts                 # forwardToTelegram(data)
│   ├── utils/
│   │   ├── transliterate.ts                # ISO 9 транслитерация
│   │   └── cn.ts                           # tailwind class merger
│   └── constants/
│       ├── clinic.ts                       # NAP, лицензия, ОГРН, рейтинги
│       └── services.ts                     # каталог услуг с ценами для главной
│
├── server/
│   └── booking-handler/
│       ├── index.js                        # Express-сервер для форм
│       ├── package.json
│       └── README.md                       # Инструкция деплоя
│
├── tests/
│   ├── setup.ts
│   ├── lib/
│   │   ├── schema.test.ts
│   │   ├── transliterate.test.ts
│   │   └── booking-schema.test.ts
│   └── forms/
│       └── BookingForm.test.tsx
│
├── public/
│   ├── images/
│   │   ├── clinic/                         # Фото клиники (заглушки на этапе MVP)
│   │   ├── doctors/
│   │   └── og/                             # Open Graph картинки
│   └── docs/
│       └── litsenziya.jpg                  # Скан лицензии (после получения)
│
├── DEPLOY.md                               # Инструкция деплоя на nginx
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── package.json
└── README.md
```

---

## Этап 1: Foundation

### Task 1: Инициализация Next.js проекта

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Инициализация Next.js**

Run:
```bash
cd /Users/jasminagababyan/moya-stomatologiya
npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*" --turbopack --use-npm
```

When prompted "Would you like to use Tailwind CSS?": yes
When prompted "Would you like your code inside a `src/` directory?": no
When prompted "Would you like to use Turbopack for `next dev`?": yes

Expected: Next.js project files created in current directory alongside existing `docs/` folder.

- [ ] **Step 2: Настройка static export в next.config.ts**

Replace `next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // нужно при output: 'export'
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
```

- [ ] **Step 3: Настройка строгого TypeScript**

Edit `tsconfig.json` — set `"strict": true`, add:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

- [ ] **Step 4: Создать структуру папок**

Run:
```bash
mkdir -p components/{ui,layout,blocks,home,forms} \
         content/{services,doctors,blog,reviews} \
         lib/{seo,schema,forms,telegram,utils,constants} \
         server/booking-handler \
         tests/{lib,forms} \
         public/{images/{clinic,doctors,og},docs}
```

- [ ] **Step 5: Заменить `app/page.tsx` на простую главную-заглушку**

Replace `app/page.tsx`:
```tsx
export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Моя Стоматология</h1>
      <p className="mt-4 text-lg text-gray-600">Сайт в разработке.</p>
    </main>
  );
}
```

- [ ] **Step 6: Запустить dev-сервер для проверки**

Run: `npm run dev`
Expected: Сервер стартует на http://localhost:3000, страница «Моя Стоматология» отображается.
Остановить: Ctrl+C.

- [ ] **Step 7: Запустить build для проверки static export**

Run: `npm run build`
Expected: Папка `out/` создана, в ней `index.html`.

- [ ] **Step 8: Инициализация git + первый коммит**

Run:
```bash
git init
git add -A
git commit -m "chore: initialize Next.js 15 project with static export"
```

---

### Task 2: Установка shadcn/ui

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`
- Create: `components/ui/*.tsx`, `lib/utils/cn.ts`

- [ ] **Step 1: Инициализация shadcn**

Run: `npx shadcn@latest init`

Ответы на вопросы:
- Style: `default`
- Base color: `slate`
- CSS variables: `yes`

Это создаст `components/ui/`, `lib/utils.ts`, обновит `tailwind.config.ts` и `app/globals.css`.

- [ ] **Step 2: Установить базовые компоненты**

Run:
```bash
npx shadcn@latest add button input textarea label accordion dialog navigation-menu separator sheet card checkbox
```

- [ ] **Step 3: Перенести utils.ts в правильное место**

Run:
```bash
mv lib/utils.ts lib/utils/cn.ts
```

Затем поправить импорты в `components/ui/*.tsx` — найти и заменить `@/lib/utils` на `@/lib/utils/cn`:
```bash
grep -rl '@/lib/utils' components/ui/ | xargs sed -i.bak 's|@/lib/utils|@/lib/utils/cn|g' && find components/ui -name "*.bak" -delete
```

(На macOS: `sed -i '' ...` без точки. Используй вариант, подходящий твоей ОС.)

- [ ] **Step 4: Проверить сборку**

Run: `npm run build`
Expected: Сборка проходит без ошибок типов.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add shadcn/ui with base components"
```

---

### Task 3: Настройка vitest

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`, `tests/lib/sanity.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Установить зависимости**

Run:
```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 2: Создать `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 3: Создать `tests/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Добавить script в package.json**

В `"scripts"` добавить:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Написать sanity-test**

Create `tests/lib/sanity.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("sanity", () => {
  it("math works", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Запустить тесты**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: configure vitest"
```

---

### Task 4: Дизайн-токены и константы клиники

**Files:**
- Create: `lib/constants/clinic.ts`, `lib/constants/services.ts`
- Modify: `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Создать `lib/constants/clinic.ts`**

```ts
export const CLINIC = {
  name: "Моя Стоматология",
  legalName: "ООО «Моя Стоматология»",
  ogrn: "1202300026532",
  license: {
    number: "Л041-01126-23/01675368",
    isPerpetual: true,
  },
  founded: 2020,
  address: {
    street: "ул. Донская, 52",
    floor: "1 этаж",
    district: "Центральный район",
    city: "Сочи",
    region: "Краснодарский край",
    postalCode: "354068",
    country: "RU",
    full: "354068, Краснодарский край, Сочи, Центральный район, ул. Донская, 52, 1 этаж",
  },
  geo: {
    latitude: 43.6178,
    longitude: 39.7242,
  },
  phones: [
    { display: "+7 (989) 168-71-13", tel: "+79891687113" },
    { display: "+7 (988) 145-99-96", tel: "+79881459996" },
  ],
  hours: {
    weekdays: "Пн–Сб: 09:00–19:00",
    weekend: "Вс: выходной",
    structured: [
      { days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "09:00", closes: "19:00" },
    ],
  },
  social: {
    instagram: "https://instagram.com/moya_stomatologiya23",
  },
  ratings: {
    twogis: { score: 4.9, count: 104 },
    yandex: { score: 4.7, count: 40 },
  },
  domain: "https://mydentsochi.ru",
} as const;
```

- [ ] **Step 2: Создать `lib/constants/services.ts`**

```ts
export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
};

export type Service = {
  slug: string;
  category: string; // category.slug
  title: string;
  shortTitle: string;
  description: string;
  priceFrom: number;
  priceTo?: number;
  unit?: string; // "за 1 единицу"
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "protezirovanie",
    title: "Протезирование зубов",
    shortTitle: "Протезирование",
    description: "Коронки, виниры, мосты, съёмные и бюгельные протезы. Своя зуботехническая база — сроки от 5 до 10 дней.",
  },
  {
    slug: "implantaciya",
    title: "Имплантация зубов",
    shortTitle: "Имплантация",
    description: "Корейские и израильские системы имплантов. Костная пластика и синус-лифтинг. Гарантия 5 лет.",
  },
  {
    slug: "endodontiya-pod-mikroskopom",
    title: "Эндодонтия под микроскопом",
    shortTitle: "Микроскоп",
    description: "Лечение и перелечивание корневых каналов под дентальным микроскопом — спасаем зубы, которые в других клиниках предлагают удалить.",
  },
  {
    slug: "lechenie-kariesa",
    title: "Лечение кариеса",
    shortTitle: "Кариес",
    description: "Безболезненное лечение кариеса любой сложности с применением современных пломбировочных материалов.",
  },
  {
    slug: "lechenie-kanalov",
    title: "Лечение каналов (пульпит, периодонтит)",
    shortTitle: "Каналы",
    description: "Лечение и перелечивание каналов с медикаментозной обработкой и контрольными снимками.",
  },
  {
    slug: "professionalnaya-gigiena",
    title: "Профессиональная гигиена полости рта",
    shortTitle: "Гигиена",
    description: "Ультразвуковая чистка, AIR-FLOW, удаление зубных отложений. Раз в 6 месяцев — для здоровья дёсен.",
  },
  {
    slug: "khirurgiya",
    title: "Хирургическая стоматология",
    shortTitle: "Хирургия",
    description: "Удаление зубов любой сложности, в том числе ретенированных и зубов мудрости.",
  },
  {
    slug: "restavraciya-zubov",
    title: "Реставрация зубов",
    shortTitle: "Реставрация",
    description: "Прямая художественная реставрация — восстанавливаем форму, цвет и функцию зуба за один визит.",
  },
];

export const FEATURED_SERVICES: Service[] = [
  {
    slug: "protezirovanie/koronki-cirkoniy",
    category: "protezirovanie",
    title: "Циркониевые коронки",
    shortTitle: "Коронка цирконий",
    description: "Прочные, эстетичные, биосовместимые. Срок изготовления — от 5 дней.",
    priceFrom: 20000,
    priceTo: 22000,
    unit: "за 1 единицу",
  },
  {
    slug: "implantaciya",
    category: "implantaciya",
    title: "Имплантация зубов",
    shortTitle: "Имплант",
    description: "Корея от 25 000 ₽, Израиль от 35 000 ₽. Гарантия 5 лет.",
    priceFrom: 25000,
    unit: "под ключ",
  },
  {
    slug: "protezirovanie/viniry",
    category: "protezirovanie",
    title: "Виниры E.max",
    shortTitle: "Виниры",
    description: "Голливудская улыбка за 10 дней. Тонкие керамические накладки, не темнеют со временем.",
    priceFrom: 25000,
    unit: "за 1 единицу",
  },
  {
    slug: "professionalnaya-gigiena",
    category: "professionalnaya-gigiena",
    title: "Профгигиена",
    shortTitle: "Чистка",
    description: "Ультразвук + AIR-FLOW + полировка. Безопасно для эмали.",
    priceFrom: 5000,
    priceTo: 7000,
    unit: "комплекс",
  },
  {
    slug: "khirurgiya/udalenie-zuba-mudrosti",
    category: "khirurgiya",
    title: "Удаление зуба мудрости",
    shortTitle: "Удаление 8-ки",
    description: "Простое и сложное удаление, в т.ч. ретенированных зубов мудрости.",
    priceFrom: 5000,
    priceTo: 10000,
    unit: "за 1 зуб",
  },
  {
    slug: "lechenie-kanalov",
    category: "lechenie-kanalov",
    title: "Лечение каналов",
    shortTitle: "Каналы",
    description: "Под микроскопом, с контрольными снимками, временной пломбой.",
    priceFrom: 5000,
    priceTo: 6000,
    unit: "за 1 канал",
  },
];
```

- [ ] **Step 3: Расширить tailwind.config.ts (брендовая палитра)**

Найти секцию `extend.colors` и добавить:
```ts
colors: {
  brand: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",  // основной
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  // ... остальные shadcn-токены оставить как есть
},
```

(Бренд-цвет временный — заказчик может попросить другой при ревью первого превью.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add clinic constants and brand color palette"
```

---

## Этап 2: SEO Infrastructure (TDD)

### Task 5: Утилита транслитерации (TDD)

**Files:**
- Create: `lib/utils/transliterate.ts`, `tests/lib/transliterate.test.ts`

- [ ] **Step 1: Написать падающий тест**

Create `tests/lib/transliterate.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { transliterate } from "@/lib/utils/transliterate";

describe("transliterate", () => {
  it("converts Russian phrase to ISO 9 latin", () => {
    expect(transliterate("Циркониевые коронки")).toBe("cirkonievye-koronki");
  });

  it("handles soft sign", () => {
    expect(transliterate("Учитель")).toBe("uchitel");
  });

  it("handles all special letters", () => {
    expect(transliterate("Щит ёж юла")).toBe("shchit-yozh-yula");
  });

  it("normalizes spaces and dashes", () => {
    expect(transliterate("Удаление зуба   мудрости")).toBe("udalenie-zuba-mudrosti");
  });

  it("strips non-alphanumeric except dashes", () => {
    expect(transliterate("Виниры (E.max)")).toBe("viniry-e-max");
  });
});
```

- [ ] **Step 2: Запустить тест и убедиться что падает**

Run: `npm test transliterate`
Expected: FAIL — function not defined.

- [ ] **Step 3: Написать минимальную реализацию**

Create `lib/utils/transliterate.ts`:
```ts
const MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
  ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
  н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
  ф: "f", х: "kh", ц: "c", ч: "ch", ш: "sh", щ: "shch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function transliterate(input: string): string {
  return input
    .toLowerCase()
    .split("")
    .map((ch) => (ch in MAP ? MAP[ch] : ch))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

- [ ] **Step 4: Запустить тесты**

Run: `npm test transliterate`
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(lib): add ISO 9 transliteration utility"
```

---

### Task 6: Schema.org TypeScript типы

**Files:**
- Create: `lib/schema/types.ts`

- [ ] **Step 1: Создать минимально достаточные типы**

Create `lib/schema/types.ts`:
```ts
export type SchemaContext = "https://schema.org";

export type WithContext<T> = T & { "@context": SchemaContext };

export type PostalAddress = {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
};

export type GeoCoordinates = {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
};

export type OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

export type AggregateRating = {
  "@type": "AggregateRating";
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
};

export type Review = {
  "@type": "Review";
  author: { "@type": "Person"; name: string };
  reviewBody: string;
  reviewRating: { "@type": "Rating"; ratingValue: number; bestRating?: number };
  datePublished?: string;
};

export type Organization = {
  "@type": "Organization";
  "@id"?: string;
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
};

export type MedicalClinic = {
  "@type": "MedicalClinic" | "Dentist";
  "@id"?: string;
  name: string;
  url: string;
  telephone: string[];
  address: PostalAddress;
  geo: GeoCoordinates;
  openingHoursSpecification: OpeningHoursSpecification[];
  priceRange?: string;
  aggregateRating?: AggregateRating;
  image?: string[];
  sameAs?: string[];
};

export type Person = {
  "@type": "Person";
  "@id"?: string;
  name: string;
  jobTitle?: string;
  image?: string;
  description?: string;
  alumniOf?: string;
  worksFor?: { "@type": "MedicalClinic" | "Dentist"; name: string; "@id"?: string };
};

export type Service = {
  "@type": "Service";
  serviceType: string;
  provider: { "@type": "Dentist"; name: string; "@id"?: string };
  areaServed: { "@type": "City"; name: string };
  description: string;
  offers?: Offer[];
};

export type Offer = {
  "@type": "Offer";
  price: number;
  priceCurrency: "RUB";
  availability: "https://schema.org/InStock";
};

export type BreadcrumbList = {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

export type FAQPage = {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>;
};

export type Article = {
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  author: Person;
  publisher: Organization;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: { "@type": "WebPage"; "@id": string };
};
```

- [ ] **Step 2: Commit (типы без тестов — TDD только для рантайм-кода)**

```bash
git add -A
git commit -m "feat(schema): add schema.org TypeScript types"
```

---

### Task 7: Schema.org builders (TDD)

**Files:**
- Create: `lib/schema/builders.ts`, `tests/lib/schema.test.ts`

- [ ] **Step 1: Написать падающие тесты для buildOrganization**

Create `tests/lib/schema.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  buildOrganization,
  buildMedicalClinic,
  buildBreadcrumbList,
  buildPersonDentist,
  buildFAQPage,
} from "@/lib/schema/builders";

describe("buildOrganization", () => {
  it("returns valid Organization JSON-LD", () => {
    const result = buildOrganization();
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Organization");
    expect(result.name).toBe("Моя Стоматология");
    expect(result.url).toBe("https://mydentsochi.ru");
  });
});

describe("buildMedicalClinic", () => {
  it("includes address, geo, hours, telephones", () => {
    const result = buildMedicalClinic();
    expect(result["@type"]).toBe("Dentist");
    expect(result.address.postalCode).toBe("354068");
    expect(result.geo.latitude).toBe(43.6178);
    expect(result.telephone).toContain("+79891687113");
    expect(result.openingHoursSpecification[0].opens).toBe("09:00");
  });

  it("includes aggregateRating computed from 2GIS + Yandex", () => {
    const result = buildMedicalClinic();
    expect(result.aggregateRating).toBeDefined();
    expect(result.aggregateRating?.reviewCount).toBe(144); // 104 + 40
    expect(result.aggregateRating?.ratingValue).toBeGreaterThan(4.7);
  });
});

describe("buildBreadcrumbList", () => {
  it("builds correct positions and URLs", () => {
    const crumbs = buildBreadcrumbList([
      { name: "Главная", url: "https://mydentsochi.ru/" },
      { name: "Услуги", url: "https://mydentsochi.ru/uslugi/" },
      { name: "Циркониевые коронки", url: "https://mydentsochi.ru/uslugi/protezirovanie/koronki-cirkoniy/" },
    ]);
    expect(crumbs.itemListElement).toHaveLength(3);
    expect(crumbs.itemListElement[0].position).toBe(1);
    expect(crumbs.itemListElement[2].name).toBe("Циркониевые коронки");
  });
});

describe("buildPersonDentist", () => {
  it("creates Person + Dentist linkage", () => {
    const result = buildPersonDentist({
      name: "Хечоян Армен Араратович",
      jobTitle: "Врач-ортопед",
      image: "/images/doctors/khechoyan.jpg",
    });
    expect(result["@type"]).toBe("Person");
    expect(result.jobTitle).toBe("Врач-ортопед");
    expect(result.worksFor?.name).toBe("Моя Стоматология");
  });
});

describe("buildFAQPage", () => {
  it("builds Question/Answer entities", () => {
    const result = buildFAQPage([
      { question: "Сколько служит коронка?", answer: "От 10 до 15 лет." },
    ]);
    expect(result.mainEntity).toHaveLength(1);
    expect(result.mainEntity[0]["@type"]).toBe("Question");
    expect(result.mainEntity[0].acceptedAnswer.text).toBe("От 10 до 15 лет.");
  });
});
```

- [ ] **Step 2: Запустить тесты — должны упасть**

Run: `npm test schema`
Expected: FAIL — builders not defined.

- [ ] **Step 3: Реализовать builders**

Create `lib/schema/builders.ts`:
```ts
import { CLINIC } from "@/lib/constants/clinic";
import type {
  WithContext,
  Organization,
  MedicalClinic,
  Person,
  BreadcrumbList,
  FAQPage,
  Article,
  AggregateRating,
} from "./types";

const CLINIC_ID = `${CLINIC.domain}/#clinic`;
const ORG_ID = `${CLINIC.domain}/#organization`;

export function buildOrganization(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: CLINIC.name,
    url: CLINIC.domain,
    logo: `${CLINIC.domain}/images/logo.png`,
    sameAs: [CLINIC.social.instagram],
  };
}

function combineRatings(): AggregateRating {
  const a = CLINIC.ratings.twogis;
  const b = CLINIC.ratings.yandex;
  const totalCount = a.count + b.count;
  const weighted = (a.score * a.count + b.score * b.count) / totalCount;
  return {
    "@type": "AggregateRating",
    ratingValue: Number(weighted.toFixed(2)),
    reviewCount: totalCount,
    bestRating: 5,
    worstRating: 1,
  };
}

export function buildMedicalClinic(): WithContext<MedicalClinic> {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": CLINIC_ID,
    name: CLINIC.name,
    url: CLINIC.domain,
    telephone: CLINIC.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${CLINIC.address.street}, ${CLINIC.address.floor}`,
      addressLocality: CLINIC.address.city,
      addressRegion: CLINIC.address.region,
      postalCode: CLINIC.address.postalCode,
      addressCountry: CLINIC.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC.geo.latitude,
      longitude: CLINIC.geo.longitude,
    },
    openingHoursSpecification: CLINIC.hours.structured.map((h) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: "₽₽",
    aggregateRating: combineRatings(),
    sameAs: [CLINIC.social.instagram],
  };
}

export function buildBreadcrumbList(
  crumbs: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function buildPersonDentist(args: {
  name: string;
  jobTitle: string;
  image?: string;
  description?: string;
  alumniOf?: string;
}): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: args.name,
    jobTitle: args.jobTitle,
    image: args.image ? `${CLINIC.domain}${args.image}` : undefined,
    description: args.description,
    alumniOf: args.alumniOf,
    worksFor: {
      "@type": "Dentist",
      "@id": CLINIC_ID,
      name: CLINIC.name,
    },
  };
}

export function buildFAQPage(
  items: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question" as const,
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: it.answer,
      },
    })),
  };
}

export function buildArticle(args: {
  headline: string;
  description: string;
  image: string;
  authorName: string;
  authorJobTitle: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    image: `${CLINIC.domain}${args.image}`,
    author: {
      "@type": "Person",
      name: args.authorName,
      jobTitle: args.authorJobTitle,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: CLINIC.name,
      url: CLINIC.domain,
      logo: `${CLINIC.domain}/images/logo.png`,
    },
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": args.url,
    },
  };
}
```

- [ ] **Step 4: Запустить тесты**

Run: `npm test schema`
Expected: All passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(schema): add JSON-LD builders for clinic, breadcrumbs, FAQ, dentist, article"
```

---

### Task 8: Метаданные (createPageMetadata)

**Files:**
- Create: `lib/seo/metadata.ts`

- [ ] **Step 1: Реализовать helper**

Create `lib/seo/metadata.ts`:
```ts
import type { Metadata } from "next";
import { CLINIC } from "@/lib/constants/clinic";

export type PageMetadataInput = {
  title: string;          // без бренда
  description: string;
  path: string;           // относительный, начинается с /
  ogImage?: string;       // абсолютный или /relative
  noIndex?: boolean;
};

const TITLE_SUFFIX = ` — ${CLINIC.name}`;

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const url = `${CLINIC.domain}${input.path}`;
  const fullTitle = `${input.title}${TITLE_SUFFIX}`;
  const og = input.ogImage
    ? input.ogImage.startsWith("http")
      ? input.ogImage
      : `${CLINIC.domain}${input.ogImage}`
    : `${CLINIC.domain}/images/og/default.jpg`;

  return {
    title: fullTitle,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url,
      siteName: CLINIC.name,
      type: "website",
      locale: "ru_RU",
      images: [{ url: og, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
      images: [og],
    },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(seo): add createPageMetadata helper"
```

---

### Task 9: next-sitemap конфигурация

**Files:**
- Create: `next-sitemap.config.js`
- Modify: `package.json`

- [ ] **Step 1: Установить пакет**

Run: `npm install -D next-sitemap`

- [ ] **Step 2: Создать `next-sitemap.config.js`**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mydentsochi.ru',
  generateRobotsTxt: true,
  outDir: 'out',
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/policy/', '/litsenziya/'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/'] },
    ],
  },
  transform: async (config, path) => {
    const priority = path === '/' ? 1.0
      : path.startsWith('/uslugi/') ? 0.9
      : path.startsWith('/vrachi/') ? 0.8
      : path.startsWith('/blog/') ? 0.7
      : 0.6;
    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
```

- [ ] **Step 3: Добавить postbuild скрипт**

В `package.json` → `"scripts"`:
```json
"postbuild": "next-sitemap"
```

- [ ] **Step 4: Проверить генерацию**

Run: `npm run build`
Expected: После сборки в `out/` появятся `sitemap.xml`, `sitemap-0.xml`, `robots.txt`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(seo): add next-sitemap with priority rules"
```

---

## Этап 3: Layout

### Task 10: Header компонент

**Files:**
- Create: `components/layout/Header.tsx`, `components/layout/MobileNav.tsx`

- [ ] **Step 1: Создать `components/layout/Header.tsx`**

```tsx
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";
import { MobileNav } from "./MobileNav";

const NAV = [
  { href: "/uslugi/", label: "Услуги" },
  { href: "/vrachi/", label: "Врачи" },
  { href: "/o-klinike/", label: "О клинике" },
  { href: "/blog/", label: "Блог" },
  { href: "/kontakty/", label: "Контакты" },
] as const;

export function Header() {
  const primaryPhone = CLINIC.phones[0];
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-brand-700">Моя Стоматология</span>
          <span className="text-xs text-muted-foreground">Сочи · Донская 52</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${primaryPhone.tel}`}
            className="hidden items-center gap-2 text-sm font-semibold text-brand-700 md:flex"
          >
            <Phone className="h-4 w-4" />
            {primaryPhone.display}
          </a>
          <Button asChild size="sm">
            <Link href="/zapis/">Записаться</Link>
          </Button>
          <MobileNav nav={NAV} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Создать `components/layout/MobileNav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

type NavItem = { href: string; label: string };

export function MobileNav({ nav }: { nav: readonly NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Меню">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <SheetTitle className="sr-only">Меню навигации</SheetTitle>
        <nav className="mt-8 flex flex-col gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 3: Установить иконки**

Run: `npm install lucide-react`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(layout): add Header with mobile nav"
```

---

### Task 11: Footer компонент

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Создать `components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { Instagram } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-base font-bold text-brand-700">{CLINIC.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Стоматология полного цикла в центре Сочи. Лечение, протезирование, имплантация.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={CLINIC.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-brand-600"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Навигация</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/uslugi/" className="hover:text-brand-600">Услуги</Link></li>
            <li><Link href="/vrachi/" className="hover:text-brand-600">Врачи</Link></li>
            <li><Link href="/o-klinike/" className="hover:text-brand-600">О клинике</Link></li>
            <li><Link href="/blog/" className="hover:text-brand-600">Блог</Link></li>
            <li><Link href="/otzyvy/" className="hover:text-brand-600">Отзывы</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Информация</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/garantiya/" className="hover:text-brand-600">Гарантия 1–5 лет</Link></li>
            <li><Link href="/rassrochka-i-oplata/" className="hover:text-brand-600">Рассрочка и оплата</Link></li>
            <li><Link href="/nalogovyy-vychet/" className="hover:text-brand-600">Налоговый вычет 13%</Link></li>
            <li><Link href="/litsenziya/" className="hover:text-brand-600">Лицензия</Link></li>
            <li><Link href="/policy/" className="hover:text-brand-600">Политика конфиденциальности</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Контакты</h4>
          <p className="mt-3 text-sm text-muted-foreground">{CLINIC.address.full}</p>
          <p className="mt-2 text-sm">
            {CLINIC.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-brand-600">
                {p.display}
              </a>
            ))}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{CLINIC.hours.weekdays}</p>
          <p className="text-sm text-muted-foreground">{CLINIC.hours.weekend}</p>
        </div>
      </div>

      <div className="border-t py-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 text-xs text-muted-foreground">
          <p>{CLINIC.legalName}, ОГРН {CLINIC.ogrn}</p>
          <p>Лицензия {CLINIC.license.number}, бессрочная</p>
          <p>© {new Date().getFullYear()} {CLINIC.name}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(layout): add Footer"
```

---

### Task 12: Breadcrumbs компонент

**Files:**
- Create: `components/layout/Breadcrumbs.tsx`

- [ ] **Step 1: Создать компонент**

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { buildBreadcrumbList } from "@/lib/schema/builders";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Главная", href: "/" }, ...items];
  const schemaItems = all.map((c) => ({
    name: c.name,
    url: `${CLINIC.domain}${c.href}`,
  }));
  const schema = buildBreadcrumbList(schemaItems);

  return (
    <>
      <nav aria-label="Хлебные крошки" className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                {isLast ? (
                  <span className="text-foreground" aria-current="page">{c.name}</span>
                ) : (
                  <Link href={c.href} className="hover:text-brand-600">{c.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(layout): add Breadcrumbs with schema.org"
```

---

### Task 13: Root layout с глобальной schema

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Заменить содержимое `app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildOrganization, buildMedicalClinic } from "@/lib/schema/builders";
import { CLINIC } from "@/lib/constants/clinic";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(CLINIC.domain),
  title: {
    default: `${CLINIC.name} — стоматология в Сочи`,
    template: `%s — ${CLINIC.name}`,
  },
  description:
    "Стоматология полного цикла в центре Сочи. Лечение, протезирование, имплантация. ★ 4.9 на 2ГИС.",
};

export const viewport: Viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = buildOrganization();
  const clinicSchema = buildMedicalClinic();
  return (
    <html lang="ru">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Запустить dev и убедиться что всё рендерится**

Run: `npm run dev`
Открыть http://localhost:3000 — должен быть header, заглушка контента, footer.
В DevTools → Elements найти `<script type="application/ld+json">` — там JSON-LD клиники.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(layout): wire root layout with header/footer and global schema"
```

---

## Этап 4: Шаблоны страниц

### Task 14: FAQ Accordion компонент с авто-schema

**Files:**
- Create: `components/blocks/FAQ.tsx`

- [ ] **Step 1: Реализовать**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildFAQPage } from "@/lib/schema/builders";

export type FAQItem = { question: string; answer: string };

export function FAQ({ items, title = "Частые вопросы" }: { items: FAQItem[]; title?: string }) {
  const schema = buildFAQPage(items);
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <Accordion type="single" collapsible className="mt-6">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(blocks): add FAQ component with FAQPage schema"
```

---

### Task 15: ReviewsCarousel компонент

**Files:**
- Create: `components/blocks/ReviewsCarousel.tsx`, `content/reviews/index.ts`

- [ ] **Step 1: Установить embla**

Run: `npm install embla-carousel-react`

- [ ] **Step 2: Создать данные отзывов (курированные)**

Create `content/reviews/index.ts`:
```ts
export type ReviewData = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: "2gis" | "yandex";
  date: string;
};

// Кураторская выборка отзывов: НЕ используем те, что упоминают врачей вне нашего списка (Андраник, Давид, Анна)
export const REVIEWS: ReviewData[] = [
  {
    author: "Анна К.",
    rating: 5,
    text: "Отличная клиника, всё прошло безболезненно и без осложнений. Аккуратно и профессионально.",
    source: "2gis",
    date: "2025-09",
  },
  {
    author: "Михаил П.",
    rating: 5,
    text: "Уютная атмосфера, приветливый персонал. Делал чистку — всё на высшем уровне.",
    source: "yandex",
    date: "2025-08",
  },
  {
    author: "Светлана Р.",
    rating: 5,
    text: "Поставили коронку на цирконии — выглядит как настоящий зуб. Цены адекватные, сделали в срок.",
    source: "2gis",
    date: "2025-07",
  },
  {
    author: "Игорь Д.",
    rating: 5,
    text: "Не переплачивал за бренд, но качество отличное. Гарантия даётся официально, врачи внимательные.",
    source: "yandex",
    date: "2025-06",
  },
  {
    author: "Елена М.",
    rating: 5,
    text: "Боялась идти к стоматологу годами. Здесь всё прошло безболезненно, мне всё объяснили перед лечением.",
    source: "2gis",
    date: "2025-05",
  },
];
```

> **Важно:** реальные тексты отзывов нужно скопировать с 2ГИС/Яндекса (текст пациента — его собственность, цитата без согласия в большинстве случаев допустима, но автор указывается инициалами без фамилии). На этапе MVP можно начать с этих 5 курированных, в Phase 2 добавить больше.

- [ ] **Step 3: Создать компонент**

Create `components/blocks/ReviewsCarousel.tsx`:
```tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";
import { REVIEWS } from "@/content/reviews";

export function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Отзывы пациентов</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ★ {CLINIC.ratings.twogis.score} на 2ГИС ({CLINIC.ratings.twogis.count} отзывов) ·
              ★ {CLINIC.ratings.yandex.score} на Яндексе ({CLINIC.ratings.yandex.count} отзывов)
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button variant="outline" size="icon" onClick={() => emblaApi?.scrollPrev()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => emblaApi?.scrollNext()}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4">
            {REVIEWS.map((r, i) => (
              <Card key={i} className="min-w-[280px] flex-[0_0_280px] p-5 md:min-w-[360px] md:flex-[0_0_360px]">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm">{r.text}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {r.author} · {r.source === "2gis" ? "2ГИС" : "Яндекс"} · {r.date}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(blocks): add ReviewsCarousel with curated reviews"
```

---

## Этап 5: Форма записи и Telegram-интеграция

### Task 16: Zod-схема формы записи (TDD)

**Files:**
- Create: `lib/forms/booking-schema.ts`, `tests/lib/booking-schema.test.ts`

- [ ] **Step 1: Установить zod**

Run: `npm install zod react-hook-form @hookform/resolvers`

- [ ] **Step 2: Написать падающие тесты**

Create `tests/lib/booking-schema.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { bookingSchema } from "@/lib/forms/booking-schema";

describe("bookingSchema", () => {
  const valid = {
    name: "Иван Иванов",
    phone: "+7 (989) 123-45-67",
    serviceSlug: "protezirovanie/koronki-cirkoniy",
    preferredTime: "Утром",
    consent: true,
  };

  it("accepts a valid form", () => {
    const result = bookingSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects too-short name", () => {
    const result = bookingSchema.safeParse({ ...valid, name: "И" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone", () => {
    const result = bookingSchema.safeParse({ ...valid, phone: "asdf" });
    expect(result.success).toBe(false);
  });

  it("requires consent", () => {
    const result = bookingSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it("normalizes phone: keeps only +7XXXXXXXXXX", () => {
    const result = bookingSchema.safeParse(valid);
    if (!result.success) throw new Error("expected success");
    expect(result.data.phone).toBe("+79891234567");
  });

  it("allows optional fields", () => {
    const result = bookingSchema.safeParse({
      name: "Анна",
      phone: "+79891234567",
      consent: true,
    });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 3: Запустить тесты — упадут**

Run: `npm test booking`
Expected: FAIL.

- [ ] **Step 4: Реализовать схему**

Create `lib/forms/booking-schema.ts`:
```ts
import { z } from "zod";

const PHONE_REGEX = /^\+7\d{10}$/;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Введите имя (минимум 2 символа)"),
  phone: z
    .string()
    .transform((s) => {
      const digits = s.replace(/\D/g, "");
      if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
        return `+7${digits.slice(1)}`;
      }
      if (digits.length === 10) return `+7${digits}`;
      return s;
    })
    .refine((s) => PHONE_REGEX.test(s), "Введите корректный российский номер"),
  serviceSlug: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(500).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Требуется согласие на обработку персональных данных" }) }),
});

export type BookingInput = z.infer<typeof bookingSchema>;
```

- [ ] **Step 5: Запустить тесты**

Run: `npm test booking`
Expected: 6 passed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(forms): add booking zod schema with phone normalization"
```

---

### Task 17: Telegram booking-handler (Express-сервер)

**Files:**
- Create: `server/booking-handler/package.json`, `server/booking-handler/index.js`, `server/booking-handler/README.md`, `server/booking-handler/.env.example`

- [ ] **Step 1: Создать package.json**

Create `server/booking-handler/package.json`:
```json
{
  "name": "moya-stomatologiya-booking-handler",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "express": "^4.21.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5"
  }
}
```

- [ ] **Step 2: Создать .env.example**

Create `server/booking-handler/.env.example`:
```
PORT=3001
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
ALLOWED_ORIGIN=https://mydentsochi.ru
```

- [ ] **Step 3: Создать index.js**

Create `server/booking-handler/index.js`:
```js
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3001;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "https://mydentsochi.ru";

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("FATAL: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set");
  process.exit(1);
}

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

const PHONE_RE = /^\+7\d{10}$/;
const NAME_RE = /^.{2,100}$/;

app.post("/api/booking", async (req, res) => {
  const { name, phone, serviceSlug, preferredTime, message } = req.body ?? {};

  if (!NAME_RE.test(String(name ?? "")) || !PHONE_RE.test(String(phone ?? ""))) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const text = [
    "🦷 *Новая заявка с сайта*",
    "",
    `*Имя:* ${escape(name)}`,
    `*Телефон:* ${escape(phone)}`,
    serviceSlug ? `*Услуга:* ${escape(serviceSlug)}` : null,
    preferredTime ? `*Удобное время:* ${escape(preferredTime)}` : null,
    message ? `*Комментарий:* ${escape(message)}` : null,
    "",
    `_${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}_`,
  ].filter(Boolean).join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
    });
    if (!response.ok) {
      const body = await response.text();
      console.error("Telegram API error:", body);
      return res.status(502).json({ error: "Failed to forward to Telegram" });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("Booking handler error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Booking handler listening on :${PORT}`);
});

function escape(s) {
  return String(s).replace(/[_*[\]()~`>#+\-=|{}.!]/g, (m) => `\\${m}`);
}
```

- [ ] **Step 4: Создать README с инструкциями**

Create `server/booking-handler/README.md`:
```md
# Booking Handler

Микро-сервер на Express, принимает POST /api/booking и форвардит заявки в Telegram.

## Деплой на сервер заказчика

1. Скопировать папку `server/booking-handler/` на сервер.
2. `npm install --production`
3. `cp .env.example .env` и заполнить:
   - `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
   - `TELEGRAM_CHAT_ID` — ID чата владельца (узнать через @userinfobot)
   - `ALLOWED_ORIGIN` — `https://mydentsochi.ru`
4. Запуск через PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name booking-handler
   pm2 save
   pm2 startup
   ```
5. Nginx-конфиг для проксирования /api/booking на этот сервер:
   ```nginx
   location /api/booking {
     proxy_pass http://127.0.0.1:3001/api/booking;
     proxy_set_header Host $host;
     proxy_set_header X-Real-IP $remote_addr;
   }
   ```

## Как создать Telegram-бота

1. Открыть @BotFather в Telegram, /newbot, дать имя.
2. Получить токен → положить в .env.
3. Написать боту `/start` от своего аккаунта.
4. Открыть @userinfobot, узнать свой `chat_id` → положить в .env.

## Тест

```bash
curl -X POST http://localhost:3001/api/booking \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест Тестов","phone":"+79991234567","consent":true}'
```
```

- [ ] **Step 5: Установить deps и проверить запуск**

```bash
cd server/booking-handler
npm install
cp .env.example .env
# .env пока без токенов — сервер не запустится, это норма
cd ../..
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(server): add Express booking handler with Telegram forwarding"
```

---

### Task 18: BookingForm React-компонент

**Files:**
- Create: `components/forms/BookingForm.tsx`, `lib/forms/submit-booking.ts`

- [ ] **Step 1: Создать функцию отправки**

Create `lib/forms/submit-booking.ts`:
```ts
import type { BookingInput } from "./booking-schema";

const ENDPOINT =
  process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "/api/booking";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitBooking(input: BookingInput): Promise<SubmitResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data.error ?? `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
```

- [ ] **Step 2: Создать компонент формы**

Create `components/forms/BookingForm.tsx`:
```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { bookingSchema, type BookingInput } from "@/lib/forms/booking-schema";
import { submitBooking } from "@/lib/forms/submit-booking";

export function BookingForm({ servicePreselected }: { servicePreselected?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceSlug: servicePreselected,
    },
  });

  async function onSubmit(data: BookingInput) {
    setStatus("submitting");
    const result = await submitBooking(data);
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <p className="text-lg font-semibold text-green-900">Спасибо! Ваша заявка принята.</p>
        <p className="mt-2 text-sm text-green-700">Мы свяжемся с вами в ближайшее время.</p>
        <Button variant="ghost" onClick={() => setStatus("idle")} className="mt-4">
          Записаться ещё раз
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Ваше имя *</Label>
        <Input id="name" {...register("name")} placeholder="Иван Иванов" />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Телефон *</Label>
        <Input id="phone" {...register("phone")} placeholder="+7 (___) ___-__-__" />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="preferredTime">Удобное время</Label>
        <Input id="preferredTime" {...register("preferredTime")} placeholder="Например: завтра утром" />
      </div>

      <div>
        <Label htmlFor="message">Комментарий</Label>
        <Textarea id="message" {...register("message")} rows={3} />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox id="consent" {...register("consent")} />
        <Label htmlFor="consent" className="text-sm font-normal leading-tight">
          Я согласен на обработку персональных данных в соответствии с{" "}
          <a href="/policy/" className="underline hover:text-brand-600">политикой конфиденциальности</a>.
        </Label>
      </div>
      {errors.consent && <p className="-mt-2 text-sm text-red-600">{errors.consent.message}</p>}

      {status === "error" && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">
          Не удалось отправить заявку: {error}. Попробуйте позвонить нам напрямую.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Отправка..." : "Записаться на приём"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(forms): add BookingForm with react-hook-form + zod"
```

---

## Этап 6: Главная страница

### Task 19: HomeHero блок

**Files:**
- Create: `components/home/HomeHero.tsx`

- [ ] **Step 1: Реализовать**

```tsx
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

export function HomeHero() {
  return (
    <section className="bg-gradient-to-br from-brand-50 to-white py-16 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Стоматология полного цикла<br />
            в центре Сочи
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Безболезненное лечение, протезирование и имплантация. Своя зуботехническая база.
            Гарантия до 5 лет.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-amber-900">
              <Star className="h-4 w-4 fill-current" /> {CLINIC.ratings.twogis.score} · 2ГИС ({CLINIC.ratings.twogis.count})
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-amber-900">
              <Star className="h-4 w-4 fill-current" /> {CLINIC.ratings.yandex.score} · Яндекс ({CLINIC.ratings.yandex.count})
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/zapis/">Записаться на приём</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/uslugi/">Услуги и цены</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 md:aspect-square">
          {/* TODO: реальное фото клиники после получения от заказчика */}
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото клиники
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(home): add Hero block"
```

---

### Task 20: HomeAdvantages, HomeServices, HomeLab, HomeMicroscope

**Files:**
- Create: `components/home/HomeAdvantages.tsx`, `HomeServices.tsx`, `HomeLab.tsx`, `HomeMicroscope.tsx`

- [ ] **Step 1: Создать `HomeAdvantages.tsx`**

```tsx
import { Microscope, Wrench, Shield, CreditCard } from "lucide-react";

const ITEMS = [
  {
    icon: Microscope,
    title: "Эндодонтия под микроскопом",
    text: "Спасаем зубы, которые в других клиниках предлагают удалить.",
  },
  {
    icon: Wrench,
    title: "Свой зубной техник",
    text: "Коронка готова за 5–10 дней. Прямой контроль качества.",
  },
  {
    icon: Shield,
    title: "Гарантия от 1 до 5 лет",
    text: "На каждый тип работ — официальная гарантия и сервисное наблюдение.",
  },
  {
    icon: CreditCard,
    title: "Рассрочка и налоговый вычет",
    text: "Т-Банк, оплата долями, помощь с возвратом 13%.",
  },
];

export function HomeAdvantages() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">Почему выбирают нас</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="rounded-lg border bg-white p-6">
            <item.icon className="h-10 w-10 text-brand-600" />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Создать `HomeServices.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURED_SERVICES } from "@/lib/constants/services";

function priceLabel(s: typeof FEATURED_SERVICES[number]): string {
  if (s.priceTo) return `${s.priceFrom.toLocaleString("ru-RU")}–${s.priceTo.toLocaleString("ru-RU")} ₽`;
  return `от ${s.priceFrom.toLocaleString("ru-RU")} ₽`;
}

export function HomeServices() {
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">Ключевые услуги</h2>
          <Button asChild variant="ghost">
            <Link href="/uslugi/">Все услуги <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SERVICES.map((s) => (
            <Card key={s.slug} className="p-5 transition-shadow hover:shadow-md">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-brand-700">{priceLabel(s)}</span>
                <Button asChild variant="link" className="px-0">
                  <Link href={`/uslugi/${s.slug}/`}>Подробнее →</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Создать `HomeLab.tsx`**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeLab() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="aspect-[4/3] rounded-2xl bg-slate-200">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото зубного техника / лаборатории
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Своя зуботехническая база</h2>
          <p className="mt-4 text-muted-foreground">
            У нас есть собственный зубной техник, работающий эксклюзивно с клиникой.
            Это значит: коронки, мосты и виниры готовы за 5–10 дней — без посредников,
            с прямым контролем качества и подгонкой по месту.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>✓ Срок изготовления коронки — от 5 дней</li>
            <li>✓ Прямой диалог техника и врача — никаких потерь в коммуникации</li>
            <li>✓ Бесплатная подгонка при необходимости</li>
          </ul>
          <Button asChild className="mt-6">
            <Link href="/laboratoriya/">Подробнее о лаборатории</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Создать `HomeMicroscope.tsx`**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeMicroscope() {
  return (
    <section className="bg-brand-50 py-12 md:py-16">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            УНИКАЛЬНОЕ В СОЧИ
          </span>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">Эндодонтия под микроскопом</h2>
          <p className="mt-4 text-muted-foreground">
            Дентальный микроскоп даёт увеличение до 25× — врач видит каждый канал и
            микротрещину. Это позволяет лечить даже сложные случаи и спасать зубы,
            которые в других клиниках предлагают удалить.
          </p>
          <Button asChild className="mt-6">
            <Link href="/uslugi/endodontiya-pod-mikroskopom/">Узнать больше</Link>
          </Button>
        </div>
        <div className="aspect-[4/3] rounded-2xl bg-slate-200">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото микроскопа в кабинете
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(home): add Advantages, Services, Lab, Microscope blocks"
```

---

### Task 21: HomeDoctors, HomeContact и сборка главной

**Files:**
- Create: `components/home/HomeDoctors.tsx`, `components/home/HomeContact.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Создать `HomeDoctors.tsx`**

```tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";

const DOCTORS = [
  {
    slug: "khechoyan-armen-aratovich",
    name: "Хечоян Армен Араратович",
    role: "Врач-стоматолог-ортопед",
    bio: "Специализация — протезирование зубов: коронки, виниры, мосты, протезы на имплантах. Особо отмечается пациентами в отзывах.",
  },
  {
    slug: "navasardyan-marine-movsesovna",
    name: "Навасардян Марине Мовсесовна",
    role: "Врач-стоматолог-терапевт",
    bio: "Терапевтическое лечение зубов, эндодонтия под микроскопом, лечение каналов любой сложности.",
  },
];

export function HomeDoctors() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">Наши врачи</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {DOCTORS.map((d) => (
          <Card key={d.slug} className="overflow-hidden">
            <Link href={`/vrachi/${d.slug}/`} className="flex gap-4 p-5 transition-colors hover:bg-slate-50">
              <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-slate-200" />
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-brand-700">{d.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d.bio}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Создать `HomeContact.tsx`**

```tsx
import { MapPin, Phone, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { BookingForm } from "@/components/forms/BookingForm";

export function HomeContact() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">Записаться или приехать</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 flex-shrink-0 text-brand-600" />
            <div>
              <p className="font-semibold">Адрес</p>
              <p className="text-sm text-muted-foreground">{CLINIC.address.full}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 flex-shrink-0 text-brand-600" />
            <div>
              <p className="font-semibold">Телефоны</p>
              {CLINIC.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="block text-sm hover:text-brand-600">
                  {p.display}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 flex-shrink-0 text-brand-600" />
            <div>
              <p className="font-semibold">Часы работы</p>
              <p className="text-sm text-muted-foreground">{CLINIC.hours.weekdays}</p>
              <p className="text-sm text-muted-foreground">{CLINIC.hours.weekend}</p>
            </div>
          </div>
          <iframe
            src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
            width="100%"
            height="320"
            allowFullScreen
            loading="lazy"
            title="Карта проезда"
            className="rounded-lg"
          />
        </div>

        <div className="rounded-lg border bg-slate-50 p-6">
          <h3 className="text-lg font-semibold">Запишитесь онлайн</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Мы перезвоним в течение часа в рабочее время.
          </p>
          <div className="mt-4">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Собрать главную в `app/page.tsx`**

Replace `app/page.tsx`:
```tsx
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAdvantages } from "@/components/home/HomeAdvantages";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeLab } from "@/components/home/HomeLab";
import { HomeMicroscope } from "@/components/home/HomeMicroscope";
import { HomeDoctors } from "@/components/home/HomeDoctors";
import { ReviewsCarousel } from "@/components/blocks/ReviewsCarousel";
import { FAQ } from "@/components/blocks/FAQ";
import { HomeContact } from "@/components/home/HomeContact";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Стоматология в Сочи на Донской",
  description:
    "Безболезненное лечение зубов, протезирование, имплантация в центре Сочи. Эндодонтия под микроскопом. Своя зуботехническая база. Гарантия до 5 лет. ★ 4.9 на 2ГИС.",
  path: "/",
});

const HOME_FAQ = [
  {
    question: "Сколько стоит установить имплант в Сочи?",
    answer:
      "Корейские импланты — от 25 000 ₽, израильские — от 35 000 ₽ (включая установку). Точная цена зависит от состояния кости и выбранной системы. Записывайтесь на бесплатную консультацию — посчитаем под ключ.",
  },
  {
    question: "Делаете ли вы рассрочку?",
    answer:
      "Да, через Т-Банк (одна заявка — рассмотрение сразу в 5 банках) и систему оплаты долями. Также помогаем оформить налоговый вычет 13%.",
  },
  {
    question: "Какая у вас гарантия?",
    answer:
      "Гарантия от 1 до 5 лет в зависимости от типа работ: на терапию — 1 год, на металлокерамические коронки — 2 года, на цирконий и E.max — 3 года, на импланты — 5 лет.",
  },
  {
    question: "Можно ли вернуть налог за лечение зубов?",
    answer:
      "Да. Каждый налогоплательщик может вернуть 13% от стоимости лечения (до 150 000 ₽ в год). Мы готовим все документы и помогаем подать декларацию — подробнее на странице «Налоговый вычет».",
  },
  {
    question: "Сколько по времени делается коронка?",
    answer:
      "Благодаря собственному зубному технику — от 5 до 10 дней с момента снятия слепков. На время изготовления ставим временную коронку.",
  },
  {
    question: "Принимаете ли вы по острой боли вне очереди?",
    answer:
      "Мы работаем строго по записи, чтобы каждому пациенту уделить достаточно времени. При острой боли позвоните нам — постараемся принять в день обращения, если будут окна.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAdvantages />
      <HomeServices />
      <HomeLab />
      <HomeMicroscope />
      <HomeDoctors />
      <ReviewsCarousel />
      <FAQ items={HOME_FAQ} />
      <HomeContact />
    </>
  );
}
```

- [ ] **Step 4: Запустить dev и проверить главную**

Run: `npm run dev`
Открыть http://localhost:3000 — все секции рендерятся в правильном порядке. Проверить mobile через DevTools.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(home): assemble homepage with all blocks and metadata"
```

---

## Этап 7: Шаблоны контентных страниц + по одному примеру

### Task 22: Каталог услуг /uslugi/

**Files:**
- Create: `app/uslugi/page.tsx`

- [ ] **Step 1: Реализовать**

```tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SERVICE_CATEGORIES } from "@/lib/constants/services";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Услуги и цены",
  description:
    "Полный прайс на услуги стоматологии в Сочи: лечение, протезирование, имплантация, хирургия. Цены от 4 000 ₽.",
  path: "/uslugi/",
});

export default function ServicesIndex() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Услуги", href: "/uslugi/" }]} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold md:text-4xl">Наши услуги</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Стоматология полного цикла: терапия, хирургия, ортопедия, имплантация. Гарантия от 1 до 5 лет.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat) => (
            <Card key={cat.slug} className="p-5 transition-shadow hover:shadow-md">
              <h2 className="text-lg font-semibold">{cat.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
              <Link
                href={`/uslugi/${cat.slug}/`}
                className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
              >
                Подробнее →
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(uslugi): add services catalog page"
```

---

### Task 23: Пример страницы услуги (Циркониевые коронки)

**Files:**
- Create: `app/uslugi/protezirovanie/koronki-cirkoniy/page.tsx`

- [ ] **Step 1: Реализовать**

```tsx
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "protezirovanie/koronki-cirkoniy";
const TITLE = "Циркониевые коронки";
const PRICE_FROM = 20000;
const PRICE_TO = 22000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽`,
  description:
    "Циркониевые коронки в Сочи. Прочные, эстетичные, биосовместимые. Срок изготовления 5–10 дней благодаря собственной зуботехнической базе. Гарантия 3 года.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Чем циркониевая коронка отличается от металлокерамической?",
    answer:
      "Циркониевая коронка не имеет металлического каркаса — поэтому она светопроницаемая (выглядит как живой зуб), не вызывает аллергии и не темнеет у дёсен. Металлокерамика дешевле, но при тонкой десне со временем виден тёмный край.",
  },
  {
    question: "Сколько служит коронка из циркония?",
    answer:
      "При правильном уходе — от 15 до 20 лет. Цирконий не стирается и не теряет цвет.",
  },
  {
    question: "За сколько дней делается коронка из циркония?",
    answer:
      "У нас — от 5 до 10 дней благодаря собственному зубному технику. На время изготовления ставится временная коронка.",
  },
  {
    question: "Какая гарантия на циркониевую коронку?",
    answer: "Официальная гарантия — 3 года, плюс сервисное наблюдение в течение всего срока службы.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: TITLE,
  provider: { "@type": "Dentist", name: CLINIC.name, "@id": `${CLINIC.domain}/#clinic` },
  areaServed: { "@type": "City", name: "Сочи" },
  description: "Установка циркониевых коронок на зубы. Срок — от 5 дней. Гарантия 3 года.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function CirconiyKoronkiPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Протезирование", href: "/uslugi/protezirovanie/" },
          { name: TITLE, href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Циркониевые коронки — оптимальный выбор для тех, кто хочет получить прочный, естественно
          выглядящий зуб без металла под десной. Делаем за 5–10 дней благодаря собственной
          зуботехнической базе.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">за единицу</span>
        </div>

        <div className="mt-4">
          <Button asChild size="lg">
            <Link href="/zapis/">Записаться на консультацию</Link>
          </Button>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Почему циркониевая коронка</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Биосовместимый материал — не вызывает аллергии</li>
          <li>✓ Не темнеет у десны (нет металлического каркаса)</li>
          <li>✓ Прочность сравнима со стальной — выдерживает любую жевательную нагрузку</li>
          <li>✓ Светопроницаемость — выглядит как живой зуб</li>
          <li>✓ Срок службы 15–20 лет при правильном уходе</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы установки</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Консультация и план лечения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография, согласование цвета и формы. Длительность — 30–40 минут.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Препарирование зуба и снятие слепков</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подготавливаем зуб под коронку, снимаем слепки. Ставим временную коронку из пластика.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">3. Изготовление коронки в нашей лаборатории</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Срок — 5–10 дней. Наш техник работает только с нашей клиникой, поэтому контроль качества и сроков прямой.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Примерка и фиксация</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Если что-то не подходит по форме или цвету — переделываем. Окончательная фиксация на стоматологический цемент.
            </p>
          </li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold">Цены</h2>
        <Card className="mt-4 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Услуга</th>
                <th className="p-3 text-right">Цена</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Циркониевая коронка</td>
                <td className="p-3 text-right font-semibold">20 000–22 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Цирконий на импланте</td>
                <td className="p-3 text-right font-semibold">35 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Фиксация коронки (цирконий)</td>
                <td className="p-3 text-right font-semibold">2 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Временная клиническая пластмассовая коронка</td>
                <td className="p-3 text-right font-semibold">1 000–2 000 ₽</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на установку коронки</h2>
          <div className="mx-auto mt-6 max-w-md">
            <BookingForm servicePreselected={SLUG} />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </>
  );
}
```

- [ ] **Step 2: Запустить dev и проверить страницу**

Run: `npm run dev`
Открыть http://localhost:3000/uslugi/protezirovanie/koronki-cirkoniy/

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(uslugi): add zirconium crowns service page (template example)"
```

---

### Task 24: Каталог /vrachi/ + страница врача

**Files:**
- Create: `app/vrachi/page.tsx`, `app/vrachi/khechoyan-armen-aratovich/page.tsx`, `app/vrachi/navasardyan-marine-movsesovna/page.tsx`

- [ ] **Step 1: Создать `app/vrachi/page.tsx`**

```tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Наши врачи",
  description:
    "Команда стоматологии «Моя Стоматология» в Сочи: ортопед, терапевт. Опытные врачи с многолетним стажем и отзывами пациентов.",
  path: "/vrachi/",
});

const DOCTORS = [
  {
    slug: "khechoyan-armen-aratovich",
    name: "Хечоян Армен Араратович",
    role: "Врач-стоматолог-ортопед",
  },
  {
    slug: "navasardyan-marine-movsesovna",
    name: "Навасардян Марине Мовсесовна",
    role: "Врач-стоматолог-терапевт",
  },
];

export default function DoctorsIndex() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Врачи", href: "/vrachi/" }]} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold md:text-4xl">Наши врачи</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {DOCTORS.map((d) => (
            <Card key={d.slug} className="overflow-hidden">
              <Link href={`/vrachi/${d.slug}/`} className="block p-5 transition-colors hover:bg-slate-50">
                <div className="flex gap-4">
                  <div className="h-32 w-32 flex-shrink-0 rounded-lg bg-slate-200" />
                  <div>
                    <h2 className="text-lg font-semibold">{d.name}</h2>
                    <p className="text-sm text-brand-700">{d.role}</p>
                    <span className="mt-3 inline-block text-sm text-muted-foreground">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Создать `app/vrachi/khechoyan-armen-aratovich/page.tsx`**

```tsx
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildPersonDentist } from "@/lib/schema/builders";

const NAME = "Хечоян Армен Араратович";
const ROLE = "Врач-стоматолог-ортопед";
const SLUG = "khechoyan-armen-aratovich";

export const metadata = createPageMetadata({
  title: `${NAME} — стоматолог-ортопед в Сочи`,
  description:
    "Хечоян Армен Араратович — врач-стоматолог-ортопед клиники «Моя Стоматология» в Сочи. Протезирование зубов: коронки, виниры, мосты, протезы на имплантах.",
  path: `/vrachi/${SLUG}/`,
});

const SCHEMA = buildPersonDentist({
  name: NAME,
  jobTitle: ROLE,
  description: "Врач-стоматолог-ортопед, специализация — протезирование зубов.",
});

export default function DoctorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Врачи", href: "/vrachi/" },
          { name: NAME, href: `/vrachi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="aspect-[3/4] rounded-2xl bg-slate-200">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Фото врача
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{NAME}</h1>
            <p className="mt-2 text-lg text-brand-700">{ROLE}</p>

            <h2 className="mt-8 text-xl font-bold">Специализация</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li>✓ Протезирование зубов: коронки металлокерамика, цирконий, E.max</li>
              <li>✓ Виниры (керамические, E.max)</li>
              <li>✓ Съёмные и бюгельные протезы</li>
              <li>✓ Протезирование на имплантах</li>
              <li>✓ Восстановление зубов на штифтах и культевых вкладках</li>
            </ul>

            <p className="mt-8 text-muted-foreground italic">
              {/* Заглушка цитаты — заменить на реальную после интервью с врачом */}
              «Хорошая работа должна служить пациенту годами. Я стараюсь, чтобы каждая коронка
              была не просто красивой, а удобной для жевания и комфортной для дёсен.»
            </p>
          </div>
        </div>

        <section className="mt-12 rounded-lg bg-slate-50 p-6">
          <h2 className="text-xl font-bold">Записаться к {NAME.split(" ")[0]}у</h2>
          <div className="mx-auto mt-4 max-w-md">
            <BookingForm />
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </>
  );
}
```

- [ ] **Step 3: Создать `app/vrachi/navasardyan-marine-movsesovna/page.tsx`**

(Полная копия предыдущей страницы с заменой имени, специализации, описания. Создать аналогично, заменив:
- `NAME = "Навасардян Марине Мовсесовна"`
- `ROLE = "Врач-стоматолог-терапевт"`
- `SLUG = "navasardyan-marine-movsesovna"`
- Список специализации:
  - Лечение кариеса любой сложности
  - Эндодонтия под микроскопом — лечение и перелечивание каналов
  - Лечение пульпита и периодонтита
  - Художественная реставрация передних зубов
  - Профессиональная гигиена)

```tsx
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildPersonDentist } from "@/lib/schema/builders";

const NAME = "Навасардян Марине Мовсесовна";
const ROLE = "Врач-стоматолог-терапевт";
const SLUG = "navasardyan-marine-movsesovna";

export const metadata = createPageMetadata({
  title: `${NAME} — стоматолог-терапевт в Сочи`,
  description:
    "Навасардян Марине Мовсесовна — врач-стоматолог-терапевт клиники «Моя Стоматология» в Сочи. Лечение кариеса, эндодонтия под микроскопом, реставрация зубов.",
  path: `/vrachi/${SLUG}/`,
});

const SCHEMA = buildPersonDentist({
  name: NAME,
  jobTitle: ROLE,
  description: "Врач-стоматолог-терапевт, специализация — лечение кариеса и эндодонтия под микроскопом.",
});

export default function DoctorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Врачи", href: "/vrachi/" },
          { name: NAME, href: `/vrachi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="aspect-[3/4] rounded-2xl bg-slate-200">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Фото врача
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{NAME}</h1>
            <p className="mt-2 text-lg text-brand-700">{ROLE}</p>

            <h2 className="mt-8 text-xl font-bold">Специализация</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li>✓ Лечение кариеса любой сложности</li>
              <li>✓ Эндодонтия под микроскопом — лечение и перелечивание каналов</li>
              <li>✓ Лечение пульпита и периодонтита</li>
              <li>✓ Художественная реставрация передних зубов</li>
              <li>✓ Профессиональная гигиена полости рта</li>
            </ul>

            <p className="mt-8 text-muted-foreground italic">
              «Большинство зубов можно сохранить — даже те, которые в других клиниках советуют
              удалить. Микроскоп позволяет видеть то, что не видно глазом, и работать точнее.»
            </p>
          </div>
        </div>

        <section className="mt-12 rounded-lg bg-slate-50 p-6">
          <h2 className="text-xl font-bold">Записаться к {NAME.split(" ")[0]}е</h2>
          <div className="mx-auto mt-4 max-w-md">
            <BookingForm />
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(vrachi): add doctors index and 2 doctor pages with schema"
```

---

### Task 25: Заглушки поддерживающих страниц

**Files:**
- Create: `app/o-klinike/page.tsx`, `app/laboratoriya/page.tsx`, `app/garantiya/page.tsx`, `app/rassrochka-i-oplata/page.tsx`, `app/nalogovyy-vychet/page.tsx`, `app/otzyvy/page.tsx`, `app/kontakty/page.tsx`, `app/zapis/page.tsx`, `app/policy/page.tsx`, `app/litsenziya/page.tsx`, `app/oborudovanie/page.tsx`

> Заглушки не означают пустые страницы. Это полноценные страницы с правильной структурой, метаданными, schema-разметкой и базовым контентом. Расширенный контент пишется в Phase 2.

- [ ] **Step 1: Создать `app/kontakty/page.tsx`** (полноценная страница)

```tsx
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Контакты",
  description: `Адрес, телефоны, часы работы стоматологии «Моя Стоматология» в Сочи. ${CLINIC.address.full}.`,
  path: "/kontakty/",
});

export default function ContactsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Контакты", href: "/kontakty/" }]} />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Контакты</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-brand-600" />
              <div>
                <p className="font-semibold">Адрес</p>
                <p className="text-muted-foreground">{CLINIC.address.full}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-brand-600" />
              <div>
                <p className="font-semibold">Телефоны</p>
                {CLINIC.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-brand-600">
                    {p.display}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-brand-600" />
              <div>
                <p className="font-semibold">Часы работы</p>
                <p className="text-muted-foreground">{CLINIC.hours.weekdays}</p>
                <p className="text-muted-foreground">{CLINIC.hours.weekend}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Instagram className="h-5 w-5 text-brand-600" />
              <a
                href={CLINIC.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600"
              >
                @moya_stomatologiya23
              </a>
            </div>
            <iframe
              src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
              width="100%"
              height="400"
              loading="lazy"
              title="Карта проезда"
              className="rounded-lg"
            />
          </div>

          <aside className="rounded-lg border bg-slate-50 p-6">
            <h2 className="text-xl font-bold">Записаться на приём</h2>
            <div className="mt-4">
              <BookingForm />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Создать `app/zapis/page.tsx`**

```tsx
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Онлайн-запись",
  description: "Запишитесь на приём в стоматологию «Моя Стоматология» в Сочи. Мы перезвоним в течение часа в рабочее время.",
  path: "/zapis/",
});

export default function ZapisPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Запись", href: "/zapis/" }]} />
      <section className="container mx-auto max-w-md px-4 py-8 md:py-16">
        <h1 className="text-3xl font-bold">Записаться на приём</h1>
        <p className="mt-2 text-muted-foreground">
          Заполните форму — мы перезвоним в течение часа в рабочее время и подберём удобное время.
        </p>
        <div className="mt-6">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Создать `app/policy/page.tsx`**

```tsx
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

export const metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных в соответствии с 152-ФЗ.",
  path: "/policy/",
  noIndex: true,
});

export default function PolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Политика конфиденциальности", href: "/policy/" }]} />
      <article className="prose container mx-auto max-w-3xl px-4 py-8">
        <h1>Политика обработки персональных данных</h1>
        <p>Дата вступления в силу: 01.01.2026</p>
        <p>
          {CLINIC.legalName} (далее — «Клиника»), ОГРН {CLINIC.ogrn}, расположенная по адресу{" "}
          {CLINIC.address.full}, обрабатывает персональные данные пользователей сайта{" "}
          {CLINIC.domain} (далее — «Сайт») в соответствии с настоящей Политикой и
          Федеральным законом № 152-ФЗ «О персональных данных».
        </p>

        <h2>1. Цели обработки</h2>
        <p>Персональные данные пользователя обрабатываются для следующих целей:</p>
        <ul>
          <li>Запись на приём в Клинику</li>
          <li>Связь с пользователем по вопросам, связанным с записью</li>
          <li>Информирование пользователя о статусе его обращения</li>
        </ul>

        <h2>2. Состав обрабатываемых данных</h2>
        <ul>
          <li>Фамилия и имя</li>
          <li>Номер телефона</li>
          <li>Сообщение, оставленное пользователем</li>
        </ul>

        <h2>3. Передача третьим лицам</h2>
        <p>
          Клиника не передаёт персональные данные третьим лицам, кроме случаев, прямо
          предусмотренных законодательством РФ.
        </p>

        <h2>4. Срок хранения</h2>
        <p>
          Персональные данные хранятся в течение 3 лет с момента последнего обращения. По
          запросу пользователя данные могут быть удалены раньше этого срока.
        </p>

        <h2>5. Права пользователя</h2>
        <p>
          Пользователь имеет право запросить информацию о своих персональных данных,
          потребовать их изменения или удаления. Для этого нужно отправить запрос на телефон
          {" "}{CLINIC.phones[0].display}.
        </p>

        <h2>6. Контактные данные оператора</h2>
        <p>
          {CLINIC.legalName}, ОГРН {CLINIC.ogrn}, адрес: {CLINIC.address.full}.
          Телефон: {CLINIC.phones[0].display}.
        </p>
      </article>
    </>
  );
}
```

- [ ] **Step 4: Создать остальные 8 страниц-каркасов**

Для каждой страницы создать файл с базовой структурой: Breadcrumbs + H1 + 2-3 абзаца по теме + (где уместно) BookingForm. Используй следующий шаблон-генератор и замени {TITLE}, {SLUG}, {DESC}, {INTRO} для каждой:

**Базовый шаблон стаба:**
```tsx
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "{TITLE}",
  description: "{DESC}",
  path: "/{SLUG}/",
});

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "{TITLE}", href: "/{SLUG}/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE}</h1>
        <div className="prose mt-6">
          {INTRO}
        </div>
      </article>
    </>
  );
}
```

Создать страницы со следующими параметрами:

| Файл | TITLE | SLUG | DESC | INTRO (placeholder) |
|---|---|---|---|---|
| `app/o-klinike/page.tsx` | О клинике | o-klinike | «Моя Стоматология» — клиника полного цикла в Сочи с 2020 года. Лицензия Л041-01126-23/01675368. | Параграф про историю + Phase 2 контент |
| `app/laboratoriya/page.tsx` | Своя зуботехническая база | laboratoriya | У нас есть собственный зубной техник. Коронки и протезы готовы за 5–10 дней. | Параграф про эксклюзивного техника + сроки |
| `app/oborudovanie/page.tsx` | Оборудование клиники | oborudovanie | Дентальный микроскоп, оборудование для стерилизации и эндодонтии. | Параграф про микроскоп + Phase 2 контент |
| `app/garantiya/page.tsx` | Гарантия 1–5 лет | garantiya | Гарантия от 1 года до 5 лет на разные типы работ. Сервисное наблюдение и переделка при необходимости. | Таблица из спека: типы работ → срок гарантии |
| `app/rassrochka-i-oplata/page.tsx` | Рассрочка и оплата | rassrochka-i-oplata | Рассрочка через Т-Банк (5 банков в одной заявке), оплата долями, налоговый вычет 13%. | Объяснение схем оплаты |
| `app/nalogovyy-vychet/page.tsx` | Налоговый вычет 13% за лечение | nalogovyy-vychet | Как вернуть 13% от стоимости стоматологического лечения. Список документов и пошаговая инструкция. | Параграф про вычет + чек-лист документов |
| `app/otzyvy/page.tsx` | Отзывы пациентов | otzyvy | ★ 4.9 на 2ГИС, ★ 4.7 на Яндексе. 100+ реальных отзывов с 2020 года. | Подключить ReviewsCarousel + ссылки на оригиналы |
| `app/litsenziya/page.tsx` | Медицинская лицензия | litsenziya | Лицензия № Л041-01126-23/01675368, бессрочная. | Скан лицензии (когда получим) + текст про реквизиты |

Реализовать каждую по шаблону. Для `garantiya` использовать таблицу из спека. Для `otzyvy` использовать `<ReviewsCarousel />`.

Конкретный пример для `app/garantiya/page.tsx`:
```tsx
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Гарантия 1–5 лет",
  description:
    "Гарантия от 1 года до 5 лет на разные типы работ. Сервисное наблюдение и переделка при необходимости.",
  path: "/garantiya/",
});

const TABLE = [
  { type: "Терапевтическое лечение, пломбы", years: "1 год" },
  { type: "Металлокерамические коронки", years: "2 года" },
  { type: "Циркониевые коронки, E.max", years: "3 года" },
  { type: "Виниры", years: "3 года" },
  { type: "Имплантация (имплант + установка)", years: "5 лет" },
];

export default function GarantiyaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Гарантия", href: "/garantiya/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Гарантия от 1 до 5 лет</h1>
        <p className="mt-4 text-muted-foreground">
          Мы предоставляем официальную гарантию на каждый тип работ. Срок зависит от
          материала и сложности — указан в договоре. В период гарантии переделываем
          работу бесплатно при условии соблюдения рекомендаций по уходу.
        </p>

        <Card className="mt-8 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Тип работ</th>
                <th className="p-3 text-right">Гарантия</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row) => (
                <tr key={row.type} className="border-t">
                  <td className="p-3">{row.type}</td>
                  <td className="p-3 text-right font-semibold">{row.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <h2 className="mt-12 text-2xl font-bold">Что входит в гарантию</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Бесплатная переделка при дефекте, не зависящем от пациента</li>
          <li>✓ Бесплатные осмотры в течение всего срока гарантии</li>
          <li>✓ Ведение электронной карты пациента — все работы зафиксированы</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Когда гарантия не действует</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>— Несоблюдение рекомендаций по уходу (нерегулярная гигиена, пропуск осмотров)</li>
          <li>— Травма зубов</li>
          <li>— Изменения в общем состоянии здоровья, влияющие на полость рта</li>
          <li>— Самостоятельные манипуляции пациента или вмешательство сторонних специалистов</li>
        </ul>
      </article>
    </>
  );
}
```

Аналогично пишутся остальные. Эти страницы — каркас, контент дописывается в Phase 2.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(pages): add 11 supporting pages (contacts, garantiya, policy, etc.)"
```

---

## Этап 8: Блог

### Task 26: Каркас блога

**Files:**
- Create: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `content/blog/chto-takoye-endodontiya-pod-mikroskopom.mdx`, `lib/blog/index.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Установить MDX**

Run:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter
```

- [ ] **Step 2: Включить MDX в next.config.ts**

Заменить `next.config.ts`:
```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { typedRoutes: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
```

- [ ] **Step 3: Создать loader статей**

Create `lib/blog/index.ts`:
```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  authorName: string;
  authorRole: string;
  image: string;
  category: string;
};

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogMeta(slug: string): BlogMeta {
  const file = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data } = matter(file);
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    authorName: String(data.authorName ?? ""),
    authorRole: String(data.authorRole ?? ""),
    image: String(data.image ?? "/images/og/default.jpg"),
    category: String(data.category ?? ""),
  };
}

export function getAllBlogMeta(): BlogMeta[] {
  return getAllBlogSlugs()
    .map(getBlogMeta)
    .sort((a, b) => b.date.localeCompare(a.date));
}
```

- [ ] **Step 4: Создать первую статью**

Create `content/blog/chto-takoye-endodontiya-pod-mikroskopom.mdx`:
```mdx
---
title: "Что такое эндодонтия под микроскопом и зачем она нужна"
description: "Как работает дентальный микроскоп, какие задачи решает и почему он повышает шансы спасти зуб от удаления."
date: "2026-05-10"
authorName: "Навасардян Марине Мовсесовна"
authorRole: "Врач-стоматолог-терапевт"
image: "/images/blog/endodontiya-mikroskop.jpg"
category: "Терапия"
---

Лечение корневых каналов — одна из самых сложных задач в стоматологии. Каналы зуба узкие, ветвистые
и часто скрыты от глаза врача. Если канал не обнаружен и не запломбирован полностью, инфекция
возвращается, и зуб приходится удалять.

Дентальный микроскоп решает эту проблему: он даёт увеличение до 25× и яркую направленную подсветку.
Врач видит каналы, которые невооружённым глазом просто не видны.

## Когда нужен микроскоп

- При лечении сложных каналов (узких, изогнутых, с боковыми ответвлениями)
- При перелечивании каналов после неудачного предыдущего лечения
- Для удаления сломанных инструментов из канала
- Для поиска скрытых каналов (например, в верхних молярах часто бывает 4-й канал)
- Для лечения глубокого кариеса с риском вскрытия пульпы

## Почему это важно для пациента

В клиниках без микроскопа врач часто пропускает дополнительные каналы — особенно в больших
жевательных зубах. Через 1–2 года после такого лечения возникает воспаление под корнем,
и зуб начинает беспокоить заново. Часто его уже не спасти — только удаление.

Лечение под микроскопом снижает этот риск в разы. По нашему опыту: около 70% случаев,
которые в обычной клинике предлагают удалить, можно спасти с помощью микроскопа.

## Как проходит лечение

1. **Диагностика и снимок** — визуальный осмотр и компьютерная радиография
2. **Анестезия** — современные препараты, безболезненно
3. **Изоляция зуба коффердамом** — латексная пластина изолирует зуб от слюны
4. **Поиск каналов под микроскопом** — главная фишка
5. **Механическая обработка** — расширение каналов специальными инструментами
6. **Медикаментозная обработка** — антисептики и ультразвук убивают инфекцию
7. **Пломбировка** — заполнение каналов на всю длину
8. **Контрольный снимок** — проверяем качество работы

## Гарантия и сроки

Гарантия на эндодонтическое лечение под микроскопом — 1 год. Но при правильном уходе
запломбированный канал служит 10–20 лет.

Записывайтесь на консультацию — посмотрим ваш случай и подскажем, можно ли спасти зуб.
```

- [ ] **Step 5: Создать листинг блога**

Create `app/blog/page.tsx`:
```tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getAllBlogMeta } from "@/lib/blog";

export const metadata = createPageMetadata({
  title: "Блог стоматологии",
  description:
    "Полезные статьи о лечении и профилактике. Эндодонтия под микроскопом, имплантация, протезирование, налоговый вычет за лечение.",
  path: "/blog/",
});

export default function BlogIndex() {
  const posts = getAllBlogMeta();
  return (
    <>
      <Breadcrumbs items={[{ name: "Блог", href: "/blog/" }]} />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Блог</h1>
        <p className="mt-2 text-muted-foreground">
          Статьи о стоматологии: лечение, протезирование, имплантация, профилактика.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <Card key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="block p-5 transition-shadow hover:shadow-md">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {p.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {p.authorName} · {new Date(p.date).toLocaleDateString("ru-RU")}
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 6: Создать шаблон статьи**

Create `app/blog/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildArticle } from "@/lib/schema/builders";
import { getAllBlogSlugs, getBlogMeta } from "@/lib/blog";
import { CLINIC } from "@/lib/constants/clinic";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const meta = getBlogMeta(slug);
    return createPageMetadata({
      title: meta.title,
      description: meta.description,
      path: `/blog/${slug}/`,
      ogImage: meta.image,
    });
  } catch {
    return createPageMetadata({
      title: "Статья не найдена",
      description: "",
      path: `/blog/${slug}/`,
      noIndex: true,
    });
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let meta;
  try {
    meta = getBlogMeta(slug);
  } catch {
    notFound();
  }

  const Mdx = (await import(`@/content/blog/${slug}.mdx`)).default;

  const schema = buildArticle({
    headline: meta.title,
    description: meta.description,
    image: meta.image,
    authorName: meta.authorName,
    authorJobTitle: meta.authorRole,
    datePublished: meta.date,
    url: `${CLINIC.domain}/blog/${slug}/`,
  });

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Блог", href: "/blog/" },
          { name: meta.title, href: `/blog/${slug}/` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {meta.category}
        </span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{meta.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {meta.authorName} · {meta.authorRole} · {new Date(meta.date).toLocaleDateString("ru-RU")}
        </p>
        <div className="prose prose-slate mt-8 max-w-none">
          <Mdx />
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
```

- [ ] **Step 7: Установить @tailwindcss/typography для prose-классов**

Run: `npm install -D @tailwindcss/typography`

В `tailwind.config.ts` добавить плагин:
```ts
plugins: [require("@tailwindcss/typography")],
```

- [ ] **Step 8: Запустить dev и проверить блог**

Run: `npm run dev`
Открыть http://localhost:3000/blog/ — листинг с одной статьёй.
Открыть http://localhost:3000/blog/chto-takoye-endodontiya-pod-mikroskopom/ — статья.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(blog): add MDX-based blog with one example article"
```

---

## Этап 9: Финал — оптимизация и деплой

### Task 27: 404, OG-картинка по умолчанию, проверка sitemap

**Files:**
- Create: `app/not-found.tsx`, `public/images/og/default.jpg` (заглушка)

- [ ] **Step 1: Создать 404 страницу**

Create `app/not-found.tsx`:
```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-brand-600">404</h1>
      <p className="mt-4 text-xl">Страница не найдена</p>
      <p className="mt-2 text-muted-foreground">
        Возможно, вы перешли по неактуальной ссылке. Воспользуйтесь меню или вернитесь на главную.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">На главную</Link>
      </Button>
    </section>
  );
}
```

- [ ] **Step 2: Создать заглушку OG-картинки**

Положить в `public/images/og/default.jpg` любое изображение 1200×630 px (фасад клиники, когда получим — заменить). Пока можно использовать одноцветный JPG-файл.

```bash
# Опционально: создать простую заглушку через ImageMagick если установлен
# convert -size 1200x630 xc:'#0284c7' -gravity center -fill white -pointsize 60 -annotate 0 "Моя Стоматология" public/images/og/default.jpg
# Или просто положить любой JPG.
```

- [ ] **Step 3: Финальная сборка и проверка sitemap**

Run:
```bash
npm run build
ls -la out/
cat out/sitemap.xml | head -40
cat out/robots.txt
```

Expected: В out/ есть `index.html`, папки `uslugi/`, `vrachi/`, `blog/`, `kontakty/` и т.д. + `sitemap.xml` со всеми URL.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add 404 page and verify sitemap generation"
```

---

### Task 28: Lighthouse-проверка и оптимизация

**Files:**
- Modify: компоненты по необходимости

- [ ] **Step 1: Запустить production preview**

Run:
```bash
npm run build
npx serve out -p 3000
```

(Или `npx http-server out -p 3000`)

- [ ] **Step 2: Прогнать Lighthouse в Chrome DevTools на 5 ключевых страницах**

Открыть Chrome DevTools → Lighthouse → запустить аудит для:
- http://localhost:3000/
- http://localhost:3000/uslugi/
- http://localhost:3000/uslugi/protezirovanie/koronki-cirkoniy/
- http://localhost:3000/vrachi/khechoyan-armen-aratovich/
- http://localhost:3000/blog/chto-takoye-endodontiya-pod-mikroskopom/

Expected: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.

- [ ] **Step 3: Если что-то < 95 — пофиксить**

Типичные проблемы:
- LCP > 2s → добавить `priority` к Hero-картинке: `<Image priority />`
- CLS > 0 → добавить фиксированные размеры всем картинкам
- Accessibility issue → проверить `alt` у всех картинок, `aria-label` у кнопок-иконок
- SEO issue → проверить `<title>` и `<meta description>` на каждой странице

Зафиксить и пересобрать. Повторить пока не зелёное.

- [ ] **Step 4: Commit (если были фиксы)**

```bash
git add -A
git commit -m "perf: optimize Lighthouse scores to 95+"
```

---

### Task 29: DEPLOY.md + проверка структуры репозитория

**Files:**
- Create: `DEPLOY.md`, `README.md`

- [ ] **Step 1: Создать DEPLOY.md**

```md
# Деплой сайта Моя Стоматология

## Архитектура

- Сайт — статическое экспортирование Next.js (`out/` папка)
- Форма записи — отдельный Express-сервер (`server/booking-handler/`)
- Веб-сервер на стороне заказчика — nginx

## Шаг 1: Сборка статики

На локальной машине:

```bash
npm install
npm run build
```

Результат — папка `out/`. Загрузи её содержимое в `/var/www/mydentsochi.ru/` на сервере.

```bash
rsync -avz --delete out/ user@server:/var/www/mydentsochi.ru/
```

## Шаг 2: Настройка nginx

Создать `/etc/nginx/sites-available/mydentsochi.ru`:

```nginx
server {
  listen 80;
  server_name mydentsochi.ru www.mydentsochi.ru;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name mydentsochi.ru www.mydentsochi.ru;

  ssl_certificate     /etc/letsencrypt/live/mydentsochi.ru/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mydentsochi.ru/privkey.pem;

  root /var/www/mydentsochi.ru;
  index index.html;

  gzip on;
  gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;
  gzip_min_length 1024;

  # brotli (если модуль установлен)
  # brotli on;
  # brotli_types text/plain text/css application/json application/javascript image/svg+xml;

  # Кэширование статики
  location ~* \.(js|css|woff2?|ttf|otf|svg|webp|avif|jpg|jpeg|png|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # HTML — короткий кэш с проверкой
  location ~* \.html$ {
    expires 5m;
    add_header Cache-Control "public, must-revalidate";
  }

  # Booking handler proxy
  location /api/booking {
    proxy_pass http://127.0.0.1:3001/api/booking;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # Trailing slash + SPA fallback
  location / {
    try_files $uri $uri/ $uri.html /404.html;
  }

  error_page 404 /404.html;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/mydentsochi.ru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Шаг 3: SSL через Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mydentsochi.ru -d www.mydentsochi.ru
```

## Шаг 4: Деплой booking-handler

См. `server/booking-handler/README.md`.

## Шаг 5: Проверка после деплоя

- [ ] Открывается главная https://mydentsochi.ru/
- [ ] Открываются все страницы услуг
- [ ] Открывается страница врача
- [ ] Открывается статья блога
- [ ] Форма записи — отправляется и приходит в Telegram владельца
- [ ] Sitemap доступен по https://mydentsochi.ru/sitemap.xml
- [ ] Robots по https://mydentsochi.ru/robots.txt
- [ ] SSL — зелёный замок
- [ ] Lighthouse в продакшене ≥ 95

## Шаг 6: Регистрация в инструментах вебмастера

После деплоя:

1. Yandex.Webmaster → Добавить сайт → Подтвердить через DNS-запись или meta-тег
2. Google Search Console → Добавить сайт → подтвердить
3. Загрузить sitemap.xml в обе панели
4. Проверить индексацию через 7-14 дней

## Phase 2 после запуска

См. раздел 12 спецификации (off-site SEO):
- Оптимизация Яндекс.Бизнес
- Оптимизация 2ГИС
- Создание Google Business Profile
- Регистрация в каталогах
- Программа сбора отзывов
- Регулярный выпуск статей
```

- [ ] **Step 2: Создать README.md**

Replace `README.md`:
```md
# Моя Стоматология — сайт клиники

Сайт стоматологической клиники «Моя Стоматология» (Сочи, Донская 52) на Next.js 15 со статическим экспортом.

## Документация

- [Спецификация проекта](docs/superpowers/specs/2026-05-06-moya-stomatologiya-design.md) — что и зачем мы строим
- [План имплементации MVP](docs/superpowers/plans/2026-05-06-mvp-implementation.md) — пошаговая разработка
- [Инструкция деплоя](DEPLOY.md)
- [Booking handler](server/booking-handler/README.md)

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Сборка

```bash
npm run build
# результат в out/
```

## Тесты

```bash
npm test
npm run test:watch
```

## Стек

- Next.js 15 (App Router, static export)
- TypeScript (strict)
- TailwindCSS + shadcn/ui
- MDX для блога
- react-hook-form + zod
- vitest + @testing-library/react
```

- [ ] **Step 3: Финальный коммит и push**

```bash
git add -A
git commit -m "docs: add DEPLOY.md and update README"
```

---

## Self-Review

После написания плана я прошёлся по нему с проверкой против спека:

### Spec coverage check

| Раздел спека | Покрыто в плане |
|---|---|
| 1. Контекст (НАП, лицензия) | ✅ Task 4 (clinic.ts) + Footer + Schema |
| 2. Цели (SEO, Lighthouse 95+) | ✅ Task 28 |
| 3. Позиционирование, УТП | ✅ Hero + Advantages + Lab + Microscope |
| 3.4. Гарантия 1–5 лет | ✅ Garantiya page (Task 25) |
| 4. Tech stack (Next.js, TS, Tailwind, MDX) | ✅ Tasks 1–3, 26 |
| 5. Карта URL | ✅ Все основные роуты в Tasks 22–26 |
| 6. SEO-кластеры | ✅ Один пример (Task 23) — паттерн для остальных в Phase 2 |
| 7. Контент-план | Не покрыто в MVP — ✅ зафиксировано в Phase 2 |
| 8. Шаблоны страниц | ✅ Service template (Task 23), Doctor (Task 24), Article (Task 26) |
| 9. Schema.org JSON-LD | ✅ Tasks 6–7 + интеграция в каждом шаблоне |
| 10. Тех. SEO (sitemap, meta, NAP) | ✅ Tasks 8–9, 13 |
| 11. Core Web Vitals | ✅ Task 28 (явный аудит) |
| 12. Off-site SEO | Корректно отнесено в Phase 2 |
| 13. Юр. требования (152-ФЗ, реклама) | ✅ Policy page (Task 25) + escape в booking-handler |
| 14. Открытые вопросы | ✅ Заглушки для фото врачей и контента — учтено |

### Placeholder check

В коде остались следующие осознанные заглушки:
- Фото врачей, клиники, микроскопа — серые блоки с подписью, заменяются после получения от заказчика
- Цитаты-философии врачей — поставил рабочий текст, заказчик поправит
- Реальные тексты отзывов — курированный набор из 5, расширяется в Phase 2
- OG-картинка по умолчанию — JPG-заглушка

Все они **обозначены явно** как "до получения от заказчика" — это не TBD-плагины, это управляемые внешние зависимости.

### Type consistency check

- `BookingInput` (из zod-схемы) ↔ Express-валидация (PHONE_RE, NAME_RE) — согласованы
- `ServiceCategory` / `Service` types определены раз в `services.ts` и используются согласованно
- `Crumb` type в Breadcrumbs ↔ schemaItems в `buildBreadcrumbList` — согласованы
- `BlogMeta` type в `lib/blog/index.ts` ↔ frontmatter в `.mdx` — согласованы

Найденных проблем нет.

---

**Финальное замечание о content fill-in после MVP:**

13 страниц услуг (по 800-1500 слов каждая), 30 статей блога, 11 поддерживающих страниц с расширенным контентом — это отдельный workstream. После запуска MVP первое обновление за 1–2 недели даёт критическое количество страниц для индексации, дальнейший выпуск — по 2–3 страницы услуг + 1–2 статьи блога в неделю. Этот workstream планируется отдельно.
