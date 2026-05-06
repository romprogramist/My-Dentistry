import type { BookingInput } from "./booking-schema";

const ENDPOINT =
  process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "/api/booking";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitBooking(input: BookingInput): Promise<SubmitResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      return { ok: false, error: data.error ?? `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
