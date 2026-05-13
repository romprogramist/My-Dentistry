# Overnight design-system consistency polish

**Date:** 2026-05-13
**Author:** Claude Opus 4.7 (autonomous overnight session)
**Context:** Continuation of the premium redesign committed earlier this
session (commits 06d8f5e … 9daed78). User asked for unhurried, thoughtful
follow-up work before they wake at ~08:00.

## Problem

The first redesign pass applied premium styling (Cormorant Garamond
display font, ivory backdrops, layered shadows, eyebrow chips, gradient
price tiles, premium booking sections) end-to-end. However two service
pages were rewritten in full (`/uslugi/implantaciya/`,
`/uslugi/endodontiya-pod-mikroskopom/`) while the other nine were only
partially modernised — their **price tables** and **indication lists**
still use the legacy patterns:

- `<Card className="mt-4 overflow-hidden">` (shadcn Card, double rings)
- `<thead className="bg-slate-100">` (cold grey header)
- `<th className="p-3 text-left">` / `<td className="p-3 text-right font-semibold">` (tight padding, no display font on numbers)
- `<ul className="mt-4 space-y-2"><li>✓ text</li></ul>` (bare check char, no card)

These break the design language: the user sees a beautifully framed hero
and FAQ, then a noticeably "older" table or list in the middle of the page.

Affected pages (9):

- `app/uslugi/khirurgiya/page.tsx`
- `app/uslugi/khirurgiya/udalenie-zuba-mudrosti/page.tsx`
- `app/uslugi/lechenie-kanalov/page.tsx`
- `app/uslugi/lechenie-kariesa/page.tsx`
- `app/uslugi/professionalnaya-gigiena/page.tsx`
- `app/uslugi/protezirovanie/page.tsx`
- `app/uslugi/protezirovanie/koronki-cirkoniy/page.tsx`
- `app/uslugi/protezirovanie/viniry/page.tsx`
- `app/uslugi/restavraciya-zubov/page.tsx`

## Goals

1. Bring every service page's tables and lists into the new design
   language so the entire site reads as one product.
2. Do this without breaking any existing test (55 unit + 248 e2e).
3. Keep changes purely visual — no content edits, no new sections,
   no structural reorganisation.

## Non-goals

- Refactoring service pages into a shared shell component (would help
  long-term but risks breaking the established CTA contracts the e2e
  suite verifies; out of scope tonight).
- Adding new content (new FAQ items, new sections, new images).
- Touching anything outside `C:\Users\Roman\My-Dentistry`.

## Design

### Pattern A — price table (replaces `<Card>` + `bg-slate-100` table)

```tsx
<div className="mt-7 overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/5 shadow-soft">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[480px] text-sm">
      <thead className="bg-gradient-to-br from-brand-50/80 to-mint-50/80">
        <tr>
          <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Услуга</th>
          <th className="p-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Цена</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, price], i) => (
          <tr key={label} className={i > 0 ? "border-t border-foreground/5" : ""}>
            <td className="p-4 text-[15px] text-ink-700">{label}</td>
            <td className="p-4 text-right font-display text-lg font-medium text-ink-900">{price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

Match the implementation already in
`app/uslugi/implantaciya/page.tsx` and `app/garantiya/page.tsx`.

### Pattern B — indication / what-we-do list (replaces `<ul>✓ …</ul>`)

```tsx
<ul className="mt-7 space-y-3">
  {items.map((item) => (
    <li
      key={item}
      className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft"
    >
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
      >
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>
      <span className="text-[15px] text-ink-700">{item}</span>
    </li>
  ))}
</ul>
```

For 2-column lists (longer lists like "What we do"), use
`grid gap-3 sm:grid-cols-2`.

### Pattern C — sub-service card (replaces `<Card className="p-5 transition-shadow hover:shadow-md">`)

Two pages have these in-page sub-service cards:
`/uslugi/khirurgiya/` and `/uslugi/protezirovanie/` — they show 2 inner
card tiles linking to deeper pages. Migrate to the same hover-lift card
already used on `/uslugi` index:

```tsx
<Link href="..." className="group relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated">
  <h3 className="font-display text-xl font-medium leading-snug text-ink-900">Title</h3>
  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">Description</p>
  <p className="mt-3 font-display text-lg font-medium text-brand-700">Price</p>
  <span className="mt-3 inline-block text-sm font-semibold text-brand-700">Подробнее →</span>
</Link>
```

## Implementation order

1. **Audit pass complete** (this spec).
2. Apply Pattern A to all 9 service pages — one Edit each, replace_all
   safe where the markup is identical.
3. Apply Pattern B to all 9 service pages — same approach. Where the
   list is longer than 4 items, render in 2 columns at sm+.
4. Apply Pattern C to the 2 pages with inner sub-service cards
   (khirurgiya, protezirovanie).
5. Remove unused `Card` import from each touched file.
6. After each batch: `npm run lint` + `npx tsc --noEmit` + `npm test`.
7. After all 9 pages: `npm run build` + `npx playwright test
   tests/e2e/uslugi-buttons.spec.ts tests/e2e/responsive.spec.ts -g "@ 768"`.
8. Commit with explanatory message.

## Risk

- **Low risk overall.** Pattern A and B don't change any
  e2e-asserted classes. Pattern C changes `<Card>` to `<Link>` but the
  e2e tests for sub-service cards only check that "Подробнее →" links
  exist on the parent service page; the wrapper change is fine as long
  as the inner anchor still carries the brand colour and arrow text.
- **One known constraint to preserve:** the test
  `tests/e2e/uslugi-buttons.spec.ts:24` expects `/uslugi` index links
  to carry `text-brand-700` — but we are not touching the index. The
  sub-service card links inside category pages aren't asserted in
  e2e, so a slightly different shape is OK there.

## Stop condition

If at any point a test fails and the cause isn't immediately obvious,
revert the offending commit and document the issue at the bottom of
this spec so the user can decide in the morning.

## Self-approval

User is asleep and gave an explicit standing approval for autonomous
overnight work earlier this session ("работай пока я не проснусь"). This
spec is a *clarification of intent*, not a new direction. Proceeding.
