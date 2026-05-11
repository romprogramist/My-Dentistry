import { describe, expect, it } from "vitest";
import { formatPhone } from "@/lib/forms/phone-mask";

describe("formatPhone", () => {
  it("returns empty string for empty input", () => {
    expect(formatPhone("")).toBe("");
  });

  it("formats a bare 10-digit number", () => {
    expect(formatPhone("9181234567")).toBe("+7 (918) 123-45-67");
  });

  it("normalises 8 prefix", () => {
    expect(formatPhone("89181234567")).toBe("+7 (918) 123-45-67");
  });

  it("normalises 7 prefix", () => {
    expect(formatPhone("79181234567")).toBe("+7 (918) 123-45-67");
  });

  it("normalises +7 prefix", () => {
    expect(formatPhone("+79181234567")).toBe("+7 (918) 123-45-67");
  });

  it("strips non-digits", () => {
    expect(formatPhone("918abc12")).toBe("+7 (918) 12");
  });

  it("truncates over 10 significant digits", () => {
    expect(formatPhone("918123456789999")).toBe("+7 (918) 123-45-67");
  });

  it("is idempotent", () => {
    const once = formatPhone("89181234567");
    expect(formatPhone(once)).toBe(once);
  });

  it("formats partial inputs progressively", () => {
    expect(formatPhone("9")).toBe("+7 (9");
    expect(formatPhone("918")).toBe("+7 (918)");
    expect(formatPhone("9181")).toBe("+7 (918) 1");
    expect(formatPhone("918123")).toBe("+7 (918) 123");
    expect(formatPhone("9181234")).toBe("+7 (918) 123-4");
    expect(formatPhone("918123456")).toBe("+7 (918) 123-45-6");
  });
});
