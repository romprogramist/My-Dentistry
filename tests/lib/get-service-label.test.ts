import { describe, expect, it } from "vitest";
import { getServiceLabel } from "@/lib/forms/get-service-label";

describe("getServiceLabel", () => {
  it("returns category short title for category slug", () => {
    expect(getServiceLabel("lechenie-kariesa")).toBe("Кариес");
  });

  it("returns featured service short title", () => {
    expect(getServiceLabel("protezirovanie/viniry")).toBe("Виниры");
  });

  it("returns featured short title even when category with similar prefix exists", () => {
    expect(getServiceLabel("protezirovanie/koronki-cirkoniy")).toBe(
      "Коронка цирконий"
    );
  });

  it("returns null for unknown slug", () => {
    expect(getServiceLabel("does-not-exist")).toBeNull();
  });

  it("returns null for empty / undefined", () => {
    expect(getServiceLabel("")).toBeNull();
    expect(getServiceLabel(undefined)).toBeNull();
  });
});
