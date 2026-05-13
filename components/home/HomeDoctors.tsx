import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DOCTORS = [
  {
    slug: "khechoyan-armen-aratovich",
    name: "Хечоян Армен Араратович",
    initials: "ХА",
    role: "Врач-стоматолог-ортопед",
    bio: "Специализация — протезирование зубов: коронки, виниры, мосты, протезы на имплантах. Особо отмечается пациентами в отзывах.",
  },
  {
    slug: "navasardyan-marine-movsesovna",
    name: "Навасардян Марине Мовсесовна",
    initials: "НМ",
    role: "Врач-стоматолог-терапевт",
    bio: "Терапевтическое лечение зубов, эндодонтия под микроскопом, лечение каналов любой сложности.",
  },
];

export function HomeDoctors() {
  return (
    <section className="bg-ivory-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Команда
          </span>
          <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
            Наши врачи
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
            Узкие специалисты с&nbsp;многолетним опытом — каждый ведёт пациента в&nbsp;своей зоне ответственности.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:gap-6">
          {DOCTORS.map((d) => (
            <Link
              key={d.slug}
              href={`/vrachi/${d.slug}/`}
              className="group relative flex items-start gap-5 rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated md:p-7"
            >
              <ArrowUpRight
                className="absolute right-6 top-6 size-5 text-muted-foreground/40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-700"
                aria-hidden="true"
              />
              <div
                aria-hidden="true"
                className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-mint-100 font-display text-2xl font-medium text-brand-800 ring-1 ring-brand-100/60"
              >
                {d.initials}
              </div>
              <div className="min-w-0 pr-6">
                <h3 className="font-display text-xl font-medium leading-snug text-ink-900">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-700">{d.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {d.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
