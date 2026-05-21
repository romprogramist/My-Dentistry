# Единая система плавности — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить согласованную сдержанную плавность по всему сайту: появление секций при скролле, мягкие модалки/меню, переходы между страницами, hover-микроанимации.

**Architecture:** CSS-переходы и keyframes + один тонкий клиентский компонент `<Reveal>` на `IntersectionObserver`. Без новых зависимостей. Единый набор токенов длительности в `globals.css`, на который ссылаются все анимации. Всё уважает `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `tw-animate-css`, base-ui, vitest + @testing-library (jsdom), Playwright.

**Спецификация:** `docs/superpowers/specs/2026-05-21-site-wide-motion-design.md`

---

## File Structure

| Файл | Ответственность |
|------|-----------------|
| `app/globals.css` | Токены длительности, рефактор `.reveal`, keyframe перехода страниц, утилита `.lift-on-hover` |
| `components/motion/Reveal.tsx` | **Новый.** Клиентская обёртка: скрывает контент, раскрывает при входе в вьюпорт |
| `components/motion/Reveal.test.tsx` | **Новый.** Unit-тесты `Reveal` |
| `app/template.tsx` | **Новый.** Анимация входа при навигации между страницами |
| `app/layout.tsx` | `<noscript>`-фолбэк для `.reveal` |
| `components/ui/dialog.tsx` | Тюнинг длительности/zoom модалки |
| `components/ui/sheet.tsx` | Тюнинг длительности бургер-меню |
| `components/ui/accordion.tsx` | Тюнинг длительности раскрытия |
| `app/page.tsx` | Обёртка секций главной в `<Reveal>` |
| `components/home/HomeServices.tsx`, `HomeDoctors.tsx`, `HomeAdvantages.tsx` | Класс `.lift-on-hover` на карточки |
| `tests/e2e/motion.spec.ts` | **Новый.** E2E: reveal при скролле + reduced-motion |

---

## Task 1: Токены движения и рефактор `.reveal` в globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Добавить токены длительности в `@theme inline`**

Открыть `app/globals.css`. Найти строку `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);` внутри блока `@theme inline { ... }`. Сразу после неё добавить:

```css
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
```

- [ ] **Step 2: Рефактор `.reveal` — убрать авто-анимацию, добавить триггер `.is-revealed`**

Найти в `app/globals.css` блок:

```css
  .reveal {
    opacity: 0;
    transform: translateY(16px);
    animation: revealUp 0.7s var(--ease-out-expo, ease-out) forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
```

Заменить его целиком на:

```css
  .reveal {
    opacity: 0;
    transform: translateY(16px);
  }
  .reveal.is-revealed {
    animation: revealUp var(--duration-slow) var(--ease-out-quart) forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
    }
    .reveal.is-revealed {
      animation: none;
    }
  }
```

Блок `@keyframes revealUp { ... }` ниже — **не трогать**.

- [ ] **Step 3: Проверить, что проект собирается**

Run: `npm run build`
Expected: сборка завершается без ошибок (`✓ Compiled successfully`).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(motion): add duration tokens, make .reveal scroll-triggered"
```

---

## Task 2: Компонент `Reveal` (TDD)

**Files:**
- Create: `components/motion/Reveal.tsx`
- Test: `components/motion/Reveal.test.tsx`

- [ ] **Step 1: Написать падающий тест**

Создать `components/motion/Reveal.test.tsx`:

```tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Reveal } from "./Reveal";

// Управляемый мок IntersectionObserver — jsdom его не реализует.
let observerCallback: IntersectionObserverCallback | null = null;
const observe = vi.fn();
const disconnect = vi.fn();

class MockIO {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe = observe;
  disconnect = disconnect;
  unobserve = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = "";
  thresholds = [];
}

function triggerIntersect(isIntersecting: boolean) {
  act(() => {
    observerCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
}

beforeEach(() => {
  observerCallback = null;
  observe.mockClear();
  disconnect.mockClear();
  vi.stubGlobal("IntersectionObserver", MockIO);
});

describe("Reveal", () => {
  it("рендерит детей", () => {
    render(<Reveal>контент</Reveal>);
    expect(screen.getByText("контент")).toBeInTheDocument();
  });

  it("по умолчанию имеет класс reveal без is-revealed", () => {
    render(<Reveal>контент</Reveal>);
    const el = screen.getByText("контент");
    expect(el).toHaveClass("reveal");
    expect(el).not.toHaveClass("is-revealed");
  });

  it("добавляет is-revealed при входе в вьюпорт", () => {
    render(<Reveal>контент</Reveal>);
    triggerIntersect(true);
    expect(screen.getByText("контент")).toHaveClass("is-revealed");
  });

  it("не реагирует, пока элемент вне вьюпорта", () => {
    render(<Reveal>контент</Reveal>);
    triggerIntersect(false);
    expect(screen.getByText("контент")).not.toHaveClass("is-revealed");
  });

  it("проп delay задаёт animationDelay", () => {
    render(<Reveal delay={160}>контент</Reveal>);
    expect(screen.getByText("контент")).toHaveStyle({ animationDelay: "160ms" });
  });

  it("проп className пробрасывается", () => {
    render(<Reveal className="extra">контент</Reveal>);
    expect(screen.getByText("контент")).toHaveClass("extra");
  });
});
```

- [ ] **Step 2: Запустить тест — убедиться, что падает**

Run: `npm run test -- components/motion/Reveal.test.tsx`
Expected: FAIL — `Failed to resolve import "./Reveal"`.

- [ ] **Step 3: Реализовать компонент**

Создать `components/motion/Reveal.tsx`:

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<"div"> & {
  /** Задержка анимации в мс — для каскада карточек в сетке. */
  delay?: number;
};

export function Reveal({ delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <div
      ref={ref}
      className={cn("reveal", revealed && "is-revealed", className)}
      style={delay ? { ...style, animationDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Запустить тест — убедиться, что проходит**

Run: `npm run test -- components/motion/Reveal.test.tsx`
Expected: PASS — все 6 тестов зелёные.

- [ ] **Step 5: Commit**

```bash
git add components/motion/Reveal.tsx components/motion/Reveal.test.tsx
git commit -m "feat(motion): add Reveal scroll-into-view component"
```

---

## Task 3: Подключить `Reveal` к секциям главной страницы

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Обернуть секции в `<Reveal>`**

Открыть `app/page.tsx`. Добавить импорт после остальных импортов компонентов:

```tsx
import { Reveal } from "@/components/motion/Reveal";
```

Заменить тело `return` функции `HomePage` на:

```tsx
  return (
    <>
      <HomeHero />
      <Reveal><HomeAdvantages /></Reveal>
      <Reveal><HomeServices /></Reveal>
      <Reveal><HomeLab /></Reveal>
      <Reveal><HomeMicroscope /></Reveal>
      <Reveal><HomeDoctors /></Reveal>
      <Reveal><ReviewsCarousel /></Reveal>
      <Reveal><FAQ items={HOME_FAQ} /></Reveal>
      <Reveal><HomeContact /></Reveal>
    </>
  );
```

`HomeHero` не оборачивается — он над сгибом и должен показываться сразу.

- [ ] **Step 2: Проверить визуально**

Run: `npm run dev` (в фоне), открыть `http://localhost:3000`.
Expected: при загрузке видна только Hero-секция; при прокрутке вниз каждая секция плавно появляется снизу с лёгким fade. Без прокрутки секции ниже сгиба скрыты.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(motion): scroll-reveal home page sections"
```

---

## Task 4: Подключить `Reveal` к секциям внутренних страниц

**Files:**
- Modify: каждый файл `app/<route>/page.tsx`, где в разметке есть несколько `<section>` или крупных блоков. Маршруты: `app/uslugi/page.tsx`, `app/vrachi/page.tsx`, `app/o-klinike/page.tsx`, `app/garantiya/page.tsx`, `app/laboratoriya/page.tsx`, `app/oborudovanie/page.tsx`, `app/litsenziya/page.tsx`, `app/nalogovyy-vychet/page.tsx`, `app/rassrochka-i-oplata/page.tsx`, `app/kontakty/page.tsx`, `app/otzyvy/page.tsx`, `app/blog/page.tsx`.

- [ ] **Step 1: Для каждой страницы обернуть секции ниже первого экрана**

Для каждого файла из списка:
1. Прочитать файл.
2. Добавить импорт: `import { Reveal } from "@/components/motion/Reveal";`
3. Каждый крупный блок второго уровня (обычно элементы `<section>` или верхнеуровневые `<div>`-секции внутри корневого фрагмента), **кроме самого первого** (заголовок/hero страницы), обернуть в `<Reveal>...</Reveal>`.
4. Если на странице один сплошной блок контента без секций — обернуть его целиком.

Пример (до):

```tsx
return (
  <>
    <PageHeader title="..." />
    <section className="...">...</section>
    <section className="...">...</section>
  </>
);
```

Пример (после):

```tsx
return (
  <>
    <PageHeader title="..." />
    <Reveal><section className="...">...</section></Reveal>
    <Reveal><section className="...">...</section></Reveal>
  </>
);
```

- [ ] **Step 2: Проверить визуально несколько страниц**

Run: dev-сервер на `http://localhost:3000`, открыть `/uslugi/`, `/vrachi/`, `/o-klinike/`.
Expected: секции плавно появляются при прокрутке; первый экран каждой страницы виден сразу; горизонтального скролла и сломанной раскладки нет.

- [ ] **Step 3: Commit**

```bash
git add app/
git commit -m "feat(motion): scroll-reveal sections on inner pages"
```

---

## Task 5: Тюнинг модалок, бургер-меню и аккордеона

**Files:**
- Modify: `components/ui/dialog.tsx`
- Modify: `components/ui/sheet.tsx`
- Modify: `components/ui/accordion.tsx`

- [ ] **Step 1: Модалка — длительность и деликатный zoom (`dialog.tsx`)**

В `components/ui/dialog.tsx`:

В классе оверлея (содержит `data-open:animate-in data-open:fade-in-0`) заменить `duration-100` на `duration-[var(--duration-base)]`.

В классе контента модалки (содержит `data-open:zoom-in-95`) заменить:
- `duration-100` → `duration-[var(--duration-base)]`
- `data-open:zoom-in-95` → `data-open:zoom-in-[0.98]`
- `data-closed:zoom-out-95` → `data-closed:zoom-out-[0.98]`

- [ ] **Step 2: Бургер-меню — длительность (`sheet.tsx`)**

В `components/ui/sheet.tsx`, в классе `SheetContent` (`SheetPrimitive.Popup`) найти `transition duration-200 ease-in-out` и заменить `duration-200` на `duration-[var(--duration-base)]`.

- [ ] **Step 3: Аккордеон — длительность раскрытия (`accordion.tsx`)**

В `components/ui/accordion.tsx`, в классе `className` элемента `AccordionPrimitive.Panel` (функция `AccordionContent`) найти `data-open:animate-accordion-down data-closed:animate-accordion-up` и дописать в эту же строку классов `duration-[var(--duration-base)]`.

В классе `AccordionTrigger`, где есть `transition-all`, заменить `transition-all` на `transition-all duration-[var(--duration-base)]`.

- [ ] **Step 4: Проверить визуально**

Run: dev-сервер. Открыть страницу с FAQ (главная), раскрыть/свернуть пункт аккордеона; открыть бургер-меню на узком экране; открыть любую модалку (если есть на сайте).
Expected: раскрытие/открытие ощущается мягче и не мгновенно; нет рывков.

- [ ] **Step 5: Commit**

```bash
git add components/ui/dialog.tsx components/ui/sheet.tsx components/ui/accordion.tsx
git commit -m "feat(motion): unify modal, sheet and accordion timing"
```

---

## Task 6: Переходы между страницами

**Files:**
- Modify: `app/globals.css`
- Create: `app/template.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Добавить keyframe и класс перехода в globals.css**

В `app/globals.css`, сразу после блока `@keyframes revealUp { ... }`, добавить:

```css
  .page-transition {
    animation: pageFadeIn var(--duration-slow) var(--ease-out-quart) backwards;
  }
  @keyframes pageFadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .page-transition {
      animation: none;
    }
  }
```

Если `.reveal`-блоки находятся внутри `@layer` — добавлять внутри того же `@layer`, перед его закрывающей `}`.

- [ ] **Step 2: Создать `app/template.tsx`**

`template.tsx` пере-монтируется Next.js при каждой навигации, поэтому анимация входа запускается на каждой странице.

Создать `app/template.tsx`:

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
```

- [ ] **Step 3: Добавить `<noscript>`-фолбэк в `app/layout.tsx`**

Прочитать `app/layout.tsx`. Найти открывающий тег `<body ...>`. Первым дочерним элементом `<body>` вставить:

```tsx
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
```

Это гарантирует: при отключённом JS секции, обёрнутые в `<Reveal>`, остаются видимыми.

- [ ] **Step 4: Проверить визуально**

Run: dev-сервер. Перейти по нескольким ссылкам в навигации.
Expected: при каждом переходе контент страницы плавно появляется (fade + лёгкий подъём ~400мс), а не возникает мгновенно.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/template.tsx app/layout.tsx
git commit -m "feat(motion): add page transition + noscript reveal fallback"
```

---

## Task 7: Hover-микроанимации карточек

**Files:**
- Modify: `app/globals.css`
- Modify: `components/home/HomeServices.tsx`, `components/home/HomeDoctors.tsx`, `components/home/HomeAdvantages.tsx`

- [ ] **Step 1: Добавить утилиту `.lift-on-hover` в globals.css**

В `app/globals.css`, после блока `.page-transition` (из Task 6), добавить:

```css
  .lift-on-hover {
    transition:
      transform var(--duration-fast) var(--ease-out-quart),
      box-shadow var(--duration-fast) var(--ease-out-quart);
  }
  .lift-on-hover:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-elevated);
  }
  @media (prefers-reduced-motion: reduce) {
    .lift-on-hover:hover {
      transform: none;
    }
  }
```

- [ ] **Step 2: Применить класс к карточкам секций**

Для каждого файла `components/home/HomeServices.tsx`, `HomeDoctors.tsx`, `HomeAdvantages.tsx`:
1. Прочитать файл.
2. Найти повторяющийся элемент-карточку (элемент внутри `.map(...)`, обычно `<div>`, `<article>` или `<Link>` с рамкой/тенью).
3. Дописать в его `className` строку `lift-on-hover`.

Если карточка — кликабельная (`<Link>` или `<a>`), класс вешать на сам кликабельный элемент.

- [ ] **Step 3: Проверить визуально**

Run: dev-сервер. Навести курсор на карточки услуг, врачей, преимуществ.
Expected: карточка плавно приподнимается на ~3px и тень становится глубже; при уводе курсора — плавно возвращается.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/home/
git commit -m "feat(motion): add hover lift on section cards"
```

---

## Task 8: E2E-проверка и финальная верификация

**Files:**
- Create: `tests/e2e/motion.spec.ts`

- [ ] **Step 1: Написать e2e-тест плавности**

Создать `tests/e2e/motion.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("секции главной получают is-revealed при прокрутке", async ({ page }) => {
  await page.goto("/");

  const revealed = page.locator(".reveal").first();
  await expect(revealed).toBeAttached();

  // До прокрутки секция ниже сгиба ещё не раскрыта.
  await expect(revealed).not.toHaveClass(/is-revealed/);

  await revealed.scrollIntoViewIfNeeded();
  await expect(revealed).toHaveClass(/is-revealed/, { timeout: 3000 });
});

test("при reduced-motion контент секций виден сразу", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const revealed = page.locator(".reveal").first();
  await revealed.scrollIntoViewIfNeeded();
  // opacity не должен оставаться нулевым.
  await expect(revealed).toHaveCSS("opacity", "1");
});
```

- [ ] **Step 2: Запустить e2e-тест**

Запустить продакшен-сервер на порту, который ждёт Playwright (`playwright.config.ts` → `baseURL: http://localhost:3002`):

Run (в фоне): `npm run build && npx next start -p 3002`
Затем: `npx playwright test tests/e2e/motion.spec.ts`
Expected: оба теста PASS.

- [ ] **Step 3: Прогнать весь набор тестов и сборку**

Run: `npm run test`
Expected: все unit-тесты (vitest) проходят.

Run: `npx playwright test`
Expected: новые тесты `motion.spec.ts` и существующие e2e-тесты проходят.

Run: `npm run build`
Expected: сборка успешна.

Если что-то падает — починить до коммита, не коммитить красное.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/motion.spec.ts
git commit -m "test(motion): e2e for scroll-reveal and reduced-motion"
```

---

## Соответствие спецификации

- Раздел 1 «Токены движения» → Task 1
- Раздел 2 «Появление секций при скролле» → Task 2 (компонент), Task 3 + 4 (подключение)
- Раздел 3 «Тюнинг модалок/меню/аккордеона» → Task 5
- Раздел 4 «Переходы между страницами» → Task 6
- Раздел 5 «Hover-микроанимации» → Task 7
- Раздел 6 «Доступность» → Task 1 (reduced-motion для `.reveal`), Task 6 (`<noscript>`, reduced-motion для перехода), Task 7 (reduced-motion для hover)
- Раздел «Тестирование» → Task 2 (unit), Task 8 (e2e + полная верификация)
