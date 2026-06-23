"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";

const TEMPLATE = "+7 (___) ___-__-__";

/** Extracts up to 10 national digits, dropping the +7/8 country code. */
function extractDigits(masked: string): string {
  let d = masked.replace(/\D/g, "");
  if (d.startsWith("7") || d.startsWith("8")) d = d.slice(1);
  return d.slice(0, 10);
}

/** Fills the template with the given digits, keeping "_" for empty slots. */
function applyMask(digits: string): string {
  let out = "";
  let i = 0;
  for (const ch of TEMPLATE) {
    out += ch === "_" ? (i < digits.length ? digits[i++] : "_") : ch;
  }
  return out;
}

/** Text index of the slot that holds digit number `count` (0-based). */
function slotIndex(count: number): number {
  let seen = 0;
  for (let i = 0; i < TEMPLATE.length; i++) {
    if (TEMPLATE[i] === "_") {
      if (seen === count) return i;
      seen++;
    }
  }
  return TEMPLATE.length;
}

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
  const ref = useRef<HTMLInputElement>(null);

  function setCaret(pos: number) {
    requestAnimationFrame(() => ref.current?.setSelectionRange(pos, pos));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = extractDigits(e.target.value);
    onChange(digits.length ? applyMask(digits) : "");
    if (digits.length) setCaret(slotIndex(digits.length));
  }

  function handleFocus() {
    if (!value) {
      onChange(applyMask(""));
      setCaret(slotIndex(0));
    }
  }

  function handleBlur() {
    if (extractDigits(value).length === 0) onChange("");
    onBlur?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Backspace") return;
    const input = ref.current;
    if (!input) return;
    const start = input.selectionStart ?? 0;
    if (start !== (input.selectionEnd ?? 0)) return; // let selection delete fall through

    const digits = extractDigits(value);
    // Find the digit sitting just before the caret and remove it,
    // skipping the fixed mask characters so Backspace never gets stuck.
    let k = -1;
    for (let i = 0; i < digits.length; i++) {
      if (slotIndex(i) < start) k = i;
    }
    if (k < 0) return;

    e.preventDefault();
    const next = digits.slice(0, k) + digits.slice(k + 1);
    onChange(next.length ? applyMask(next) : "");
    setCaret(slotIndex(k));
  }

  return (
    <Input
      ref={ref}
      id={id}
      name={name}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      className={className}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
