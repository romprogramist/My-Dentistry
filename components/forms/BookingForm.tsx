"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { bookingSchema, type BookingInput } from "@/lib/forms/booking-schema";
import { submitBooking } from "@/lib/forms/submit-booking";

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm({
  servicePreselected,
}: {
  servicePreselected?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceSlug: servicePreselected,
    },
  });

  async function onSubmit(data: BookingInput) {
    setStatus("submitting");
    const result = await submitBooking(data);
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <p className="text-lg font-semibold text-green-900">
          Спасибо! Ваша заявка принята.
        </p>
        <p className="mt-2 text-sm text-green-700">
          Мы свяжемся с вами в ближайшее время.
        </p>
        <Button
          variant="ghost"
          onClick={() => setStatus("idle")}
          className="mt-4"
        >
          Записаться ещё раз
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Ваше имя *</Label>
        <Input id="name" {...register("name")} placeholder="Иван Иванов" />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Телефон *</Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder="+7 (___) ___-__-__"
          inputMode="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="preferredTime">Удобное время</Label>
        <Input
          id="preferredTime"
          {...register("preferredTime")}
          placeholder="Например: завтра утром"
        />
      </div>

      <div>
        <Label htmlFor="message">Комментарий</Label>
        <Textarea id="message" {...register("message")} rows={3} />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          {...register("consent")}
          className="mt-1 h-4 w-4 rounded border-input accent-brand-600"
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-tight">
          Я согласен на обработку персональных данных в соответствии с{" "}
          <a href="/policy/" className="underline hover:text-brand-600">
            политикой конфиденциальности
          </a>
          .
        </Label>
      </div>
      {errors.consent && (
        <p className="-mt-2 text-sm text-red-600">{errors.consent.message}</p>
      )}

      {status === "error" && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">
          Не удалось отправить заявку: {error}. Попробуйте позвонить нам
          напрямую.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? "Отправка..." : "Записаться на приём"}
      </Button>
    </form>
  );
}
