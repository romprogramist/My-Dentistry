import { test, expect, type Locator } from "@playwright/test";

async function classOf(loc: Locator): Promise<string> {
  return (await loc.getAttribute("class")) ?? "";
}

const SUBPAGES = [
  "/uslugi/implantaciya/",
  "/uslugi/endodontiya-pod-mikroskopom/",
  "/uslugi/khirurgiya/",
  "/uslugi/khirurgiya/udalenie-zuba-mudrosti/",
  "/uslugi/lechenie-kanalov/",
  "/uslugi/lechenie-kariesa/",
  "/uslugi/professionalnaya-gigiena/",
  "/uslugi/protezirovanie/",
  "/uslugi/protezirovanie/koronki-cirkoniy/",
  "/uslugi/protezirovanie/viniry/",
  "/uslugi/restavraciya-zubov/",
];

test.describe("/uslugi index — desktop 1280", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("index has no body CTA buttons (only text Подробнее links)", async ({ page }) => {
    await page.goto("/uslugi/");
    const sectionCtas = page.locator("section a", { hasText: /записаться/i });
    await expect(sectionCtas).toHaveCount(0);

    const podrobnee = page.getByRole("link", { name: /подробнее/i });
    expect(await podrobnee.count()).toBeGreaterThan(0);
    const cls = await classOf(podrobnee.first());
    expect(cls).toMatch(/text-brand-700/);
    expect(cls).not.toMatch(/bg-gradient-to-br/);
  });

  test("header CTA on /uslugi is gradient + arrow", async ({ page }) => {
    await page.goto("/uslugi/");
    const cta = page
      .locator("header")
      .getByRole("link", { name: /^записаться$/i });
    await expect(cta).toBeVisible();
    const cls = await classOf(cta);
    expect(cls).toMatch(/bg-gradient-to-br/);
    expect(cls).toMatch(/\bh-11\b/);
    await expect(cta.locator("svg")).toBeVisible();
  });
});

test.describe("/uslugi index — mobile 375", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("MobileStickyCTA renders with gradient Записаться + outline Позвонить", async ({ page }) => {
    await page.goto("/uslugi/");
    const sticky = page.locator('[aria-label="Быстрая запись"]');
    await expect(sticky).toBeVisible();

    const book = sticky.getByRole("link", { name: /записаться/i });
    expect(await classOf(book)).toMatch(/bg-gradient-to-br/);

    const call = sticky.getByRole("link", { name: /позвонить/i });
    expect(await classOf(call)).toMatch(/border-mint-200/);
  });
});

test.describe("uslugi subpages — bottom CTA pattern", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  for (const path of SUBPAGES) {
    test(`${path} bottom CTA is lg gradient with arrow`, async ({ page }) => {
      await page.goto(path);
      const cta = page
        .locator("main")
        .getByRole("link", { name: /записаться/i })
        .last();
      await expect(cta).toBeVisible();
      const cls = await classOf(cta);
      expect(cls).toMatch(/bg-gradient-to-br/);
      expect(cls).toMatch(/from-brand-600/);
      expect(cls).toMatch(/to-mint-700/);
      expect(cls).toMatch(/\bh-14\b/);
      expect(cls).toMatch(/text-base/);

      const arrow = cta.locator("svg");
      await expect(arrow).toHaveCount(1);
      const arrowCls = (await arrow.getAttribute("class")) ?? "";
      expect(arrowCls).toMatch(/group-hover\/button:translate-x-1/);
      expect(arrowCls).toMatch(/\bhidden\b/);
      expect(arrowCls).toMatch(/xs:inline-block/);
      await expect(arrow).toBeVisible();
    });
  }
});

test.describe("uslugi subpages — arrow hidden at 320px", () => {
  test.use({ viewport: { width: 320, height: 800 } });

  test("/uslugi/implantaciya/ — CTA visible, arrow display:none", async ({ page }) => {
    await page.goto("/uslugi/implantaciya/");
    const cta = page
      .locator("main")
      .getByRole("link", { name: /записаться/i })
      .last();
    await expect(cta).toBeVisible();

    const arrow = cta.locator("svg");
    await expect(arrow).toBeHidden();
  });
});
