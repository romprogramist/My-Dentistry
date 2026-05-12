# Buttons Redesign — Design Spec

## Problem

All buttons across the site render in near-black `bg-primary` (`oklch(0.205 0 0)`) — generic, unbranded, "boring." Brand palette (blue `#0369a1` + mint `#0e7490`) appears nowhere on CTAs. The only exception is the BookingForm submit button, which got bespoke inline classes (`h-[52px] bg-mint-700 shadow-lg ...`) precisely because the shared `<Button>` looked too flat — a sign the default needs to absorb that polish.

## Direction

**Gradient + motion.** Brand-blue → mint linear gradient (135°), soft tinted shadow, +2px lift on hover, arrow icon that slides right on hover for "Записаться" CTAs.

Calibration: **Balanced** — visible but not loud. Marketing-CTA standard sizing (44px inline / 56px hero), 200ms ease-out transitions.

## Scope

**In scope** — `components/ui/button.tsx`:
- Rewrite `default` and `outline` variant classes
- Resize `default`, `lg`, `sm` heights/padding/radius
- Keep `ghost`, `secondary`, `destructive`, `link`, `xs`, `icon*` unchanged

**In scope** — call sites:
- `components/forms/BookingForm.tsx:229-232` — drop bespoke submit classes, use `size="lg" className="w-full"`
- Add `<ArrowRight />` icon to "Записаться" CTAs only:
  - `components/home/HomeHero.tsx:35`
  - `components/layout/Header.tsx:61`
  - `components/layout/MobileStickyCTA.tsx:27`
  - All `app/uslugi/**/page.tsx` bottom CTAs (11 files)

**Out of scope**:
- `secondary`, `destructive`, `link`, `xs`, `icon*` variants
- Form inputs, time chips, dropdowns
- Dark mode polish (dark mode not active on site)
- Animation library — using CSS `transition-all` only

## Visual Spec

### Variants

| Variant | Background | Text | Shadow | Hover | Active |
|---|---|---|---|---|---|
| `default` | `linear-gradient(135deg, #0284c7, #0e7490)` (brand-600 → mint-700) | `#fff` | `0 8px 20px rgba(8,145,178,.32)` | shadow `0 12px 26px rgba(8,145,178,.45)` + `translateY(-2px)` | `translateY(0)` |
| `outline` | `#fff` | `text-mint-700` (`#0e7490`) | `0 2px 6px rgba(0,0,0,.05)` | `bg-mint-50` + `border-mint-700` + `translateY(-1px)` | `translateY(0)` |
| `ghost`, `secondary`, `destructive`, `link` | unchanged | — | — | — | — |

**Gradient color choice rationale:** Starting from `brand-600` (#0284c7) instead of `brand-500` (#0ea5e9) so the lightest stop with white text still hits 4.5:1 contrast for WCAG AA. If Lighthouse audit still flags it, fall back to `brand-700` (#0369a1) start.

### Sizes

| Size | Height | Padding | Radius | Font | Usage |
|---|---|---|---|---|---|
| `default` | `h-11` (44px) | `px-5` | `rounded-xl` | `text-sm font-semibold` | header, mobile sticky, inline CTAs |
| `lg` | `h-14` (56px) | `px-7` | `rounded-xl` | `text-base font-semibold` | hero CTAs, page-bottom CTA, form submit |
| `sm` | `h-9` (36px) | `px-3.5` | `rounded-lg` | `text-sm font-semibold` | dialog/sheet actions |
| `icon` | `size-11` (44px) | — | `rounded-xl` | — | square button matched to `default` (e.g. MobileNav burger) |
| `icon-sm` | `size-9` (36px) | — | `rounded-lg` | — | square button matched to `sm` (e.g. modal close) |
| `icon-lg` | `size-14` (56px) | — | `rounded-xl` | — | square button matched to `lg` |
| `xs`, `icon-xs` | unchanged | — | — | — | utility, badge-scale |

**Note (amended 2026-05-13):** `icon`, `icon-sm`, `icon-lg` were originally listed as "unchanged" but had to scale alongside `default`/`sm`/`lg` to keep visual proportion and to lift the MobileNav burger to the WCAG 2.5.5 44×44 touch-target. `icon-xs` and `xs` remain unchanged.

### Motion

- All transitions: `transition-all duration-200 ease-out`
- Hover lift: `translateY(-2px)` (default), `translateY(-1px)` (outline)
- Active state: returns to `translateY(0)` (existing base class `active:translate-y-px` removed in favor of motion above to keep the lift "spring" coherent)
- Arrow icon: `group-hover/button:translate-x-1` (4px slide). `group/button` is already present on the base class.

### Accessibility

- 44px default height ≥ WCAG 2.5.5 / Apple HIG touch target
- Color contrast:
  - `#fff` on `#0284c7` = 4.45 (borderline AA normal) → re-verify with Lighthouse; downgrade gradient start to `#0369a1` (6.8) if needed
  - `#fff` on `#0e7490` = 5.0 ✓
  - `#0e7490` on `#fff` (outline) = 5.0 ✓
- Focus-visible ring from existing base class is preserved (`focus-visible:ring-3 focus-visible:ring-ring/50`)
- `aria-invalid`/`disabled` states inherited from base class — unchanged

## Architecture

One file: `components/ui/button.tsx`. CVA `buttonVariants` config changes:

```tsx
// Pseudocode shape — exact class strings finalized in implementation
variants: {
  variant: {
    default: "bg-gradient-to-br from-brand-600 to-mint-700 text-white shadow-[0_8px_20px_rgba(8,145,178,.32)] hover:shadow-[0_12px_26px_rgba(8,145,178,.45)] hover:-translate-y-0.5",
    outline: "border-mint-200 bg-white text-mint-700 shadow-sm hover:bg-mint-50 hover:border-mint-700 hover:-translate-y-px",
    // ghost, secondary, destructive, link — unchanged
  },
  size: {
    default: "h-11 px-5 rounded-xl text-sm font-semibold",
    lg: "h-14 px-7 rounded-xl text-base font-semibold",
    sm: "h-9 px-3.5 rounded-lg text-sm font-semibold",
    // xs, icon*, icon-xs, icon-sm, icon-lg — unchanged
  },
}
```

Tailwind v4 with `bg-gradient-to-br` and arbitrary shadow values via `shadow-[...]`. The custom color tokens `brand-600`, `mint-700`, `mint-200`, `mint-50` are already defined in `app/globals.css`.

No new dependencies. No new components. No new files.

## Call-Site Changes

### Remove bespoke styling

`components/forms/BookingForm.tsx:229-242` — replace:

```tsx
<Button
  type="submit"
  disabled={status === "submitting"}
  className="h-[52px] w-full rounded-lg bg-mint-700 text-base font-semibold text-white shadow-lg shadow-mint-500/30 hover:bg-mint-900"
>
```

with:

```tsx
<Button type="submit" size="lg" disabled={status === "submitting"} className="w-full">
```

### Add arrow icon to "Записаться" CTAs

Pattern (apply at each site listed in Scope):

```tsx
<Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
  Записаться
  <ArrowRight className="ml-1 size-4 transition-transform group-hover/button:translate-x-1" />
</Link>
```

The `group/button` selector is already on the base CVA class, so the icon translation works on Link wrappers that use `buttonVariants()` too.

## Verification

Sequential, in this order:

1. **vitest** — `npx vitest run`. Expected 55/55. If a Header/MobileStickyCTA test breaks on `ArrowRight` import, mock `lucide-react` as the existing tests already do (`MobileStickyCTA.test.tsx` uses `Phone`).

2. **Playwright responsive** — `npx playwright test`. Expected 216/216. Risk surface: 320px header width — new `h-11` "Записаться" + phone-icon + burger menu must still fit. Inline service-page CTAs at 320px.

3. **Lighthouse mobile prod** — build (`npm run build`), serve `out/` on `:3003`, audit 4 pages: `/`, `/uslugi/implantaciya/`, `/vrachi/khechoyan-armen-aratovich/`, `/zapis/`. Expected `a11y=100` on all four. If `color-contrast` fails on the gradient, fall back to `brand-700` (`#0369a1`) as gradient start.

4. **Visual live-eyeball** — dev server `:3000` at viewports 375 and 1280: home (hero + microscope + lab + contact form), one service page, `/zapis/`, header, mobile sticky.

## Acceptance Criteria

- vitest 55/55
- Playwright 216/216
- Lighthouse `a11y=100` on all 4 audited pages (prod build)
- `BookingForm` submit uses `size="lg"` only (no bespoke height/bg/shadow classes)
- "Записаться" CTAs on Hero, Header, MobileStickyCTA, and all 11 service-page bottoms render with arrow icon that slides on hover
- `default` and `outline` variants use the gradient/mint spec above
- `secondary`, `destructive`, `link` variants visually unchanged
- `icon`, `icon-sm`, `icon-lg` rescaled to match new default/sm/lg sizes (see amended Sizes table); `xs` and `icon-xs` unchanged
