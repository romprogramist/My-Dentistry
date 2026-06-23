import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SERVICE_CATEGORIES } from "@/lib/constants/services";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Услуги и цены",
  description:
    "Полный прайс на услуги стоматологии в Сочи: лечение, протезирование, имплантация, хирургия. Цены от 4 000 ₽.",
  path: "/uslugi/",
  ogImage: "/images/og/uslugi.jpg",
});

export default function ServicesIndex() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Услуги", href: "/uslugi/" }]} />
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Прайс
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Стоматология полного цикла
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Терапия, хирургия, ортопедия, имплантация — всё в&nbsp;одной клинике.
            Гарантия от&nbsp;1&nbsp;до&nbsp;5&nbsp;лет. Прозрачные цены и&nbsp;помощь
            с&nbsp;налоговым вычетом 13%.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {SERVICE_CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/uslugi/${cat.slug}/`}
              className="group relative flex flex-col rounded-2xl bg-white p-6 text-brand-700 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated md:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-6 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-ink-900 px-2 font-display text-xs font-medium text-white"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <ArrowUpRight
                className="absolute right-6 top-6 size-5 text-muted-foreground/30 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-700"
                aria-hidden="true"
              />
              <h2 className="pr-8 font-display text-xl font-medium leading-snug text-ink-900">
                {cat.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
              <span className="mt-5 text-sm font-semibold text-brand-700">
                Подробнее →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
