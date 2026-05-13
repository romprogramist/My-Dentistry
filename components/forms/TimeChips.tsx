"use client";

import { cn } from "@/lib/utils";

type Day = "today" | "tomorrow";
type Period = "morning" | "day" | "evening";

const DAY_LABELS: Record<Day, string> = {
  today: "Сегодня",
  tomorrow: "Завтра",
};
const PERIOD_LABELS: Record<Period, string> = {
  morning: "Утро",
  day: "День",
  evening: "Вечер",
};

function parse(value: string): { day: Day | null; period: Period | null } {
  const parts = value.split(",").map((p) => p.trim());
  let day: Day | null = null;
  let period: Period | null = null;
  for (const p of parts) {
    const lower = p.toLowerCase();
    if (lower === "сегодня") day = "today";
    else if (lower === "завтра") day = "tomorrow";
    else if (lower === "утро") period = "morning";
    else if (lower === "день") period = "day";
    else if (lower === "вечер") period = "evening";
  }
  return { day, period };
}

function serialize(day: Day | null, period: Period | null): string {
  if (day && period)
    return `${DAY_LABELS[day]}, ${PERIOD_LABELS[period].toLowerCase()}`;
  if (day) return DAY_LABELS[day];
  if (period) return PERIOD_LABELS[period];
  return "";
}

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function TimeChips({ value, onChange }: Props) {
  const { day, period } = parse(value);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {(["today", "tomorrow"] as const).map((d) => (
          <Chip
            key={d}
            active={day === d}
            onClick={() => onChange(serialize(day === d ? null : d, period))}
            label={DAY_LABELS[d]}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(["morning", "day", "evening"] as const).map((p) => (
          <Chip
            key={p}
            active={period === p}
            onClick={() => onChange(serialize(day, period === p ? null : p))}
            label={PERIOD_LABELS[p]}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "touch-target rounded-xl border-[1.5px] px-4 text-sm font-medium transition-all duration-200",
        active
          ? "border-mint-500 bg-gradient-to-br from-mint-500 to-mint-600 font-semibold text-white shadow-[0_6px_16px_rgba(8,145,178,0.30)]"
          : "border-mint-100 bg-white text-mint-700 shadow-soft hover:-translate-y-px hover:border-mint-300 hover:bg-mint-50"
      )}
    >
      {label}
    </button>
  );
}
