import { test, expect, type Locator } from "@playwright/test";

async function classOf(loc: Locator): Promise<string> {
  return (await loc.getAttribute("class")) ?? "";
}

const PROFILES = [
  "/vrachi/khechoyan-armen-aratovich/",
  "/vrachi/navasardyan-marine-movsesovna/",
];

test.describe("/vrachi index — desktop 1280", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("index has no body CTA buttons (card-wide Link only)", async ({ page }) => {
    await page.goto("/vrachi/");
    const sectionCtas = page.locator("section a", { hasText: /записаться/i });
    await expect(sectionCtas).toHaveCount(0);

    const cards = page.getByRole("link", { name: /хечоян|навасардян/i });
    await expect(cards).toHaveCount(2);
    const cls = await classOf(cards.first());
    expect(cls).not.toMatch(/bg-gradient-to-br/);
    expect(cls).toMatch(/hover:bg-slate-50/);
  });

  test("header CTA on /vrachi is gradient + arrow", async ({ page }) => {
    await page.goto("/vrachi/");
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

test.describe("/vrachi index — mobile 375", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("MobileStickyCTA renders correctly", async ({ page }) => {
    await page.goto("/vrachi/");
    const sticky = page.locator('[aria-label="Быстрая запись"]');
    await expect(sticky).toBeVisible();

    const book = sticky.getByRole("link", { name: /записаться/i });
    expect(await classOf(book)).toMatch(/bg-gradient-to-br/);
    const call = sticky.getByRole("link", { name: /позвонить/i });
    expect(await classOf(call)).toMatch(/border-mint-200/);
  });
});

test.describe("doctor profile pages — embedded BookingForm submit", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  for (const path of PROFILES) {
    test(`${path} BookingForm submit is lg gradient`, async ({ page }) => {
      await page.goto(path);
      const submit = page.getByRole("button", { name: /записаться на приём/i });
      await expect(submit).toBeVisible();
      const cls = await classOf(submit);
      expect(cls).toMatch(/bg-gradient-to-br/);
      expect(cls).toMatch(/from-brand-600/);
      expect(cls).toMatch(/to-mint-700/);
      expect(cls).toMatch(/\bh-14\b/);
      expect(cls).toMatch(/\bw-full\b/);
      expect(cls).not.toMatch(/h-\[52px\]/);
      expect(cls).not.toMatch(/bg-mint-500/);
    });
  }

  test("doctor profile success screen renders new buttons", async ({ page }) => {
    await page.route("**/api/booking", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' })
    );
    await page.goto("/vrachi/khechoyan-armen-aratovich/");

    await page.getByLabel(/ваше имя/i).fill("Тест Пациент");
    await page.getByLabel(/телефон/i).fill("9991234567");
    await page.getByRole("checkbox").click();
    await page.getByRole("button", { name: /записаться на приём/i }).click();

    await expect(
      page.getByRole("heading", { name: /спасибо! заявка принята/i })
    ).toBeVisible({ timeout: 5000 });

    const callLink = page
      .locator("article")
      .getByRole("link", { name: /позвонить/i })
      .first();
    expect(await classOf(callLink)).toMatch(/bg-gradient-to-br/);

    const retry = page.getByRole("button", { name: /записаться ещё раз/i });
    const retryCls = await classOf(retry);
    expect(retryCls).toMatch(/border-mint-200/);
    expect(retryCls).toMatch(/text-mint-700/);
    expect(retryCls).toMatch(/\bh-14\b/);
  });
});
