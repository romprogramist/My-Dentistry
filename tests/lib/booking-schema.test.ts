import { describe, it, expect } from "vitest";
import { bookingSchema } from "@/lib/forms/booking-schema";

describe("bookingSchema", () => {
  const valid = {
    name: "Иван Иванов",
    phone: "+7 (989) 123-45-67",
    serviceSlug: "protezirovanie/koronki-cirkoniy",
    preferredTime: "Утром",
    consent: true,
  };

  it("accepts a valid form", () => {
    const result = bookingSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects too-short name", () => {
    const result = bookingSchema.safeParse({ ...valid, name: "И" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone", () => {
    const result = bookingSchema.safeParse({ ...valid, phone: "asdf" });
    expect(result.success).toBe(false);
  });

  it("requires consent", () => {
    const result = bookingSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it("normalizes phone: keeps only +7XXXXXXXXXX", () => {
    const result = bookingSchema.safeParse(valid);
    if (!result.success) throw new Error("expected success");
    expect(result.data.phone).toBe("+79891234567");
  });

  it("allows optional fields", () => {
    const result = bookingSchema.safeParse({
      name: "Анна",
      phone: "+79891234567",
      consent: true,
    });
    expect(result.success).toBe(true);
  });
});
