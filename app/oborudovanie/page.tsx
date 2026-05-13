import Link from "next/link";
import { ArrowRight, Microscope, ShieldCheck, Syringe } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Оборудование клиники",
  description:
    "Дентальный микроскоп для эндодонтии, оборудование для стерилизации и безопасного лечения.",
  path: "/oborudovanie/",
});

const SECTIONS = [
  {
    icon: Microscope,
    title: "Дентальный микроскоп",
    text: "Главный инструмент при лечении корневых каналов. Даёт увеличение до 25× и направленную подсветку — врач видит каждый канал и микротрещину. Это позволяет лечить даже сложные случаи и спасать зубы, которые в других клиниках предлагают удалить.",
    link: { href: "/uslugi/endodontiya-pod-mikroskopom/", label: "Подробнее об эндодонтии под микроскопом" },
  },
  {
    icon: ShieldCheck,
    title: "Стерилизация",
    text: "Все инструменты проходят полный цикл стерилизации: предварительная очистка, ультразвуковая ванна, автоклавирование при +134 °C. Одноразовые материалы (перчатки, шприцы, наконечники для AIR-FLOW) используются строго на одного пациента.",
    link: null,
  },
  {
    icon: Syringe,
    title: "Анестезия",
    text: "Используем современные карпульные анестетики (Ультракаин, Скандонест и аналоги). Подбираем дозу индивидуально с учётом аллергоанамнеза и состояния пациента.",
    link: null,
  },
];

export default function OborudovaniePage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Оборудование", href: "/oborudovanie/" }]} />
      <article className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Технологии
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Оборудование клиники
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Инструменты, которые позволяют нам работать точнее, быстрее
            и&nbsp;безопаснее.
          </p>
        </div>

        <div className="mt-12 grid gap-5">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-mint-50 ring-1 ring-brand-100/60">
                  <s.icon className="size-6 text-brand-700" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-700 md:text-base">
                    {s.text}
                  </p>
                  {s.link && (
                    <Link
                      href={s.link.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
                    >
                      {s.link.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 p-8 ring-1 ring-foreground/5 shadow-luxe md:p-12">
          <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
            Хотите увидеть клинику лично?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Запишитесь на&nbsp;бесплатный осмотр-консультацию.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants({ size: "lg" })} mt-6`}
          >
            Записаться на осмотр
            <ArrowRight className="ml-1 size-5 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </section>
      </article>
    </div>
  );
}
