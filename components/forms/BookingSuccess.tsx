"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

type Props = { onReset: () => void };

export function BookingSuccess({ onReset }: Props) {
  const primaryPhone = CLINIC.phones[0];
  return (
    <div className="flex min-h-[28rem] flex-col items-center justify-center px-4 py-10 text-center">
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
        <Button
          asChild
          className="h-12 rounded-lg bg-mint-500 font-semibold text-white shadow-md shadow-mint-500/30 hover:bg-mint-700"
        >
          <a href={`tel:${primaryPhone.tel}`}>
            Позвонить {primaryPhone.display}
          </a>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="h-12 rounded-lg border-[1.5px] border-mint-200 font-semibold text-mint-700 hover:bg-mint-50"
        >
          Записаться ещё раз
        </Button>
      </div>
    </div>
  );
}
