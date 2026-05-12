import { test, expect, type Locator } from "@playwright/test";

async function classOf(loc: Locator): Promise<string> {
  return (await loc.getAttribute("class")) ?? "";
}

test.describe("home page buttons — desktop 1280", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("header CTA renders default-size gradient with arrow", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /^записаться$/i }).first();
    await expect(cta).toBeVisible();
    const cls = await classOf(cta);
    expect(cls).toMatch(/bg-gradient-to-br/);
    expect(cls).toMatch(/from-brand-600/);
    expect(cls).toMatch(/\bh-11\b/);
    await expect(cta.locator("svg")).toBeVisible();
  });

  test("hero primary CTA is lg gradient + arrow", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("link", { name: /записаться на приём/i });
    await expect(hero).toBeVisible();
    const cls = await classOf(hero);
    expect(cls).toMatch(/bg-gradient-to-br/);
    expect(cls).toMatch(/\bh-14\b/);
    expect(cls).toMatch(/text-base/);
    await expect(hero.locator("svg")).toBeVisible();
  });

  test("hero outline CTA uses mint outline (no gradient)", async ({ page }) => {
    await page.goto("/");
    const outline = page.getByRole("link", { name: /^услуги и цены$/i });
    await expect(outline).toBeVisible();
    const cls = await classOf(outline);
    expect(cls).toMatch(/border-mint-200/);
    expect(cls).toMatch(/text-mint-700/);
    expect(cls).toMatch(/\bh-14\b/);
    expect(cls).not.toMatch(/bg-gradient-to-br/);
  });

  test("HomeMicroscope inline CTA is default-size gradient", async ({ page }) => {
    await page.goto("/");
    const cta = page
      .locator("section", { has: page.getByRole("heading", { name: /эндодонтия под микроскопом/i }) })
      .getByRole("link", { name: /узнать больше/i });
    await expect(cta).toBeVisible();
    const cls = await classOf(cta);
    expect(cls).toMatch(/bg-gradient-to-br/);
    expect(cls).toMatch(/\bh-11\b/);
  });

  test("HomeLab inline CTA is default-size gradient", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /подробнее о лаборатории/i });
    await expect(cta).toBeVisible();
    const cls = await classOf(cta);
    expect(cls).toMatch(/bg-gradient-to-br/);
    expect(cls).toMatch(/\bh-11\b/);
  });

  test("HomeServices ghost link is not gradient", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: /^все услуги/i });
    await expect(link).toBeVisible();
    const cls = await classOf(link);
    expect(cls).not.toMatch(/bg-gradient-to-br/);
    expect(cls).toMatch(/hover:bg-muted/);
  });

  test("MobileStickyCTA is hidden on desktop", async ({ page }) => {
    await page.goto("/");
    const sticky = page.locator('[aria-label="Быстрая запись"]');
    await expect(sticky).toHaveClass(/md:hidden/);
    await expect(sticky).not.toBeVisible();
  });
});

test.describe("home page buttons — mobile 375", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("MobileStickyCTA bottom Записаться is gradient + arrow", async ({ page }) => {
    await page.goto("/");
    const sticky = page.locator('[aria-label="Быстрая запись"]');
    await expect(sticky).toBeVisible();

    const book = sticky.getByRole("link", { name: /записаться/i });
    const bookCls = await classOf(book);
    expect(bookCls).toMatch(/bg-gradient-to-br/);
    expect(bookCls).toMatch(/flex-1/);
    await expect(book.locator("svg")).toBeVisible();
  });

  test("MobileStickyCTA Позвонить is outline (mint)", async ({ page }) => {
    await page.goto("/");
    const sticky = page.locator('[aria-label="Быстрая запись"]');
    const call = sticky.getByRole("link", { name: /позвонить/i });
    const cls = await classOf(call);
    expect(cls).toMatch(/border-mint-200/);
    expect(cls).toMatch(/text-mint-700/);
    expect(cls).toMatch(/flex-1/);
    expect(cls).not.toMatch(/bg-gradient-to-br/);
  });

  test("header desktop CTA is hidden on mobile (replaced by phone icon)", async ({ page }) => {
    await page.goto("/");
    const headerCtaWrapper = page
      .locator("header")
      .locator("div.hidden.md\\:block", { hasText: "Записаться" });
    await expect(headerCtaWrapper).toHaveCount(1);
    await expect(headerCtaWrapper).not.toBeVisible();

    const phoneIcon = page
      .locator("header")
      .getByRole("link", { name: /позвонить/i });
    await expect(phoneIcon).toBeVisible();
  });
});
