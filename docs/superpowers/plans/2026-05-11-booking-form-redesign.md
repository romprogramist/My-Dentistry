# Booking Form Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Перерисовать `BookingForm` и блок `HomeContact` в стиле Fresh mint (бирюза/циан) с маской телефона, чипами времени, нормальным чекбоксом из shadcn и аккуратными состояниями ошибок/успеха.

**Architecture:** Декомпозиция `BookingForm` на блоки (`PhoneInput`, `TimeChips`, `BookingSuccess`), shadcn `Form`-обёртка для интеграции с react-hook-form и aria-атрибутов. Mint-палитра живёт рядом с brand через CSS-токены в `globals.css`. zod-schema **не меняется** — её `transform` уже нормализует любой ввод телефона в `+7XXXXXXXXXX`, маска работает только в UI.

**Tech Stack:** Next.js 16 (App Router) + React 19 + TypeScript, Tailwind v4, shadcn/ui + @base-ui/react, react-hook-form + zod, vitest + @testing-library/react.

**Spec:** `docs/superpowers/specs/2026-05-11-booking-form-redesign-design.md`.

---

## File Structure

**Создаём:**
- `lib/forms/phone-mask.ts` — pure formatter
- `lib/forms/get-service-label.ts` — slug → label из существующих services constants
- `components/ui/form.tsx` — shadcn Form/FormField/FormItem/FormLabel/FormControl/FormMessage
- `components/forms/PhoneInput.tsx`
- `components/forms/TimeChips.tsx`
- `components/forms/BookingSuccess.tsx`
- `tests/lib/phone-mask.test.ts`
- `tests/lib/get-service-label.test.ts`
- `tests/components/PhoneInput.test.tsx`
- `tests/components/TimeChips.test.tsx`
- `tests/components/BookingForm.test.tsx`

**Меняем:**
- `app/globals.css` — добавить `--color-mint-*` рядом с brand
- `components/forms/BookingForm.tsx` — полный rewrite
- `components/home/HomeContact.tsx` — перерисовать в mint

**Не трогаем:** `lib/forms/booking-schema.ts`, `lib/forms/submit-booking.ts`, `components/ui/checkbox.tsx`, `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/label.tsx`, `components/ui/button.tsx`, страницы услуг/врачей.

---

## Conventions

- Тесты запускать одиночно: `npx vitest run <путь>`. Полный прогон: `npm test`.
- Все пути с алиасом `@/` (см. `vitest.config.ts`).
- Размеры вне дефолтной шкалы Tailwind v4 (52px, 88px) задавать через arbitrary values `h-[52px]`.
- Commit prefix: `feat:`, `refactor:`, `style:`, `test:`.

---

### Task 1: Add mint CSS tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Locate the brand token block**

Открыть `app/globals.css`. Найти строку `--color-brand-900: #0c4a6e;`. Mint-токены пойдут сразу под ней.

- [ ] **Step 2: Add mint tokens**

Вставить **после** строки `--color-brand-900: #0c4a6e;`:

```css
  --color-mint-50:  #ecfeff;
  --color-mint-100: #cffafe;
  --color-mint-200: #a5f3fc;
  --color-mint-500: #06b6d4;
  --color-mint-600: #0891b2;
  --color-mint-700: #0e7490;
  --color-mint-900: #164e63;
```

- [ ] **Step 3: Verify Tailwind picks them up**

Запустить dev-сервер: `npm run dev` (если ещё не запущен на 3002/3000). Открыть любую страницу. В консоли браузера:

```js
getComputedStyle(document.documentElement).getPropertyValue('--color-mint-500')
```

Expected: `#06b6d4` (или `rgb(6, 182, 212)`).

Если значение пустое — синтаксическая ошибка рядом со вставкой (отсутствует `;`, неправильно вложили в `@theme`).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(styles): add mint color tokens for booking form"
```

---

### Task 2: Phone mask formatter (TDD)

**Files:**
- Create: `lib/forms/phone-mask.ts`
- Test: `tests/lib/phone-mask.test.ts`

- [ ] **Step 1: Write the failing test**

Создать `tests/lib/phone-mask.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { formatPhone } from "@/lib/forms/phone-mask";

describe("formatPhone", () => {
  it("returns empty string for empty input", () => {
    expect(formatPhone("")).toBe("");
  });

  it("formats a bare 10-digit number", () => {
    expect(formatPhone("9181234567")).toBe("+7 (918) 123-45-67");
  });

  it("normalises 8 prefix", () => {
    expect(formatPhone("89181234567")).toBe("+7 (918) 123-45-67");
  });

  it("normalises 7 prefix", () => {
    expect(formatPhone("79181234567")).toBe("+7 (918) 123-45-67");
  });

  it("normalises +7 prefix", () => {
    expect(formatPhone("+79181234567")).toBe("+7 (918) 123-45-67");
  });

  it("strips non-digits", () => {
    expect(formatPhone("918abc12")).toBe("+7 (918) 12");
  });

  it("truncates over 10 significant digits", () => {
    expect(formatPhone("918123456789999")).toBe("+7 (918) 123-45-67");
  });

  it("is idempotent", () => {
    const once = formatPhone("89181234567");
    expect(formatPhone(once)).toBe(once);
  });

  it("formats partial inputs progressively", () => {
    expect(formatPhone("9")).toBe("+7 (9");
    expect(formatPhone("918")).toBe("+7 (918)");
    expect(formatPhone("9181")).toBe("+7 (918) 1");
    expect(formatPhone("918123")).toBe("+7 (918) 123");
    expect(formatPhone("9181234")).toBe("+7 (918) 123-4");
    expect(formatPhone("918123456")).toBe("+7 (918) 123-45-6");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/lib/phone-mask.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/forms/phone-mask'`.

- [ ] **Step 3: Write minimal implementation**

Создать `lib/forms/phone-mask.ts`:

```ts
export function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8") || digits.startsWith("7")) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);
  if (digits.length === 0) return "";

  let out = "+7 (" + digits.slice(0, 3);
  if (digits.length < 3) return out;
  out += ")";
  if (digits.length === 3) return out;
  out += " " + digits.slice(3, 6);
  if (digits.length <= 6) return out;
  out += "-" + digits.slice(6, 8);
  if (digits.length <= 8) return out;
  out += "-" + digits.slice(8, 10);
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/lib/phone-mask.test.ts
```

Expected: PASS — 9 cases.

- [ ] **Step 5: Commit**

```bash
git add lib/forms/phone-mask.ts tests/lib/phone-mask.test.ts
git commit -m "feat(forms): add phone-mask formatter"
```

---

### Task 3: Service label lookup (TDD)

**Files:**
- Create: `lib/forms/get-service-label.ts`
- Test: `tests/lib/get-service-label.test.ts`

- [ ] **Step 1: Write the failing test**

Создать `tests/lib/get-service-label.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/lib/get-service-label.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Создать `lib/forms/get-service-label.ts`:

```ts
import {
  FEATURED_SERVICES,
  SERVICE_CATEGORIES,
} from "@/lib/constants/services";

export function getServiceLabel(
  slug: string | undefined | null
): string | null {
  if (!slug) return null;
  const featured = FEATURED_SERVICES.find((s) => s.slug === slug);
  if (featured) return featured.shortTitle;
  const category = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  if (category) return category.shortTitle;
  return null;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/lib/get-service-label.test.ts
```

Expected: PASS — 5 cases.

- [ ] **Step 5: Commit**

```bash
git add lib/forms/get-service-label.ts tests/lib/get-service-label.test.ts
git commit -m "feat(forms): add service slug to label lookup"
```

---

### Task 4: shadcn Form components

**Files:**
- Create: `components/ui/form.tsx`

(No dedicated test — exercised by `BookingForm.test.tsx` в Task 8.)

- [ ] **Step 1: Try the shadcn CLI**

```bash
npx shadcn@latest add form --yes
```

Expected: создаёт `components/ui/form.tsx`, может добавить `@radix-ui/react-slot` и/или `@radix-ui/react-label` в зависимости.

Если CLI отработал — перейти к Step 3.

Если CLI упал (offline / mismatch версий / `prompts not supported` в headless) — перейти к Step 2 и написать файл вручную.

- [ ] **Step 2: Manual form.tsx (only if Step 1 failed)**

Установить slot dep:

```bash
npm install @radix-ui/react-slot
```

Создать `components/ui/form.tsx`:

```tsx
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName };

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormItemContextValue = { id: string };
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField must be used within <FormField>");
  }

  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        "text-xs font-semibold uppercase tracking-wider text-mint-900 data-[error=true]:text-destructive",
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();
  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();
  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;
  if (!body) return null;
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn(
        "flex items-center gap-1.5 text-sm text-destructive",
        className
      )}
      {...props}
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
```

- [ ] **Step 3: TypeScript smoke check**

```bash
npx tsc --noEmit
```

Expected: нет новых ошибок в `components/ui/form.tsx`. Существующие проектные ошибки (если есть) — фиксируем глазами, не регрессия — игнорируем.

Если ругается на `Slot` или `react-hook-form` types — убедиться, что `@radix-ui/react-slot` установлен.

- [ ] **Step 4: Commit**

```bash
git add components/ui/form.tsx package.json package-lock.json
git commit -m "feat(ui): add shadcn Form components with AlertCircle in FormMessage"
```

---

### Task 5: PhoneInput component (TDD)

**Files:**
- Create: `components/forms/PhoneInput.tsx`
- Test: `tests/components/PhoneInput.test.tsx`

- [ ] **Step 1: Write the failing test**

Создать `tests/components/PhoneInput.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneInput } from "@/components/forms/PhoneInput";

describe("PhoneInput", () => {
  it("formats progressive typed input", async () => {
    const user = userEvent.setup();
    let val = "";
    const handle = vi.fn((v: string) => {
      val = v;
    });

    const { rerender } = render(
      <PhoneInput value={val} onChange={handle} id="phone" />
    );

    await user.type(screen.getByRole("textbox"), "9");
    rerender(<PhoneInput value={val} onChange={handle} id="phone" />);
    expect(val).toBe("+7 (9");
  });

  it("normalises 8-prefixed pasted number", async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<PhoneInput value="" onChange={handle} id="phone" />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.paste("89181234567");

    expect(handle).toHaveBeenLastCalledWith("+7 (918) 123-45-67");
  });

  it("sets tel inputMode and autoComplete", () => {
    render(<PhoneInput value="" onChange={() => {}} id="phone" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("inputMode", "tel");
    expect(input).toHaveAttribute("autoComplete", "tel");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/PhoneInput.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Создать `components/forms/PhoneInput.tsx`:

```tsx
"use client";

import { Input } from "@/components/ui/input";
import { formatPhone } from "@/lib/forms/phone-mask";

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  onBlur?: () => void;
};

export function PhoneInput({
  value,
  onChange,
  id,
  name,
  placeholder = "+7 (___) ___-__-__",
  className,
  onBlur,
}: Props) {
  return (
    <Input
      id={id}
      name={name}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      className={className}
      value={value}
      onBlur={onBlur}
      onChange={(e) => onChange(formatPhone(e.target.value))}
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/PhoneInput.test.tsx
```

Expected: PASS — 3 cases.

- [ ] **Step 5: Commit**

```bash
git add components/forms/PhoneInput.tsx tests/components/PhoneInput.test.tsx
git commit -m "feat(forms): add PhoneInput with live masking"
```

---

### Task 6: TimeChips component (TDD)

**Files:**
- Create: `components/forms/TimeChips.tsx`
- Test: `tests/components/TimeChips.test.tsx`

- [ ] **Step 1: Write the failing test**

Создать `tests/components/TimeChips.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeChips } from "@/components/forms/TimeChips";

describe("TimeChips", () => {
  it("emits only the day label when only a day is picked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimeChips value="" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Завтра" }));
    expect(onChange).toHaveBeenLastCalledWith("Завтра");
  });

  it("combines day and period", async () => {
    const user = userEvent.setup();
    let val = "";
    const onChange = vi.fn((v: string) => {
      val = v;
    });
    const { rerender } = render(<TimeChips value={val} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Завтра" }));
    rerender(<TimeChips value={val} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Утро" }));

    expect(onChange).toHaveBeenLastCalledWith("Завтра, утро");
  });

  it("clears selection when clicking the active chip", async () => {
    const user = userEvent.setup();
    let val = "";
    const onChange = vi.fn((v: string) => {
      val = v;
    });
    const { rerender } = render(<TimeChips value={val} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Завтра" }));
    rerender(<TimeChips value={val} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Завтра" }));

    expect(onChange).toHaveBeenLastCalledWith("");
  });

  it("replaces the day within the same group", async () => {
    const user = userEvent.setup();
    let val = "";
    const onChange = vi.fn((v: string) => {
      val = v;
    });
    const { rerender } = render(<TimeChips value={val} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Сегодня" }));
    rerender(<TimeChips value={val} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Завтра" }));

    expect(onChange).toHaveBeenLastCalledWith("Завтра");
  });

  it("hydrates aria-pressed state from initial value", () => {
    render(<TimeChips value="Завтра, утро" onChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Завтра" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Утро" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Сегодня" })
    ).toHaveAttribute("aria-pressed", "false");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/TimeChips.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Создать `components/forms/TimeChips.tsx`:

```tsx
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
        "h-10 rounded-lg border-[1.5px] px-4 text-sm font-medium transition-colors",
        active
          ? "border-mint-500 bg-mint-500 font-semibold text-white"
          : "border-mint-200 text-mint-700 hover:bg-mint-50"
      )}
    >
      {label}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/TimeChips.test.tsx
```

Expected: PASS — 5 cases.

- [ ] **Step 5: Commit**

```bash
git add components/forms/TimeChips.tsx tests/components/TimeChips.test.tsx
git commit -m "feat(forms): add TimeChips with day+period combinations"
```

---

### Task 7: BookingSuccess component

**Files:**
- Create: `components/forms/BookingSuccess.tsx`

(Тест отдельный не нужен — состояние success покрывается happy-path в `BookingForm.test.tsx`.)

- [ ] **Step 1: Implement BookingSuccess**

Создать `components/forms/BookingSuccess.tsx`:

```tsx
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
```

- [ ] **Step 2: TypeScript smoke check**

```bash
npx tsc --noEmit
```

Expected: нет новых ошибок в новом файле.

- [ ] **Step 3: Commit**

```bash
git add components/forms/BookingSuccess.tsx
git commit -m "feat(forms): add BookingSuccess screen with call CTA"
```

---

### Task 8: BookingForm rewrite (TDD)

**Files:**
- Modify: `components/forms/BookingForm.tsx` (полный rewrite)
- Test: `tests/components/BookingForm.test.tsx`

- [ ] **Step 1: Write the failing test**

Создать `tests/components/BookingForm.test.tsx`:

```tsx
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/forms/submit-booking", () => ({
  submitBooking: vi.fn(),
}));

import { submitBooking } from "@/lib/forms/submit-booking";
import { BookingForm } from "@/components/forms/BookingForm";

const mockSubmit = submitBooking as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockSubmit.mockReset();
});

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/имя/i), "Иван Иванов");
  await user.type(screen.getByLabelText(/телефон/i), "9181234567");
  await user.click(screen.getByLabelText(/согласен на обработку/i));
}

describe("BookingForm", () => {
  it("submits valid data and shows success screen", async () => {
    mockSubmit.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<BookingForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
    expect(mockSubmit.mock.calls[0][0]).toMatchObject({
      name: "Иван Иванов",
      phone: "+79181234567",
      consent: true,
    });
    expect(await screen.findByText(/спасибо!/i)).toBeInTheDocument();
  });

  it("blocks submission when phone is incomplete", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await user.type(screen.getByLabelText(/имя/i), "Иван");
    await user.type(screen.getByLabelText(/телефон/i), "918");
    await user.click(screen.getByLabelText(/согласен на обработку/i));
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      await screen.findByText(/корректный российский номер/i)
    ).toBeInTheDocument();
  });

  it("blocks submission without consent", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    await user.type(screen.getByLabelText(/имя/i), "Иван Иванов");
    await user.type(screen.getByLabelText(/телефон/i), "9181234567");
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText(/согласие/i)).toBeInTheDocument();
  });

  it("shows error banner with tel link on server failure", async () => {
    mockSubmit.mockResolvedValue({ ok: false, error: "Network down" });
    const user = userEvent.setup();
    render(<BookingForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /записаться/i }));

    expect(
      await screen.findByText(/не удалось отправить/i)
    ).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /\+7/ });
    expect(link.getAttribute("href")).toMatch(/^tel:/);
  });

  it("renders service pill when servicePreselected is given", () => {
    render(<BookingForm servicePreselected="lechenie-kariesa" />);
    expect(screen.getByText(/услуга:/i)).toBeInTheDocument();
    expect(screen.getByText("Кариес")).toBeInTheDocument();
  });

  it("clears service pill via close button", async () => {
    const user = userEvent.setup();
    render(<BookingForm servicePreselected="lechenie-kariesa" />);

    await user.click(screen.getByRole("button", { name: /убрать услугу/i }));
    expect(screen.queryByText(/услуга:/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/components/BookingForm.test.tsx
```

Expected: FAIL — текущий `BookingForm` не рендерит ни pill, ни нужные тексты/контракты.

- [ ] **Step 3: Rewrite BookingForm**

Перезаписать `components/forms/BookingForm.tsx` целиком:

```tsx
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
                  className="rounded-lg border-[1.5px] border-mint-200 bg-white focus-visible:border-mint-500 focus-visible:ring-4 focus-visible:ring-mint-500/15"
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/components/BookingForm.test.tsx
```

Expected: PASS — 6 cases.

Если падает «cannot find label by /имя/i»: shadcn `FormLabel` рендерит `<label htmlFor={formItemId}>`, базовый Input получает `id={formItemId}` через Slot — связь должна работать. Если в тесте всё же не находит — fallback: заменить `getByLabelText(/имя/i)` на `screen.getByPlaceholderText("Иван Иванов")` (для phone — `screen.getByRole("textbox", { name: /телефон/i })`).

Если падает «cannot find by /согласен на обработку/i» — base-ui `Checkbox.Root` рендерится как button. `getByLabelText` работает с button через htmlFor↔id. Если нет — fallback: `screen.getByRole("checkbox")`.

- [ ] **Step 5: Run the full test suite**

```bash
npm test
```

Expected: всё зелёное, включая существующие `booking-schema.test.ts`, `sanity.test.ts`, `schema.test.ts`, `transliterate.test.ts`, `VideoPlayer.test.tsx`.

- [ ] **Step 6: Commit**

```bash
git add components/forms/BookingForm.tsx tests/components/BookingForm.test.tsx
git commit -m "feat(forms): redesign BookingForm in mint with decomposed blocks"
```

---

### Task 9: HomeContact redesign

**Files:**
- Modify: `components/home/HomeContact.tsx`

(Без отдельного теста — визуальное изменение, ручная проверка в Task 10.)

- [ ] **Step 1: Rewrite HomeContact**

Перезаписать `components/home/HomeContact.tsx`:

```tsx
import { MapPin, Phone, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { BookingForm } from "@/components/forms/BookingForm";

export function HomeContact() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="rounded-2xl bg-mint-50 p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-mint-600">
              Контакты
            </div>
            <h2 className="mt-1 text-2xl font-bold text-mint-900 md:text-3xl">
              Где нас найти
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-mint-600" />
                <div>
                  <p className="font-semibold text-mint-900">Адрес</p>
                  <p className="text-sm text-muted-foreground">
                    {CLINIC.address.full}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-mint-600" />
                <div>
                  <p className="font-semibold text-mint-900">Телефоны</p>
                  {CLINIC.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block text-sm hover:text-mint-700"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-mint-600" />
                <div>
                  <p className="font-semibold text-mint-900">Часы работы</p>
                  <p className="text-sm text-muted-foreground">
                    {CLINIC.hours.weekdays}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {CLINIC.hours.weekend}
                  </p>
                </div>
              </div>
            </div>

            <iframe
              src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
              width="100%"
              height="320"
              allowFullScreen
              loading="lazy"
              title="Карта проезда"
              className="mt-6 rounded-xl"
            />
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript smoke check**

```bash
npx tsc --noEmit
```

Expected: нет новых ошибок.

- [ ] **Step 3: Commit**

```bash
git add components/home/HomeContact.tsx
git commit -m "refactor(home): redesign HomeContact in mint palette"
```

---

### Task 10: Manual verification

**Files:** none (verification only).

- [ ] **Step 1: Run all tests**

```bash
npm test
```

Expected: всё зелёное.

- [ ] **Step 2: Whole-project TypeScript check**

```bash
npx tsc --noEmit
```

Expected: нет регрессий. Если есть предыдущие ошибки вне scope — зафиксировать списком, игнорировать.

- [ ] **Step 3: Start dev server (если не запущен)**

```bash
npm run dev
```

Открыть `http://localhost:3000/` (или 3002 если 3000 занят — Next подскажет в логе).

- [ ] **Step 4: Verify `/zapis`**

Открыть `http://localhost:3000/zapis/`. Проверить глазами:
- Eyebrow «ОНЛАЙН-ЗАПИСЬ» (mint-600 uppercase).
- Заголовок «Записаться на приём» (mint-900, ~24px).
- Поля высотой ~48px, светло-бирюзовая рамка `border-mint-200`.
- При фокусе на любом поле — рамка `mint-500` + ring 4px полупрозрачный.
- В поле «Телефон» ввести `89181234567` → форматируется в `+7 (918) 123-45-67`.
- Чипы «Сегодня/Завтра» — single-select в группе, активный mint-500 white.
- Чипы «Утро/День/Вечер» — single-select в группе, можно сочетать с любым днём.
- Чекбокс согласия — белый по умолчанию, mint-500 при checked, виден ✓.
- Sub­mit с пустым телефоном → под полем красный текст «Введите корректный российский номер» с иконкой ⚠.
- Sub­mit без consent → «Требуется согласие на обработку…».
- Sub­mit валидный — поведение зависит от наличия `/api/booking` endpoint:
  - Если endpoint вернёт 404/error → красная карточка «Не удалось отправить заявку: …. Попробуйте ещё раз или позвоните: +7 (989) 168-71-13» с tel-link.
  - Если endpoint вернёт `{ok:true}` → экран «Спасибо! Заявка принята» с круглой иконкой mint, двумя кнопками (Позвонить / Записаться ещё раз).

- [ ] **Step 5: Verify home page `HomeContact`**

Открыть `http://localhost:3000/`. Прокрутить до блока «Где нас найти»:
- Mint-50 фон обёртки, скруглённые углы.
- Левая колонка: eyebrow «КОНТАКТЫ», заголовок mint-900, контактные строки с mint-600 иконками, карта с `rounded-xl`.
- Правая колонка: белая карточка, в ней та же `BookingForm`.
- Серого блока (`bg-slate-50`) больше нет.
- На мобильной ширине (375px DevTools) — колонки складываются вертикально.

- [ ] **Step 6: Verify service-preselected pill**

Открыть страницу услуги, например `http://localhost:3000/uslugi/lechenie-kariesa/`. Найти inline-форму или CTA, который ведёт на форму с пре-выбранной услугой.

Если на странице услуги есть кнопка/ссылка, которая открывает `BookingForm servicePreselected="lechenie-kariesa"`:
- Над заголовком формы видна пилюля `Услуга: Кариес` (mint-100 фон, mint-700 текст).
- ✕ убирает пилюлю; форма работает дальше.

Если pre-select на страницах услуг не реализован (вне scope этого плана) — пропустить шаг, поведение всё равно покрыто тестом в Task 8.

- [ ] **Step 7: Mobile breakpoint check**

DevTools → 375px (iPhone SE). Проверить:
- Высота полей сохраняется ~48px.
- Чипы дня в 2 колонки, времени — в 3, не ломаются.
- В `HomeContact` колонки складываются в один столбец.
- Кнопка submit — на всю ширину контейнера.

- [ ] **Step 8: Quick keyboard accessibility check**

На `/zapis`: Tab по форме — фокус должен проходить Имя → Телефон → чипы (две группы) → Комментарий → Чекбокс → Submit. Фокусные кольца видны.

- [ ] **Step 9: Optional fix-up commit**

Если на ручной проверке нашёлся мелкий косяк (отступ, опечатка, неверный класс):

```bash
git add -p
git commit -m "fix(forms): <короткое описание>"
```

Если всё чисто — задача завершена.

---

## Summary

10 задач. Логический порядок:

1. Foundation: mint tokens (CSS).
2-3. Pure utilities с TDD (`phone-mask`, `get-service-label`).
4. shadcn `Form` boilerplate.
5-7. Building blocks с TDD (`PhoneInput`, `TimeChips`, `BookingSuccess`).
8. Сборка нового `BookingForm` с TDD на интеграционные сценарии.
9. Redesign `HomeContact` (визуально).
10. Manual verification — браузер + accessibility + responsive.

Каждый шаг производит зелёные тесты или собственный визуальный артефакт. Коммиты — после каждой задачи.
