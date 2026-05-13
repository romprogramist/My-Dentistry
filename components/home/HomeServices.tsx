import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { FEATURED_SERVICES, type Service } from "@/lib/constants/services";

function priceLabel(s: Service): string {
  if (s.priceTo)
    return `${s.priceFrom.toLocaleString("ru-RU")}–${s.priceTo.toLocaleString("ru-RU")} ₽`;
  return `от ${s.priceFrom.toLocaleString("ru-RU")} ₽`;
}

export function HomeServices() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 100% 0%, rgba(6,182,212,0.18) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(56,189,248,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="container relative mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-200">
              Услуги
            </span>
            <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight md:text-4xl lg:text-[2.7rem]">
              Ключевые направления
            </h2>
            <p className="mt-3 text-pretty text-[15px] text-white/70 md:text-base">
              Терапия, эндодонтия, имплантация, ортопедия — всё в одной клинике, без отправки «по другим адресам».
            </p>
          </div>
          <Link
            href="/uslugi/"
            className={`${buttonVariants({ variant: "ghost" })} text-white hover:bg-white/10 hover:text-white`}
          >
            Все услуги
            <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FEATURED_SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/uslugi/${s.slug}/`}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-mint-200/40 hover:bg-white/[0.08] md:p-6"
            >
              <ArrowUpRight
                className="absolute right-5 top-5 size-5 text-white/40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mint-200"
                aria-hidden="true"
              />
              <h3 className="pr-8 font-display text-xl font-medium leading-snug text-white">
                {s.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/60">
                {s.description}
              </p>
              <div className="mt-auto pt-5">
                <span className="text-xs uppercase tracking-wider text-white/40">Цена</span>
                <div className="mt-0.5 font-display text-xl font-medium text-mint-100">
                  {priceLabel(s)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/uslugi/" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Все услуги и цены
            <ArrowRight className="ml-1 size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
