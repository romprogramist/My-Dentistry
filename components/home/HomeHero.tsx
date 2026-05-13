import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

export function HomeHero() {
  const yearsActive = new Date().getFullYear() - CLINIC.founded;
  return (
    <section className="relative overflow-hidden bg-aurora-soft py-16 md:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-brand-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-mint-100/40 blur-3xl"
      />

      <div className="container relative mx-auto grid items-center gap-12 px-4 md:grid-cols-[1.05fr_1fr] md:gap-14 lg:gap-20">
        <div className="order-2 md:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/70 bg-white/70 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand-700 shadow-soft backdrop-blur">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Сочи · с {CLINIC.founded} года
          </span>

          <h1 className="mt-5 font-display text-balance text-[2.4rem] font-medium leading-[1.05] text-ink-900 xs:text-5xl md:text-[3.6rem] lg:text-[4rem]">
            Стоматология,
            <br />
            к&nbsp;которой&nbsp;возвращаются.
          </h1>

          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground xs:text-lg md:text-xl">
            Безболезненное лечение, протезирование и&nbsp;имплантация в&nbsp;центре
            Сочи. Своя зуботехническая база — коронки за&nbsp;5–10 дней.
            Гарантия до&nbsp;5&nbsp;лет.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 font-medium text-ink-900 shadow-soft ring-1 ring-foreground/5 backdrop-blur">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>
                <strong className="font-semibold">{CLINIC.ratings.twogis.score}</strong>
                <span className="text-muted-foreground"> · 2ГИС · {CLINIC.ratings.twogis.count}</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 font-medium text-ink-900 shadow-soft ring-1 ring-foreground/5 backdrop-blur">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>
                <strong className="font-semibold">{CLINIC.ratings.yandex.score}</strong>
                <span className="text-muted-foreground"> · Яндекс · {CLINIC.ratings.yandex.count}</span>
              </span>
            </span>
          </div>

          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на приём
              <ArrowRight className="ml-1 size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1" />
            </Link>
            <Link
              href="/uslugi/"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Услуги и цены
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-foreground/10 pt-6 text-left">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Лет на рынке</dt>
              <dd className="mt-1 font-display text-2xl font-medium text-ink-900 md:text-3xl">{yearsActive}+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Гарантия</dt>
              <dd className="mt-1 font-display text-2xl font-medium text-ink-900 md:text-3xl">5 лет</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Полный цикл</dt>
              <dd className="mt-1 font-display text-2xl font-medium text-ink-900 md:text-3xl">10+ услуг</dd>
            </div>
          </dl>
        </div>

        <div className="relative order-1 md:order-2">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-brand-100/60 via-transparent to-mint-100/60 blur-2xl"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-slate-200 ring-luxe md:aspect-[5/6]">
            <Image
              src="/media/clinic/reception-detail.webp"
              alt="Приёмная клиники «Моя Стоматология» — Сочи, Донская 52"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/30 via-ink-900/5 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
