import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

export function MobileStickyCTA() {
  const primaryPhone = CLINIC.phones[0];
  return (
    <div
      role="region"
      aria-label="Быстрая запись"
      className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t bg-white p-2 shadow-lg md:hidden"
    >
      {primaryPhone ? (
        <a
          href={`tel:${primaryPhone.tel}`}
          aria-label="Позвонить в клинику"
          className={buttonVariants({ variant: "outline", className: "flex-1 min-h-11" })}
        >
          <Phone className="mr-2 h-4 w-4" />
          Позвонить
        </a>
      ) : null}
      <Link
        href="/zapis/"
        aria-label="Записаться на приём"
        className={buttonVariants({ className: "flex-1 min-h-11" })}
      >
        Записаться
      </Link>
    </div>
  );
}
