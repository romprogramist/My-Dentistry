"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
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
        <nav className="mt-8 flex flex-col gap-4 px-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
