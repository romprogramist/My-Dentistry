# Responsive Adaptation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all 27 pages of "Моя Стоматология" usable and visually correct from 320px to 1536+ viewports, with mobile-first patterns (sticky CTA, header phone icon, ≥44px touch targets, responsive images).

**Architecture:** Two phases. Phase 1 lays foundations once (breakpoint token, touch utility, sticky CTA, header phone, footer grid, MobileNav polish, `<img>`→`<Image>` migration in shared home components). Phase 2 visits each of 27 routes, fixes overflow/wrap/grid/typography per the spec, regenerates Playwright snapshots, commits per page.

**Tech Stack:** Next.js 16.2.4 (App Router, Turbopack), React 19.2, Tailwind v4, shadcn/ui, Vitest + Testing Library, `@playwright/test` (new dev-dep), embla-carousel, `next/image`.

**Spec:** `docs/superpowers/specs/2026-05-11-responsive-adaptation-design.md`

**Project note:** `AGENTS.md` states this is a non-standard Next.js version. Before writing Next.js-specific code (esp. `next/image` migration or `app/layout.tsx` edits), check `node_modules/next/dist/docs/` for current guidance.

**Dev server:** Run `npx next dev -p 3002` from project root and keep it running at `http://localhost:3002` throughout — Playwright `baseURL` points there.

---

## Phase 0 — Tooling

### Task 0.1: Install Playwright and config

**Files:**
- Modify: `package.json` (devDependencies)
- Create: `playwright.config.ts`
- Modify: `.gitignore` (add `test-results/`, `playwright-report/`, `tests/screens/`)

- [ ] **Step 1: Install Playwright**

```bash
cd "C:/Users/Roman/My-Dentistry" && npm install -D @playwright/test && npx playwright install chromium
```

Expected: Adds `@playwright/test` to `devDependencies`; downloads Chromium.

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3002",
    trace: "off",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
```

- [ ] **Step 3: Update `.gitignore`**

Append (only if not already present):

```
test-results/
playwright-report/
tests/screens/
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json playwright.config.ts .gitignore
git commit -m "test: add Playwright for responsive smoke tests"
```

---

### Task 0.2: Write responsive smoke test (baseline FAIL expected)

**Files:**
- Create: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { test, expect } from "@playwright/test";
import path from "node:path";

const ROUTES = [
  "/",
  "/zapis/",
  "/uslugi/",
  "/uslugi/implantaciya/",
  "/uslugi/endodontiya-pod-mikroskopom/",
  "/uslugi/khirurgiya/",
  "/uslugi/lechenie-kariesa/",
  "/uslugi/professionalnaya-gigiena/",
  "/uslugi/lechenie-kanalov/",
  "/uslugi/protezirovanie/",
  "/uslugi/restavraciya-zubov/",
  "/vrachi/",
  "/vrachi/khechoyan-armen-aratovich/",
  "/vrachi/navasardyan-marine-movsesovna/",
  "/o-klinike/",
  "/kontakty/",
  "/garantiya/",
  "/laboratoriya/",
  "/oborudovanie/",
  "/litsenziya/",
  "/nalogovyy-vychet/",
  "/rassrochka-i-oplata/",
  "/blog/",
  "/otzyvy/",
  "/policy/",
  "/not-found",
];

const WIDTHS = [320, 375, 480, 640, 768, 1024, 1280, 1536];

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    test(`no horizontal scroll: ${route} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status(), `${route} status`).toBeLessThan(500);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(overflow.scrollWidth, `${route} @ ${width}: no horizontal scroll`).toBeLessThanOrEqual(
        overflow.clientWidth + 1,
      );

      const safeRoute = route.replace(/\//g, "_") || "_root";
      await page.screenshot({
        path: path.join("tests/screens", `${safeRoute}-${width}.png`),
        fullPage: true,
      });
    });
  }
}
```

- [ ] **Step 2: Run baseline**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test responsive.spec.ts
```

Expected: Many failures at 320–480 widths (this is the baseline — we will fix these in Phase 2). Screenshots populate `tests/screens/`.

- [ ] **Step 3: Commit (no assertions about pass/fail yet)**

```bash
git add tests/e2e/responsive.spec.ts
git commit -m "test: add responsive overflow smoke for 27 routes × 8 widths"
```

---

## Phase 1 — Foundations

### Task 1.1: Add `xs:480` breakpoint token

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add breakpoint inside `@theme inline { ... }`**

Find the existing `@theme inline {` block in `app/globals.css` and add the breakpoint utility for `xs:480` per Tailwind v4 syntax. Add this line near the other token definitions:

```css
  --breakpoint-xs: 30rem;
```

(30rem = 480px at default 16px root font-size.)

- [ ] **Step 2: Verify Tailwind picks it up**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx next build --no-lint 2>&1 | tail -20
```

Expected: Build succeeds. (If it fails on `--no-lint` flag in this Next version, run `npx next build` instead.)

- [ ] **Step 3: Smoke-test the breakpoint**

Open `http://localhost:3002` in browser, open DevTools, switch viewport to 481px width, and run in console:

```js
getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-xs')
```

Expected: `30rem` (non-empty).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: add xs:480 breakpoint for large phones"
```

---

### Task 1.2: Add `.touch-target` utility

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add utility in base layer**

Inside `@layer base { ... }` in `app/globals.css`, after the `html { ... }` rule, append:

```css
  .touch-target {
    @apply inline-flex items-center justify-center min-h-11 min-w-11;
  }
```

- [ ] **Step 2: Verify build**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx next build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: add .touch-target utility for 44px hit areas"
```

---

### Task 1.3: Create `MobileStickyCTA` component (TDD)

**Files:**
- Create: `components/layout/MobileStickyCTA.tsx`
- Create: `components/layout/MobileStickyCTA.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MobileStickyCTA } from "./MobileStickyCTA";

describe("MobileStickyCTA", () => {
  test("renders call and book links", () => {
    render(<MobileStickyCTA />);
    expect(screen.getByRole("link", { name: /позвонить/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /записаться/i })).toBeInTheDocument();
  });

  test("call link uses tel: protocol", () => {
    render(<MobileStickyCTA />);
    const call = screen.getByRole("link", { name: /позвонить/i });
    expect(call.getAttribute("href")).toMatch(/^tel:/);
  });

  test("book link points to /zapis/", () => {
    render(<MobileStickyCTA />);
    const book = screen.getByRole("link", { name: /записаться/i });
    expect(book).toHaveAttribute("href", "/zapis/");
  });

  test("container is hidden on md+ via responsive class", () => {
    const { container } = render(<MobileStickyCTA />);
    expect(container.firstChild).toHaveClass("md:hidden");
  });
});
```

- [ ] **Step 2: Run the test (expect failure)**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run components/layout/MobileStickyCTA.test.tsx
```

Expected: FAIL — `MobileStickyCTA` not defined.

- [ ] **Step 3: Implement minimal component**

```tsx
import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

export function MobileStickyCTA() {
  const primaryPhone = CLINIC.phones[0];
  return (
    <div
      role="region"
      aria-label="Быстрая запись"
      className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t bg-white p-2 shadow-lg md:hidden"
    >
      {primaryPhone ? (
        <a
          href={`tel:${primaryPhone.tel}`}
          aria-label="Позвонить в клинику"
          className={buttonVariants({ variant: "outline", className: "flex-1 min-h-11" })}
        >
          <Phone className="mr-2 h-4 w-4" />
          Позвонить
        </a>
      ) : null}
      <Link
        href="/zapis/"
        aria-label="Записаться на приём"
        className={buttonVariants({ className: "flex-1 min-h-11" })}
      >
        Записаться
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Run the test (expect pass)**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run components/layout/MobileStickyCTA.test.tsx
```

Expected: PASS (4/4).

- [ ] **Step 5: Commit**

```bash
git add components/layout/MobileStickyCTA.tsx components/layout/MobileStickyCTA.test.tsx
git commit -m "feat(layout): add MobileStickyCTA component"
```

---

### Task 1.4: Wire `MobileStickyCTA` into layout + add body padding

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and mount the component**

In `app/layout.tsx`, add import:

```tsx
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
```

And update the body to include padding-bottom for mobile and render the CTA before `<Footer />`:

```tsx
<body className="flex min-h-screen flex-col font-sans antialiased pb-[72px] md:pb-0">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
  <MobileStickyCTA />
  <script ... />
  <script ... />
</body>
```

(Keep the existing JSON-LD script tags as they were.)

- [ ] **Step 2: Visual verify on dev server**

Open `http://localhost:3002` in DevTools at 375px width. Confirm: sticky bar with "Позвонить" + "Записаться" pinned to bottom; no content hidden behind it after full-page scroll.

Then switch to 768px width — bar should disappear (md:hidden).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): wire MobileStickyCTA and reserve body pb on mobile"
```

---

### Task 1.5: Add phone icon to Header `<md`

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Edit Header to insert mobile phone icon**

Replace the existing `<div className="flex items-center gap-3">` block with:

```tsx
<div className="flex items-center gap-2 md:gap-3">
  {primaryPhone ? (
    <>
      <a
        href={`tel:${primaryPhone.tel}`}
        className="hidden items-center gap-2 text-sm font-semibold text-brand-700 md:flex"
      >
        <Phone className="h-4 w-4" />
        {primaryPhone.display}
      </a>
      <a
        href={`tel:${primaryPhone.tel}`}
        aria-label={`Позвонить ${primaryPhone.display}`}
        className="touch-target text-brand-700 md:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
    </>
  ) : null}
  <Link href="/zapis/" className={buttonVariants({ size: "sm" })}>
    Записаться
  </Link>
  <MobileNav nav={NAV} />
</div>
```

- [ ] **Step 2: Visual verify**

Open `http://localhost:3002` in DevTools at 375px. Confirm: phone icon visible, ≥44px tap area; clicking it triggers `tel:`. At 768px+: full number text shows (old behaviour preserved).

- [ ] **Step 3: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat(header): add tel-icon CTA on mobile"
```

---

### Task 1.6: Footer responsive grid 1 → 2 → 4 cols

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Change grid class**

In `components/layout/Footer.tsx`, find:

```tsx
<div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
```

Replace with:

```tsx
<div className="container mx-auto grid gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
```

- [ ] **Step 2: Visual verify**

DevTools at 320/640/1024: should see 1, 2, 4 columns respectively.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "style(footer): responsive 1/2/4 column grid"
```

---

### Task 1.7: MobileNav — phone CTA inside + 44px nav links

**Files:**
- Modify: `components/layout/MobileNav.tsx`

- [ ] **Step 1: Update nav body**

Replace the `<nav>` block with:

```tsx
<nav className="mt-8 flex flex-col gap-1 px-4">
  {nav.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className="touch-target justify-start text-base font-medium hover:text-brand-600"
    >
      {item.label}
    </Link>
  ))}
</nav>
```

Add an import at the top:

```tsx
import { Phone } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
```

And after the closing `</nav>`, before `</SheetContent>`, add a phone CTA block:

```tsx
{CLINIC.phones[0] ? (
  <a
    href={`tel:${CLINIC.phones[0].tel}`}
    className="mx-4 mt-6 touch-target justify-start gap-2 rounded-md border px-3 text-sm font-semibold text-brand-700"
  >
    <Phone className="h-4 w-4" />
    {CLINIC.phones[0].display}
  </a>
) : null}
```

- [ ] **Step 2: Visual verify**

DevTools at 375px. Open the burger. Each nav link min-height 44px, phone CTA visible below nav, all tappable.

- [ ] **Step 3: Commit**

```bash
git add components/layout/MobileNav.tsx
git commit -m "feat(nav): bigger touch targets and tel CTA inside mobile sheet"
```

---

### Task 1.8: Migrate `HomeHero` `<img>` → `<Image>`

**Files:**
- Modify: `components/home/HomeHero.tsx`

- [ ] **Step 1: Add Next.js Image import**

Add at the top:

```tsx
import Image from "next/image";
```

- [ ] **Step 2: Replace the `<img>` block**

Find the `<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 md:aspect-square">` block and replace its inner `<img ... />` with:

```tsx
<Image
  src="/media/clinic/reception-detail.webp"
  alt="Приёмная клиники «Моя Стоматология» — Сочи, Донская 52"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  priority
  className="object-cover"
/>
```

- [ ] **Step 3: Visual verify**

Reload `http://localhost:3002` at 375/768/1280 widths. Image fills its container, no distortion, loads quickly. Check Network tab — different sizes served per viewport.

- [ ] **Step 4: Commit**

```bash
git add components/home/HomeHero.tsx
git commit -m "perf(home): migrate HomeHero img to next/image with sizes"
```

---

### Task 1.9: Migrate `HomeLab` `<img>` → `<Image>`

**Files:**
- Modify: `components/home/HomeLab.tsx`

- [ ] **Step 1: Add Image import + replace tag**

Add at top:

```tsx
import Image from "next/image";
```

Replace the `<div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">` block's inner `<img>` with:

```tsx
<Image
  src="/media/clinic/reception-wide.webp"
  alt="Интерьер клиники «Моя Стоматология»"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  className="object-cover"
/>
```

Add `relative` class to the parent `<div>` so `fill` works:

```tsx
<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
```

- [ ] **Step 2: Visual verify**

Reload `http://localhost:3002`, scroll to the "Своя зуботехническая база" section. Image renders correctly at 375/768/1280.

- [ ] **Step 3: Commit**

```bash
git add components/home/HomeLab.tsx
git commit -m "perf(home): migrate HomeLab img to next/image with sizes"
```

---

### Task 1.10: Re-run Playwright after foundations

**Files:**
- Modify: `tests/screens/` (regenerated)

- [ ] **Step 1: Run smoke suite**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test responsive.spec.ts
```

Note current pass/fail counts. Many small-width failures expected to remain (we haven't fixed pages yet) — but the home page should now have fewer overflow issues thanks to Image migration and Footer grid.

- [ ] **Step 2: Capture status as a note in commit**

```bash
git add tests/screens/
git commit -m "test(snapshots): refresh after Phase 1 foundations"
```

---

## Phase 2 — Per-page Adaptation

> Each task below follows the same flow: read the file → apply spec-defined edits → DevTools eyeball at 320/375/768/1280 → run Playwright for the affected route → commit.

### Task 2.1: Home `/` (app/page.tsx + home components)

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/home/HomeHero.tsx`
- Modify: `components/home/HomeServices.tsx`
- Modify: `components/home/HomeAdvantages.tsx`
- Modify: `components/home/HomeDoctors.tsx`
- Modify: `components/home/HomeMicroscope.tsx`
- Modify: `components/home/HomeLab.tsx`
- Modify: `components/home/HomeContact.tsx`

- [ ] **Step 1: HomeHero — picture above text on `<md`, smaller h1 on 320, button stack**

In `HomeHero.tsx`, change the grid to reverse order on mobile:

```tsx
<div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
  <div className="order-2 md:order-1">
    <h1 className="text-3xl font-bold leading-tight xs:text-4xl md:text-5xl">
      ...
    </h1>
    <p className="mt-4 text-base text-muted-foreground xs:text-lg md:text-xl">...</p>
    ...
    <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
      ...
    </div>
  </div>
  <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 md:order-2 md:aspect-square">
    ...
  </div>
</div>
```

(Keep all other contents; only the class names and order utilities are added.)

- [ ] **Step 2: HomeServices — grid 1→2→3→4**

In `HomeServices.tsx`, find the grid container and ensure it uses:

```tsx
<div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

Make each card `flex flex-col` so heights equalize: `className="flex flex-col gap-3 ..."` on the card root. Adjust icon sizes from `h-8 w-8` to `h-8 w-8 md:h-10 md:w-10` if currently fixed.

- [ ] **Step 3: HomeDoctors — `aspect-[4/5]` photos, grid 1→2→3**

In `HomeDoctors.tsx`, replace the grid class:

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

Each photo wrapper gets `relative aspect-[4/5] overflow-hidden rounded-xl`. If `<img>` is direct, migrate to `<Image fill sizes="(max-width:640px) 100vw, 33vw" />`.

- [ ] **Step 4: HomeAdvantages / HomeMicroscope — 1-col `<md`, 2-col md:**

In each: ensure outer grid is `grid grid-cols-1 gap-8 md:grid-cols-2`. No order swap needed unless visual review shows otherwise.

- [ ] **Step 5: HomeContact — map below content on mobile**

In `HomeContact.tsx`, find the map embed and constrain `<md` height:

```tsx
<div className="relative aspect-[4/3] max-h-[280px] overflow-hidden rounded-xl md:max-h-[420px] md:aspect-auto md:h-full">
  ...
</div>
```

Layout order: contact info above map at `<md`, side-by-side at md+.

- [ ] **Step 6: DevTools eyeball at 320 / 375 / 480 / 768 / 1024 / 1280**

Open `http://localhost:3002/`. For each width:
- No horizontal scroll
- All buttons ≥44px tall
- Image proportions look right
- Text doesn't overlap

- [ ] **Step 7: Run Playwright filtered to home**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test responsive.spec.ts -g "no horizontal scroll: / @"
```

Expected: 8/8 widths pass.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx components/home/
git commit -m "responsive: / (home) 320-1536"
```

---

### Task 2.2: Запись `/zapis/`

**Files:**
- Modify: `app/zapis/page.tsx`
- Modify: `components/forms/BookingForm.tsx`
- Modify: `components/forms/TimeChips.tsx`
- Modify: `components/forms/PhoneInput.tsx`
- Modify: `components/forms/BookingSuccess.tsx`
- Modify: `components/ui/input.tsx`
- Modify: `components/ui/textarea.tsx`

- [ ] **Step 1: Inputs — 16px font-size + 44px min-height**

In `components/ui/input.tsx`, ensure the className includes `text-base min-h-11` (Tailwind text-base = 16px). Same in `components/ui/textarea.tsx` (replace text-sm with text-base on the base class).

- [ ] **Step 2: TimeChips — responsive grid + overflow fallback**

In `components/forms/TimeChips.tsx`, replace the container grid with:

```tsx
<div className="grid grid-cols-3 gap-2 xs:grid-cols-4 md:grid-cols-6">
  ...
</div>
```

Each chip: `className="touch-target rounded-md border px-3 text-sm ..."`.

- [ ] **Step 3: BookingForm — increase spacing on mobile**

In `components/forms/BookingForm.tsx`, ensure form-level spacing uses `space-y-4 md:space-y-6` and field groups don't collapse below 320px width.

- [ ] **Step 4: BookingSuccess — center on 320**

Ensure root has `mx-auto max-w-md px-4 text-center`.

- [ ] **Step 5: DevTools eyeball at 320/375/768**

Open `http://localhost:3002/zapis/`. Fill form. Confirm: no iOS zoom on focus, all chips tappable, send button reachable above sticky CTA (or hide sticky CTA on `/zapis` if it duplicates the in-page action — skip for now, decide on review).

- [ ] **Step 6: Playwright**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /zapis/ @"
```

Expected: 8/8 pass.

- [ ] **Step 7: Commit**

```bash
git add app/zapis/page.tsx components/forms/ components/ui/input.tsx components/ui/textarea.tsx
git commit -m "responsive: /zapis (booking) 320-1536"
```

---

### Task 2.3: Услуги index `/uslugi/`

**Files:**
- Modify: `app/uslugi/page.tsx`

- [ ] **Step 1: Read current implementation, apply grid 1→2→3→4**

Locate the services list grid and ensure:

```tsx
<div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

Filter chips (if present) wrap with `flex flex-wrap gap-2 overflow-x-auto pb-2` and chip elements get `touch-target whitespace-nowrap`.

- [ ] **Step 2: DevTools at 320/640/1024/1280**

No card overflows, filter chips scrollable horizontally if too many.

- [ ] **Step 3: Playwright**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /uslugi/ @"
```

- [ ] **Step 4: Commit**

```bash
git add app/uslugi/page.tsx
git commit -m "responsive: /uslugi (index) 320-1536"
```

---

### Task 2.4–2.11: Услуги подстраницы (8 routes, identical template)

**Files (one per task):**
- 2.4: `app/uslugi/implantaciya/page.tsx`
- 2.5: `app/uslugi/endodontiya-pod-mikroskopom/page.tsx`
- 2.6: `app/uslugi/khirurgiya/page.tsx`
- 2.7: `app/uslugi/lechenie-kariesa/page.tsx`
- 2.8: `app/uslugi/professionalnaya-gigiena/page.tsx`
- 2.9: `app/uslugi/lechenie-kanalov/page.tsx`
- 2.10: `app/uslugi/protezirovanie/page.tsx`
- 2.11: `app/uslugi/restavraciya-zubov/page.tsx`

**For each page, run these steps (substitute `<route>`/`<file>`):**

- [ ] **Step 1: Hero — 1-col `<md`, 2-col md:**

Wrap hero in `<div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">`. If page hero uses `<img>`, migrate to `<Image fill sizes="(max-width:768px) 100vw, 50vw" />` inside a `relative aspect-[4/3]` wrapper.

- [ ] **Step 2: Sidebar CTA — sticky md+, inline `<md`**

If page has a "Записаться" sidebar block:

```tsx
<aside className="md:sticky md:top-20">...</aside>
```

It should render inline within the main content on `<md` (no extra changes needed — sticky only activates at md+).

- [ ] **Step 3: Pricing table — overflow wrap**

Wrap any `<table>` in:

```tsx
<div className="-mx-4 overflow-x-auto px-4">
  <table className="w-full min-w-[480px] ...">
```

- [ ] **Step 4: FAQ accordion**

If the page uses `components/blocks/FAQ.tsx`, no change here — `FAQ.tsx` gets its responsive polish in Task 2.x for shared components (already covered if FAQ already adaptive). Otherwise: ensure trigger button has `touch-target justify-between`.

- [ ] **Step 5: Related block — grid 1→2→3**

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
```

- [ ] **Step 6: DevTools eyeball at 320/375/768/1024**

- [ ] **Step 7: Playwright**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: <route> @"
```

- [ ] **Step 8: Commit**

```bash
git add <file>
git commit -m "responsive: <route> 320-1536"
```

---

### Task 2.12: Врачи index `/vrachi/`

**Files:**
- Modify: `app/vrachi/page.tsx`

- [ ] **Step 1: Doctor grid + aspect-[4/5] photos**

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  ...
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
      <Image src={...} alt={...} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
    </div>
  ...
</div>
```

Card root `<a>`: `touch-target` + `block` for full-card click area.

- [ ] **Step 2: DevTools 320/640/1024**

- [ ] **Step 3: Playwright**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /vrachi/ @"
```

- [ ] **Step 4: Commit**

```bash
git add app/vrachi/page.tsx
git commit -m "responsive: /vrachi (index) 320-1536"
```

---

### Task 2.13–2.14: Vrachi profiles

**Files:**
- 2.13: `app/vrachi/khechoyan-armen-aratovich/page.tsx`
- 2.14: `app/vrachi/navasardyan-marine-movsesovna/page.tsx`

**For each:**

- [ ] **Step 1: Header — photo 1-col `<md`, 2-col md:**

```tsx
<div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] items-start">
  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
    <Image src={...} alt={...} fill sizes="(max-width:768px) 100vw, 33vw" priority className="object-cover" />
  </div>
  <div>...</div>
</div>
```

- [ ] **Step 2: Biography — prose responsive**

Wrap text content in `<div className="prose prose-sm md:prose-base max-w-prose">`.

- [ ] **Step 3: Diplomas grid (if present)**

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
```

- [ ] **Step 4: DevTools + Playwright + commit**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /vrachi/<slug>/ @"
git add app/vrachi/<slug>/page.tsx
git commit -m "responsive: /vrachi/<slug> 320-1536"
```

---

### Task 2.15–2.22: Информационные страницы (8 routes, common pattern)

**Files (one per task):**
- 2.15: `app/o-klinike/page.tsx`
- 2.16: `app/kontakty/page.tsx`
- 2.17: `app/garantiya/page.tsx`
- 2.18: `app/laboratoriya/page.tsx`
- 2.19: `app/oborudovanie/page.tsx`
- 2.20: `app/litsenziya/page.tsx`
- 2.21: `app/nalogovyy-vychet/page.tsx`
- 2.22: `app/rassrochka-i-oplata/page.tsx`

**For each:**

- [ ] **Step 1: Hero block — 1-col `<md`, 2-col md:**

If page has a top hero with image:

```tsx
<section className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
    <Image src={...} alt={...} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
  </div>
  <div>...</div>
</section>
```

If no image, wrap body in `<div className="max-w-prose mx-auto">`.

- [ ] **Step 2: Long prose block**

```tsx
<div className="prose prose-sm md:prose-base max-w-prose mx-auto">
  ...
</div>
```

- [ ] **Step 3: Bottom CTA — full-width `<md`**

If there's a final CTA button, ensure it `inline-flex w-full xs:w-auto`.

- [ ] **Step 4: Embedded documents (Лицензия, Налоговый вычет)**

If there is an `<iframe>` or PDF embed, wrap:

```tsx
<div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
  <iframe ... className="absolute inset-0 h-full w-full" />
</div>
```

- [ ] **Step 5: Contacts page specifics (only for 2.16 `/kontakty/`)**

Map: `<div className="relative aspect-[4/3] max-h-[280px] md:max-h-[480px] overflow-hidden rounded-xl">...</div>`. Contact info block above map on `<md`.

- [ ] **Step 6: DevTools + Playwright + commit**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: <route> @"
git add <file>
git commit -m "responsive: <route> 320-1536"
```

---

### Task 2.23: Блог index `/blog/`

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Grid 1→2→3 + responsive cover images**

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  ...
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
      <Image src={cover} alt={title} fill sizes="(max-width:640px) 100vw, 33vw" loading="lazy" className="object-cover" />
    </div>
  ...
</div>
```

Each card root `<Link>`: `touch-target block`.

- [ ] **Step 2: DevTools + Playwright + commit**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /blog/ @"
git add app/blog/page.tsx
git commit -m "responsive: /blog (index) 320-1536"
```

---

### Task 2.24: Блог пост `/blog/[slug]`

**Files:**
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `mdx-components.tsx`

- [ ] **Step 1: Prose responsive typography**

In `app/blog/[slug]/page.tsx`, wrap MDX content:

```tsx
<article className="prose prose-sm md:prose-base lg:prose-lg max-w-prose mx-auto px-4">
  {children}
</article>
```

- [ ] **Step 2: MDX image and code adapters**

In `mdx-components.tsx`, ensure `<img>` is replaced and `<pre>` overflows:

```tsx
img: (props) => (
  <img {...props} className="my-4 h-auto w-full rounded-md" loading="lazy" />
),
pre: (props) => (
  <pre {...props} className="overflow-x-auto rounded-md p-4 text-sm" />
),
```

- [ ] **Step 3: Pick one existing blog slug for Playwright**

The smoke spec checks routes; if `/blog/[slug]` isn't in `ROUTES`, add an existing slug (e.g., `/blog/<first-post-slug>/`) to `tests/e2e/responsive.spec.ts` `ROUTES`. Find slug via:

```bash
cd "C:/Users/Roman/My-Dentistry" && ls content/blog/
```

Pick first `.mdx` filename without extension, add `"/blog/<slug>/"` to the array.

- [ ] **Step 4: DevTools + Playwright + commit**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /blog/<slug> @"
git add app/blog/[slug]/page.tsx mdx-components.tsx tests/e2e/responsive.spec.ts
git commit -m "responsive: /blog/[slug] 320-1536"
```

---

### Task 2.25: Отзывы `/otzyvy/`

**Files:**
- Modify: `app/otzyvy/page.tsx`
- Modify: `components/blocks/ReviewsCarousel.tsx`

- [ ] **Step 1: Carousel slide widths**

In `ReviewsCarousel.tsx`, embla slides container:

```tsx
<div className="-mx-2 flex">
  {REVIEWS.map((r) => (
    <div key={r.id} className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3">
      ...
    </div>
  ))}
</div>
```

Prev/Next buttons: keep `hidden md:flex` (touch-swipe primary on mobile). Ensure each review card has `min-h-full` so heights match.

- [ ] **Step 2: Page header spacing on 320**

`app/otzyvy/page.tsx`: ensure outer section has `py-8 md:py-12`, headings scale `text-2xl xs:text-3xl md:text-4xl`.

- [ ] **Step 3: DevTools + Playwright + commit**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /otzyvy/ @"
git add app/otzyvy/page.tsx components/blocks/ReviewsCarousel.tsx
git commit -m "responsive: /otzyvy 320-1536"
```

---

### Task 2.26: Policy `/policy/`

**Files:**
- Modify: `app/policy/page.tsx`

- [ ] **Step 1: max-w-prose**

Wrap content:

```tsx
<article className="prose prose-sm md:prose-base max-w-prose mx-auto px-4 py-8">
```

If a TOC (table of contents) exists, on `<md` move it inside a `<details>` element to collapse by default.

- [ ] **Step 2: DevTools + Playwright + commit**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /policy/ @"
git add app/policy/page.tsx
git commit -m "responsive: /policy 320-1536"
```

---

### Task 2.27: Not-found `/not-found`

**Files:**
- Modify: `app/not-found.tsx`

- [ ] **Step 1: Centered minimum width**

```tsx
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold xs:text-5xl">404</h1>
      <p className="mt-2 text-base xs:text-lg text-muted-foreground">Страница не найдена</p>
      <Link href="/" className={buttonVariants({ className: "mt-6" })}>На главную</Link>
    </div>
  );
}
```

(Adjust to match existing copy if different.)

- [ ] **Step 2: DevTools + Playwright + commit**

```bash
npx playwright test responsive.spec.ts -g "no horizontal scroll: /not-found @"
git add app/not-found.tsx
git commit -m "responsive: /not-found 320-1536"
```

---

## Phase 3 — Final QA

### Task 3.1: Lighthouse audit on 4 key pages

**Files:**
- Create: `tests/lighthouse/README.md` (or just screenshots — choose simpler)

- [ ] **Step 1: Run Lighthouse Mobile profile**

Open Chrome DevTools → Lighthouse → Mode: Navigation → Device: Mobile → Categories: Performance, Accessibility, Best Practices, SEO.

Run on each:
- `http://localhost:3002/`
- `http://localhost:3002/uslugi/implantaciya/`
- `http://localhost:3002/vrachi/khechoyan-armen-aratovich/`
- `http://localhost:3002/zapis/`

Save each report as PNG to `tests/lighthouse/<route>.png`.

- [ ] **Step 2: Verify acceptance**

For each report: Performance ≥ 85, Accessibility = 100.

If any score is below target, open an issue / TODO note inside the commit message — do not block merging.

- [ ] **Step 3: Commit**

```bash
git add tests/lighthouse/
git commit -m "test(lighthouse): mobile audit snapshots for 4 key pages"
```

---

### Task 3.2: Final smoke run + summary

**Files:** none (verification only)

- [ ] **Step 1: Full Playwright run**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test
```

Expected: all 27 routes × 8 widths = 216 tests passing.

- [ ] **Step 2: Final vitest run**

```bash
npx vitest run
```

Expected: all unit tests pass (including the new `MobileStickyCTA.test.tsx`).

- [ ] **Step 3: Live-eyeball summary**

Open `http://localhost:3002` on a real iPhone (or Chrome mobile mode at 375):
- Sticky CTA visible
- Header phone icon works
- No horizontal scroll on every page in NAV

- [ ] **Step 4: Push (if user requests)**

```bash
git status
git log --oneline -20
```

Confirm with user before `git push`.

---

## Notes for the implementing engineer

- Project is on Windows with PowerShell as default shell. Use Bash tool for POSIX-style scripts shown above, or translate `&&` chains to `; if ($?) { ... }` for PowerShell.
- Dev server runs at `http://localhost:3002`; keep it running. If you stop/restart, the previous PID may still hold the port — use `taskkill /PID <pid> /F` only after confirming it's a stale process.
- `next/image` requires `relative` on the parent for `fill` mode — always add it when migrating from `<img>`.
- The `xs:` breakpoint is new; if any task uses `xs:` and Tailwind doesn't recognize it, re-check that Task 1.1 successfully added `--breakpoint-xs: 30rem` inside the existing `@theme inline { ... }` block in `app/globals.css`.
- Commit messages follow the existing pattern (`fix:`, `feat:`, `style:`, `responsive:` prefix). Don't squash — each task = one reviewable commit.
