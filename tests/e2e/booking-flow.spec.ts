import { test, expect } from "@playwright/test";

test("booking form renders gradient submit + success screen has new buttons", async ({ page }) => {
  await page.route("**/api/booking", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' })
  );

  await page.goto("/zapis/");

  const submit = page.getByRole("button", { name: /записаться на приём/i });
  await expect(submit).toBeVisible();
  const submitClass = (await submit.getAttribute("class")) ?? "";
  expect(submitClass).toMatch(/bg-gradient-to-br/);
  expect(submitClass).toMatch(/from-brand-600/);
  expect(submitClass).toMatch(/to-mint-700/);
  expect(submitClass).toMatch(/\bh-14\b/);

  await page.getByLabel(/ваше имя/i).fill("Тестовый Пациент");
  await page.getByLabel(/телефон/i).fill("9991234567");
  await page.getByRole("checkbox").click();

  await submit.click();

  const successHeading = page.getByRole("heading", { name: /спасибо! заявка принята/i });
  await expect(successHeading).toBeVisible({ timeout: 5000 });

  const callLink = page.getByRole("link", { name: /позвонить/i }).first();
  const callClass = (await callLink.getAttribute("class")) ?? "";
  expect(callClass).toMatch(/bg-gradient-to-br/);
  expect(callClass).toMatch(/\bh-14\b/);

  const retryBtn = page.getByRole("button", { name: /записаться ещё раз/i });
  const retryClass = (await retryBtn.getAttribute("class")) ?? "";
  expect(retryClass).toMatch(/border-mint-200/);
  expect(retryClass).toMatch(/text-mint-700/);
  expect(retryClass).toMatch(/\bh-14\b/);
});
