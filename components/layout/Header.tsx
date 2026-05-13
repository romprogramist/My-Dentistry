import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";
import { MobileNav } from "./MobileNav";

const NAV = [
  { href: "/uslugi/", label: "Услуги" },
  { href: "/vrachi/", label: "Врачи" },
  { href: "/o-klinike/", label: "О клинике" },
  { href: "/blog/", label: "Блог" },
  { href: "/kontakty/", label: "Контакты" },
] as const;

export function Header() {
  const primaryPhone = CLINIC.phones[0];
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/5 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:h-[72px]">
        <Link href="/" className="group flex items-center gap-3 leading-tight">
          <span
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-mint-700 font-display text-base font-medium text-white shadow-[0_6px_16px_rgba(8,145,178,0.30)] transition-transform duration-300 group-hover:scale-105 md:size-10"
          >
            MS
          </span>
          <span className="flex flex-col">
            <span className="font-display text-lg font-medium leading-tight text-ink-900 md:text-xl">
              Моя Стоматология
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:text-xs">
              Сочи · Донская 52
            </span>
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors duration-200 hover:text-brand-700 hover:bg-brand-50/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {primaryPhone ? (
            <>
              <a
                href={`tel:${primaryPhone.tel}`}
                className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 md:flex"
              >
                <Phone className="size-4" aria-hidden="true" />
                {primaryPhone.display}
              </a>
              <a
                href={`tel:${primaryPhone.tel}`}
                aria-label={`Позвонить ${primaryPhone.display}`}
                className="touch-target rounded-full text-brand-700 hover:bg-brand-50 md:hidden"
              >
                <Phone className="size-5" />
              </a>
            </>
          ) : null}
          <div className="hidden md:block">
            <Link href="/zapis/" className={buttonVariants()}>
              Записаться
              <ArrowRight className="ml-1 size-4 transition-transform duration-300 ease-out group-hover/button:translate-x-1" />
            </Link>
          </div>
          <MobileNav nav={NAV} />
        </div>
      </div>
    </header>
  );
}
