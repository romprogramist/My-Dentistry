"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

type NavItem = { href: string; label: string };

export function MobileNav({ nav }: { nav: readonly NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Меню"
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "md:hidden",
        })}
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <SheetTitle className="sr-only">Меню навигации</SheetTitle>
        <nav className="mt-8 flex flex-col gap-1 px-4">
          {nav.map((item) => (
            <SheetClose
              key={item.href}
              render={
                <Link
                  href={item.href}
                  className="touch-target justify-start text-base font-medium hover:text-brand-600"
                />
              }
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
        {CLINIC.phones[0] ? (
          <a
            href={`tel:${CLINIC.phones[0].tel}`}
            className="mx-4 mt-6 touch-target justify-start gap-2 rounded-md border px-3 text-sm font-semibold text-brand-700"
          >
            <Phone className="h-4 w-4" />
            {CLINIC.phones[0].display}
          </a>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
