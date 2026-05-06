import { z } from "zod";

const PHONE_REGEX = /^\+7\d{10}$/;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Введите имя (минимум 2 символа)"),
  phone: z
    .string()
    .transform((s) => {
      const digits = s.replace(/\D/g, "");
      if (
        digits.length === 11 &&
        (digits.startsWith("7") || digits.startsWith("8"))
      ) {
        return `+7${digits.slice(1)}`;
      }
      if (digits.length === 10) return `+7${digits}`;
      return s;
    })
    .refine((s) => PHONE_REGEX.test(s), "Введите корректный российский номер"),
  serviceSlug: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(500).optional(),
  consent: z.literal(true, {
    error: "Требуется согласие на обработку персональных данных",
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;
