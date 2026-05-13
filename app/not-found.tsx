import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

export default function NotFound() {
  const primaryPhone = CLINIC.phones[0];
  return (
    <div className="bg-ivory-gradient">
      <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center md:py-28">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
          Ошибка
        </span>
        <p className="mt-4 font-display text-[8rem] font-medium leading-none text-ink-900 md:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
          Страница не&nbsp;найдена
        </h1>
        <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Возможно, вы&nbsp;перешли по&nbsp;неактуальной ссылке. Воспользуйтесь
          меню или вернитесь на&nbsp;главную.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            На главную
            <ArrowRight className="ml-1 size-5 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
          {primaryPhone && (
            <a
              href={`tel:${primaryPhone.tel}`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <Phone className="size-4" aria-hidden="true" />
              {primaryPhone.display}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
