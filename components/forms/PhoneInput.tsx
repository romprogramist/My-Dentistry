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
