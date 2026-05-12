import Link from "next/link";
import { Phone } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-brand-700">
            Моя Стоматология
          </span>
          <span className="text-xs text-muted-foreground">
            Сочи · Донская 52
          </span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-brand-600"
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
                className="hidden items-center gap-2 text-sm font-semibold text-brand-700 md:flex"
              >
                <Phone className="h-4 w-4" />
                {primaryPhone.display}
              </a>
              <a
                href={`tel:${primaryPhone.tel}`}
                aria-label={`Позвонить ${primaryPhone.display}`}
                className="touch-target text-brand-700 md:hidden"
              >
                <Phone className="h-5 w-5" />
              </a>
            </>
          ) : null}
          <div className="hidden md:block">
            <Link href="/zapis/" className={buttonVariants({ size: "sm" })}>
              Записаться
            </Link>
          </div>
          <MobileNav nav={NAV} />
        </div>
      </div>
    </header>
  );
}
