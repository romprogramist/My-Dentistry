"use client";

import { CheckCircle2, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

type Props = { onReset: () => void };

export function BookingSuccess({ onReset }: Props) {
  const primaryPhone = CLINIC.phones[0];
  return (
    <div className="mx-auto flex min-h-[28rem] max-w-md flex-col items-center justify-center px-4 py-10 text-center">
      <div className="relative mb-6">
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-full bg-mint-200/40 blur-2xl"
        />
        <div className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full bg-gradient-to-br from-mint-500 to-mint-700 text-white shadow-[0_20px_40px_-12px_rgba(8,145,178,0.55)]">
          <CheckCircle2 className="h-12 w-12" strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
      <h3 className="font-display text-3xl font-medium leading-tight text-ink-900">
        Спасибо! Заявка принята
      </h3>
      <p className="mt-3 max-w-xs text-pretty text-[15px] leading-relaxed text-muted-foreground">
        Администратор клиники перезвонит вам в&nbsp;течение часа в&nbsp;рабочее время
        и&nbsp;подберёт удобный слот.
      </p>
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        <a
          href={`tel:${primaryPhone.tel}`}
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          <Phone className="size-4" aria-hidden="true" />
          Позвонить {primaryPhone.display}
        </a>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onReset}
          className="w-full"
        >
          Записаться ещё раз
        </Button>
      </div>
    </div>
  );
}
