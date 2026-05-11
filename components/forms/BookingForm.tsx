"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { bookingSchema, type BookingInput } from "@/lib/forms/booking-schema";
import { submitBooking } from "@/lib/forms/submit-booking";
import { getServiceLabel } from "@/lib/forms/get-service-label";
import { CLINIC } from "@/lib/constants/clinic";

import { PhoneInput } from "./PhoneInput";
import { TimeChips } from "./TimeChips";
import { BookingSuccess } from "./BookingSuccess";

type Status = "idle" | "submitting" | "success" | "error";

const INPUT_CLASS =
  "h-12 rounded-lg border-[1.5px] border-mint-200 bg-white px-4 text-base focus-visible:border-mint-500 focus-visible:ring-4 focus-visible:ring-mint-500/15";

export function BookingForm({
  servicePreselected,
}: {
  servicePreselected?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [serviceSlug, setServiceSlug] = useState<string | undefined>(
    servicePreselected
  );

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      preferredTime: "",
      message: "",
      // zod schema requires literal `true`; defaultValues must start unchecked
      consent: false as unknown as true,
      serviceSlug: servicePreselected,
    },
  });

  async function onSubmit(data: BookingInput) {
    setStatus("submitting");
    setServerError("");
    const result = await submitBooking({ ...data, serviceSlug });
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setServerError(result.error);
    }
  }

  if (status === "success") {
    return <BookingSuccess onReset={() => setStatus("idle")} />;
  }

  const serviceLabel = getServiceLabel(serviceSlug);
  const primaryPhone = CLINIC.phones[0];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-mint-600">
            Онлайн-запись
          </div>
          <h3 className="mt-1 text-2xl font-bold text-mint-900">
            Записаться на приём
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Перезвоним в течение часа в рабочее время
          </p>
        </div>

        {serviceLabel && (
          <div className="inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-700">
            Услуга: <span className="font-bold">{serviceLabel}</span>
            <button
              type="button"
              aria-label="Убрать услугу"
              onClick={() => setServiceSlug(undefined)}
              className="-mr-1 rounded-full p-0.5 hover:bg-mint-200"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Иван Иванов"
                  className={INPUT_CLASS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон *</FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  className={INPUT_CLASS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Удобное время</FormLabel>
              <FormControl>
                <TimeChips
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  className="rounded-lg border-[1.5px] border-mint-200 bg-white px-4 py-2 focus-visible:border-mint-500 focus-visible:ring-4 focus-visible:ring-mint-500/15"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    className="mt-0.5 h-5 w-5 rounded-md data-checked:border-mint-500 data-checked:bg-mint-500"
                  />
                </FormControl>
                <FormLabel className="m-0 text-xs font-normal normal-case leading-relaxed tracking-normal text-muted-foreground">
                  Я согласен на обработку персональных данных в соответствии с{" "}
                  <a
                    href="/policy/"
                    className="text-mint-600 underline hover:text-mint-700"
                  >
                    политикой конфиденциальности
                  </a>
                  .
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-destructive">
              Не удалось отправить заявку
              {serverError ? `: ${serverError}` : ""}. Попробуйте ещё раз или
              позвоните:{" "}
              <a
                href={`tel:${primaryPhone.tel}`}
                className="font-semibold underline"
              >
                {primaryPhone.display}
              </a>
              .
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-[52px] w-full rounded-lg bg-mint-500 text-base font-semibold text-white shadow-lg shadow-mint-500/30 hover:bg-mint-700"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Отправка...
            </>
          ) : (
            "Записаться на приём"
          )}
        </Button>
      </form>
    </Form>
  );
}
