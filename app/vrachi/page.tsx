import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Наши врачи",
  description:
    "Команда стоматологии «Моя Стоматология» в Сочи: ортопед, терапевт. Опытные врачи с многолетним стажем и отзывами пациентов.",
  path: "/vrachi/",
});

const DOCTORS = [
  {
    slug: "khechoyan-armen-aratovich",
    name: "Хечоян Армен Араратович",
    initials: "ХА",
    role: "Врач-стоматолог-ортопед",
    bio: "Протезирование зубов: коронки, виниры, мосты, протезы на имплантах.",
  },
  {
    slug: "navasardyan-marine-movsesovna",
    name: "Навасардян Марине Мовсесовна",
    initials: "НМ",
    role: "Врач-стоматолог-терапевт",
    bio: "Терапия, эндодонтия под микроскопом, лечение каналов любой сложности.",
  },
];

export default function DoctorsIndex() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Врачи", href: "/vrachi/" }]} />
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Команда
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Наши врачи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Узкие специалисты с&nbsp;многолетним опытом — ортопед и&nbsp;терапевт.
            Каждый ведёт пациента в&nbsp;своей зоне ответственности.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {DOCTORS.map((d) => (
            <Link
              key={d.slug}
              href={`/vrachi/${d.slug}/`}
              className="group relative flex items-start gap-5 rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated md:p-7"
            >
              <ArrowUpRight
                className="absolute right-6 top-6 size-5 text-muted-foreground/30 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-700"
                aria-hidden="true"
              />
              <div
                aria-hidden="true"
                className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-mint-100 font-display text-3xl font-medium text-brand-800 ring-1 ring-brand-100/60"
              >
                {d.initials}
              </div>
              <div className="min-w-0 pr-6">
                <h2 className="font-display text-2xl font-medium leading-snug text-ink-900">
                  {d.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-brand-700">{d.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {d.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
