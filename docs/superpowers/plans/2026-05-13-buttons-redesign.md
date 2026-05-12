# Buttons Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace boring near-black buttons with a brand-gradient (blue→mint) + motion treatment site-wide, calibrated to the "Balanced" intensity, with arrow icons on every "Записаться" CTA.

**Architecture:** Single source of truth — `components/ui/button.tsx` CVA variants. ~30 call sites pick up the new look automatically. Three pinpoint edits: drop bespoke classes from BookingForm submit, bump Header CTA from `sm` to default, add `<ArrowRight />` icon to all 14 "Записаться" CTAs (Hero, Header, MobileStickyCTA, 11 service pages).

**Tech Stack:** Tailwind v4 (`bg-gradient-to-br`, arbitrary shadow values), CVA, lucide-react (`ArrowRight`), Vitest + Testing Library, Playwright, Lighthouse CLI.

**Spec:** `docs/superpowers/specs/2026-05-13-buttons-redesign-design.md`

**Dev server:** Keep `npx next dev -p 3002` running throughout — Playwright baseURL points there. For Lighthouse prod step, also build and serve `out/` on `:3003`.

---

## Task 1: Rewrite `components/ui/button.tsx` variants & sizes

**Files:**
- Modify: `components/ui/button.tsx`

- [ ] **Step 1: Read the current file to confirm anchor strings**

```bash
cd "C:/Users/Roman/My-Dentistry" && cat components/ui/button.tsx
```

Expected: file matches the base-class + variants shape described in the spec. Note `group/button` token already on base — keep it.

- [ ] **Step 2: Replace the CVA call with the new variants/sizes**

Open `components/ui/button.tsx` and replace the entire `buttonVariants = cva(...)` definition (currently lines 6-41) with:

```tsx
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all duration-200 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-brand-600 to-mint-700 text-white shadow-[0_8px_20px_rgba(8,145,178,0.32)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(8,145,178,0.45)] active:translate-y-0",
        outline:
          "border-mint-200 bg-white text-mint-700 shadow-[0_2px_6px_rgba(0,0,0,0.05)] hover:-translate-y-px hover:border-mint-700 hover:bg-mint-50 active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-11 gap-2 rounded-xl px-5 text-sm font-semibold has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-lg px-3.5 text-sm font-semibold has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg: "h-14 gap-2 rounded-xl px-7 text-base font-semibold has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        icon: "size-11 rounded-xl",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-9 rounded-lg in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-14 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

**Changes summary** (compared to current file):
- Base class: removed `text-sm` (size variants own font now), removed `active:not-aria-[haspopup]:translate-y-px` (motion now part of each variant), added `duration-200 ease-out` after `transition-all`.
- `default` variant: gradient + tinted shadow + lift-on-hover + return-to-zero on active.
- `outline` variant: mint border/text/hover, soft shadow, lift-on-hover.
- `secondary`, `ghost`, `destructive`, `link`: unchanged.
- `default` size: `h-11 px-5 rounded-xl text-sm font-semibold` (was `h-8 px-2.5 text-sm`).
- `sm` size: `h-9 px-3.5 rounded-lg text-sm font-semibold` (was `h-7 px-2.5 text-[0.8rem]`).
- `lg` size: `h-14 px-7 rounded-xl text-base font-semibold` (was `h-9 px-2.5`).
- `icon` sizes scaled to match new defaults (`size-11`/`size-14` instead of `size-8`/`size-9`).
- `xs` size: unchanged.

- [ ] **Step 3: Run unit tests**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run
```

Expected: **55/55 pass**. The only test that touches Button-related classes is `components/layout/MobileStickyCTA.test.tsx` which checks for `flex-1` and `min-h-11` — both still present (`flex-1` from caller `className`, `min-h-11` from caller `className`; the new variant adds `h-11` too which is compatible).

If anything fails, the most likely cause is a class-name regex test for old `h-8`/`h-7`/`h-9` values. Grep `components/**/*.test.tsx` for `\bh-[789]\b` and update expectations to the new heights.

- [ ] **Step 4: Run Playwright responsive smoke**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test
```

Expected: **216/216 pass**. Risk surface: 320px header — Header still uses `size: "sm"` at this point (h-9), so it should fit. We change Header to default in Task 3 and re-run Playwright then.

- [ ] **Step 5: Commit**

```bash
git add components/ui/button.tsx
git commit -m "feat(ui): redesign Button variants — gradient default, mint outline, larger sizes"
```

---

## Task 2: Drop bespoke submit-button classes in `BookingForm.tsx`

**Files:**
- Modify: `components/forms/BookingForm.tsx`

- [ ] **Step 1: Locate the submit Button**

```bash
cd "C:/Users/Roman/My-Dentistry" && grep -n 'h-\[52px\]' components/forms/BookingForm.tsx
```

Expected: one match around line 232.

- [ ] **Step 2: Replace the Button element**

Open `components/forms/BookingForm.tsx`. Find:

```tsx
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-[52px] w-full rounded-lg bg-mint-700 text-base font-semibold text-white shadow-lg shadow-mint-500/30 hover:bg-mint-900"
        >
```

Replace with:

```tsx
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full"
        >
```

(Leave the children of the Button — the loader + label — unchanged.)

- [ ] **Step 3: Run vitest**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run
```

Expected: 55/55 pass.

- [ ] **Step 4: Run Playwright filtered to /zapis/**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test responsive.spec.ts -g "no horizontal scroll: /zapis/ @"
```

Expected: 8/8 pass.

- [ ] **Step 5: Commit**

```bash
git add components/forms/BookingForm.tsx
git commit -m "refactor(form): submit button uses Button size=lg (drops bespoke classes)"
```

---

## Task 3: `Header.tsx` — bump CTA to default size + add ArrowRight icon

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Add the ArrowRight import**

Open `components/layout/Header.tsx`. The current first import line:

```tsx
import { Phone } from "lucide-react";
```

Replace with:

```tsx
import { ArrowRight, Phone } from "lucide-react";
```

- [ ] **Step 2: Update the "Записаться" CTA**

Find (around line 60-63):

```tsx
          <div className="hidden md:block">
            <Link href="/zapis/" className={buttonVariants({ size: "sm" })}>
              Записаться
            </Link>
          </div>
```

Replace with:

```tsx
          <div className="hidden md:block">
            <Link href="/zapis/" className={buttonVariants()}>
              Записаться
              <ArrowRight className="ml-1 size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
            </Link>
          </div>
```

(Drops `size: "sm"` so it picks up default h-11. Adds arrow with hover-slide.)

- [ ] **Step 3: Run vitest**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run
```

Expected: 55/55 pass. (No Header tests currently exist that assert button size.)

- [ ] **Step 4: Run Playwright full sweep**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test
```

Expected: 216/216 pass. Risk surface: 320px header overflow — the CTA is `hidden md:block`, so it doesn't render below 768px. Should pass.

If 320-768px fails because of the larger button, the fix is to add `md:hidden` to the existing mobile phone icon nothing — but most likely it's fine because the CTA stays `hidden md:block`.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat(header): CTA uses default size + ArrowRight icon"
```

---

## Task 4: `HomeHero.tsx` — add ArrowRight to primary CTA

**Files:**
- Modify: `components/home/HomeHero.tsx`

- [ ] **Step 1: Add the ArrowRight import**

Open `components/home/HomeHero.tsx`. Find:

```tsx
import { Star } from "lucide-react";
```

Replace with:

```tsx
import { ArrowRight, Star } from "lucide-react";
```

- [ ] **Step 2: Add the arrow inside the "Записаться на приём" Link**

Find (around line 33-38):

```tsx
            <Link
              href="/zapis/"
              className={buttonVariants({ size: "lg" })}
            >
              Записаться на приём
            </Link>
```

Replace with:

```tsx
            <Link
              href="/zapis/"
              className={buttonVariants({ size: "lg" })}
            >
              Записаться на приём
              <ArrowRight className="ml-1 size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
            </Link>
```

(Note: `size-5` here, not `size-4` — `lg` buttons get a slightly larger icon to match `text-base`.)

Leave the outline "Услуги и цены" link as is.

- [ ] **Step 3: Run vitest**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run
```

Expected: 55/55 pass.

- [ ] **Step 4: Run Playwright filtered to home**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test responsive.spec.ts -g "no horizontal scroll: / @"
```

Expected: 8/8 pass.

- [ ] **Step 5: Commit**

```bash
git add components/home/HomeHero.tsx
git commit -m "feat(home): hero CTA gains ArrowRight icon"
```

---

## Task 5: `MobileStickyCTA.tsx` — add ArrowRight to bottom CTA

**Files:**
- Modify: `components/layout/MobileStickyCTA.tsx`

- [ ] **Step 1: Add the ArrowRight import**

Open `components/layout/MobileStickyCTA.tsx`. Find:

```tsx
import { Phone } from "lucide-react";
```

Replace with:

```tsx
import { ArrowRight, Phone } from "lucide-react";
```

- [ ] **Step 2: Add arrow inside the "Записаться" Link**

Find (around line 24-30):

```tsx
      <Link
        href="/zapis/"
        aria-label="Записаться на приём"
        className={buttonVariants({ className: "flex-1 min-h-11" })}
      >
        Записаться
      </Link>
```

Replace with:

```tsx
      <Link
        href="/zapis/"
        aria-label="Записаться на приём"
        className={buttonVariants({ className: "flex-1 min-h-11" })}
      >
        Записаться
        <ArrowRight className="ml-1 size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
      </Link>
```

- [ ] **Step 3: Run vitest**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run
```

Expected: 55/55 pass. The MobileStickyCTA tests (`renders call and book links`, etc.) use `getByRole("link", { name: /записаться/i })` — this still matches because the visible text "Записаться" remains. The added `<ArrowRight />` is an SVG with no `aria-label`, so it's accessibility-name invisible. No test breakage.

- [ ] **Step 4: Run Playwright filtered to home (covers mobile sticky)**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test responsive.spec.ts -g "no horizontal scroll: / @ 320\|375\|480"
```

Expected: 3/3 pass at small widths where sticky CTA renders.

- [ ] **Step 5: Commit**

```bash
git add components/layout/MobileStickyCTA.tsx
git commit -m "feat(mobile-sticky): CTA gains ArrowRight icon"
```

---

## Task 6: Service pages — add ArrowRight to all 11 bottom CTAs

**Files (one task per file is overkill — do them in one pass):**
- Modify: `app/uslugi/endodontiya-pod-mikroskopom/page.tsx`
- Modify: `app/uslugi/implantaciya/page.tsx`
- Modify: `app/uslugi/khirurgiya/page.tsx`
- Modify: `app/uslugi/khirurgiya/udalenie-zuba-mudrosti/page.tsx`
- Modify: `app/uslugi/lechenie-kanalov/page.tsx`
- Modify: `app/uslugi/lechenie-kariesa/page.tsx`
- Modify: `app/uslugi/professionalnaya-gigiena/page.tsx`
- Modify: `app/uslugi/protezirovanie/page.tsx`
- Modify: `app/uslugi/protezirovanie/koronki-cirkoniy/page.tsx`
- Modify: `app/uslugi/protezirovanie/viniry/page.tsx`
- Modify: `app/uslugi/restavraciya-zubov/page.tsx`

- [ ] **Step 1: Confirm the uniform pattern**

```bash
cd "C:/Users/Roman/My-Dentistry" && grep -rn 'Link href="/zapis/" className={buttonVariants' app/uslugi
```

Expected: exactly 11 matches, each looking like:

```tsx
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            ...
          </Link>
```

If any match has different attributes (e.g., extra className), handle that file manually in Step 3.

- [ ] **Step 2: Check current imports**

Each service page file needs `ArrowRight` from `lucide-react`. Some files may already import other icons from `lucide-react`; in that case, add `ArrowRight` to the existing import. Others have no `lucide-react` import yet; in that case, add a new import line near the existing imports.

```bash
cd "C:/Users/Roman/My-Dentistry" && for f in $(grep -rln 'Link href="/zapis/" className={buttonVariants' app/uslugi); do echo "=== $f ==="; grep -n "lucide-react" "$f" || echo "(no existing lucide-react import)"; done
```

Use the output to decide per-file whether to extend or add a new import.

- [ ] **Step 3: For each of the 11 files, apply the same two-part edit**

**Edit A** — add `ArrowRight` to the `lucide-react` import:

If the file already has `import { Foo } from "lucide-react";`, change to `import { ArrowRight, Foo } from "lucide-react";` (alphabetical).

If the file has no `lucide-react` import, add a new line right after the last existing `import` line at the top of the file:

```tsx
import { ArrowRight } from "lucide-react";
```

**Edit B** — find the existing CTA pattern:

```tsx
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
```

In each file there is exactly one match. Inside the `<Link>...</Link>` block, the text content varies (e.g., "Записаться на консультацию", "Записаться", etc.). Right after the closing of the text content and before `</Link>`, insert:

```tsx
            <ArrowRight className="ml-1 size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
```

Example final shape (using one file's actual text):

```tsx
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
            <ArrowRight className="ml-1 size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
          </Link>
```

- [ ] **Step 4: Run vitest**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run
```

Expected: 55/55 pass.

- [ ] **Step 5: Run full Playwright sweep**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx playwright test
```

Expected: 216/216 pass. All `lg` CTAs now have an icon — total horizontal width increases by ~24px (icon + gap). Risk surface: service page CTAs at 320px width inside narrow containers. Investigate any failures by checking which route × width failed.

- [ ] **Step 6: Commit**

```bash
git add app/uslugi/
git commit -m "feat(uslugi): all 11 service-page bottom CTAs gain ArrowRight icon"
```

---

## Task 7: Lighthouse production-build a11y verification

**Files:** none modified (verification only). May modify `components/ui/button.tsx` if contrast fix needed.

- [ ] **Step 1: Build production bundle**

```bash
cd "C:/Users/Roman/My-Dentistry" && npm run build
```

Expected: build succeeds, `out/` regenerated, sitemap created. If build fails, fix the underlying error (most likely a TS/lint issue from one of the prior edits) and re-run.

- [ ] **Step 2: Stop any process on :3003 then serve `out/`**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx -y serve out -p 3003 --no-clipboard
```

Run in background (Bash tool `run_in_background: true`). Wait for `Accepting connections at http://localhost:3003` to appear in the output before continuing.

```bash
until curl -sf -o /dev/null http://localhost:3003/; do sleep 1; done; echo ready
```

- [ ] **Step 3: Run Lighthouse on the 4 audited pages**

```bash
cd "C:/Users/Roman/My-Dentistry" && for spec in "home:/" "uslugi-implantaciya:/uslugi/implantaciya/" "vrachi-khechoyan:/vrachi/khechoyan-armen-aratovich/" "zapis:/zapis/"; do
  name="${spec%%:*}"; path="${spec##*:}"
  npx -y lighthouse "http://localhost:3003${path}" \
    --output=json --output=html \
    --output-path="tests/lighthouse/prod-${name}" \
    --chrome-flags="--headless=new --no-sandbox" --quiet \
    --form-factor=mobile --screenEmulation.mobile \
    --screenEmulation.width=375 --screenEmulation.height=667 \
    --screenEmulation.deviceScaleFactor=2
done
```

- [ ] **Step 4: Read out the scores**

```bash
cd "C:/Users/Roman/My-Dentistry/tests/lighthouse" && for f in prod-home prod-uslugi-implantaciya prod-vrachi-khechoyan prod-zapis; do
  node -e "const r=require('./$f.report.json');const c=r.categories;console.log('$f: perf=',Math.round(c.performance.score*100),'a11y=',Math.round(c.accessibility.score*100),'bp=',Math.round(c['best-practices'].score*100),'seo=',Math.round(c.seo.score*100));"
done
```

Expected: all four show **a11y=100**.

- [ ] **Step 5: If `color-contrast` failed on any page, apply the fallback gradient**

```bash
cd "C:/Users/Roman/My-Dentistry/tests/lighthouse" && node -e "const r=require('./prod-home.report.json');const a=r.audits['color-contrast'];if(a.score===1){console.log('OK')}else{a.details.items.forEach(it=>console.log(it.node.snippet,'|',it.node.explanation));}"
```

If any item shows the gradient start (`#0284c7`) failing contrast, open `components/ui/button.tsx` and replace `from-brand-600` with `from-brand-700` in the `default` variant string:

```tsx
default:
  "bg-gradient-to-br from-brand-700 to-mint-700 text-white shadow-[0_8px_20px_rgba(8,145,178,0.32)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(8,145,178,0.45)] active:translate-y-0",
```

Then rebuild (`npm run build`), re-serve, re-run Lighthouse from Step 3, re-check.

If contrast was fine, skip this step.

- [ ] **Step 6: Stop the static server**

Use TaskStop to kill the background `serve` task.

- [ ] **Step 7: Commit any contrast fix + the new Lighthouse reports**

If Step 5 fell back to `from-brand-700`:

```bash
cd "C:/Users/Roman/My-Dentistry" && git add components/ui/button.tsx tests/lighthouse/prod-*.report.*
git commit -m "fix(ui): button gradient starts at brand-700 for AA contrast; refresh Lighthouse reports"
```

If contrast was fine first try:

```bash
cd "C:/Users/Roman/My-Dentistry" && git add tests/lighthouse/prod-*.report.*
git commit -m "test(lighthouse): refresh prod a11y snapshots after button redesign"
```

---

## Task 8: Live visual eyeball + push

**Files:** none modified (verification only).

- [ ] **Step 1: Ensure dev server is running on :3002**

```bash
cd "C:/Users/Roman/My-Dentistry" && curl -sf -o /dev/null http://localhost:3002/ && echo "up" || echo "start it"
```

If "start it", run `npx next dev -p 3002` in background.

- [ ] **Step 2: Open these URLs in browser and confirm visually**

For each, eyeball at 375px and 1280px DevTools viewports:

- `http://localhost:3002/` — Hero "Записаться на приём" has gradient + arrow that slides on hover; "Услуги и цены" outline still works; HomeMicroscope/HomeLab "Узнать больше" gradient, no arrow.
- `http://localhost:3002/uslugi/implantaciya/` — bottom CTA gradient + arrow + lift on hover.
- `http://localhost:3002/zapis/` — submit button gradient (no longer just mint solid), h-14, full width, no arrow (form action, not nav).
- `http://localhost:3002/kontakty/` — embedded BookingForm submit same as `/zapis/`.

At 375px on home/`/uslugi/implantaciya/`: MobileStickyCTA "Записаться" with arrow visible; "Позвонить" outline button with phone icon, mint border on hover.

- [ ] **Step 3: Final test sweep**

```bash
cd "C:/Users/Roman/My-Dentistry" && npx vitest run && npx playwright test
```

Expected: vitest 55/55, Playwright 216/216.

- [ ] **Step 4: Push**

```bash
cd "C:/Users/Roman/My-Dentistry" && git status && git log --oneline origin/main..HEAD
```

Confirm the commits look right (one per task, no surprise files), then:

```bash
cd "C:/Users/Roman/My-Dentistry" && git push origin main
```

---

## Notes for the implementing engineer

- Windows + PowerShell shell, but the project's plan-style commands are Bash-friendly. Use the Bash tool for the snippets above; for `taskkill`-style operations use the PowerShell tool with `Stop-Process -Id <pid> -Force`.
- `group/button` is on the base CVA class — every variant inherits it. That's why arrow icons placed inside `<Link>` wrappers that use `buttonVariants()` still get the hover-slide.
- `lucide-react` icons render as `<svg>` and are accessibility-name invisible by default. Existing tests that match by accessible name (`getByRole("link", { name: /записаться/i })`) keep working without changes.
- Tailwind v4 arbitrary values: `shadow-[0_8px_20px_rgba(8,145,178,0.32)]` — note the underscores instead of spaces, and **no quotes around the rgba** inside the bracket (Tailwind's parser treats the whole thing as one token).
- The `active:translate-y-0` in the new variants overrides the inherited `active:translate-y-px` from the previous base — verified by removing that token from the base in Task 1 Step 2.
- After Task 7 finishes, the dev server on :3002 should still be running for Task 8 Step 2.
- The acceptance criteria from the spec map to: vitest after every task (1–6), Playwright after every task (1–6), Lighthouse only in Task 7, live eyeball in Task 8.
