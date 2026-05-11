import { test, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

fs.mkdirSync("tests/screens", { recursive: true });

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
      const response = await page.goto(route, { waitUntil: "load" });
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
