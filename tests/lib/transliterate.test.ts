import { describe, it, expect } from "vitest";
import { transliterate } from "@/lib/utils/transliterate";

describe("transliterate", () => {
  it("converts Russian phrase to ISO 9 latin", () => {
    expect(transliterate("Циркониевые коронки")).toBe("cirkonievye-koronki");
  });

  it("handles soft sign", () => {
    expect(transliterate("Учитель")).toBe("uchitel");
  });

  it("handles all special letters", () => {
    expect(transliterate("Щит ёж юла")).toBe("shchit-yozh-yula");
  });

  it("normalizes spaces and dashes", () => {
    expect(transliterate("Удаление зуба   мудрости")).toBe(
      "udalenie-zuba-mudrosti"
    );
  });

  it("strips non-alphanumeric except dashes", () => {
    expect(transliterate("Виниры (E.max)")).toBe("viniry-e-max");
  });
});
