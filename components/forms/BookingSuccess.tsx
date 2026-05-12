"use client";

import { CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

type Props = { onReset: () => void };

export function BookingSuccess({ onReset }: Props) {
  const primaryPhone = CLINIC.phones[0];
  return (
    <div className="mx-auto flex min-h-[28rem] max-w-md flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-mint-500 text-white shadow-xl shadow-mint-500/40">
        <CheckCircle2 className="h-11 w-11" strokeWidth={2.2} />
      </div>
      <h3 className="text-xl font-bold text-mint-900">
        Спасибо! Заявка принята
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Администратор клиники перезвонит вам в течение часа в рабочее время и
        подберёт удобный слот.
      </p>
      <div className="mt-7 flex w-full max-w-xs flex-col gap-2.5">
        <a
          href={`tel:${primaryPhone.tel}`}
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
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
