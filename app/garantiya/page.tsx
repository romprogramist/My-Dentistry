import { ShieldCheck, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Гарантия 1–5 лет",
  description:
    "Гарантия от 1 года до 5 лет на разные типы работ. Сервисное наблюдение и переделка при необходимости.",
  path: "/garantiya/",
});

const TABLE = [
  { type: "Терапевтическое лечение, пломбы", years: "1 год" },
  { type: "Металлокерамические коронки", years: "2 года" },
  { type: "Циркониевые коронки, E.max", years: "3 года" },
  { type: "Виниры", years: "3 года" },
  { type: "Имплантация (имплант + установка)", years: "5 лет" },
];

const INCLUDED = [
  "Бесплатная переделка при дефекте, не зависящем от пациента",
  "Бесплатные осмотры в течение всего срока гарантии",
  "Ведение электронной карты пациента — все работы зафиксированы",
];

const EXCLUDED = [
  "Несоблюдение рекомендаций по уходу (нерегулярная гигиена, пропуск осмотров)",
  "Травма зубов",
  "Изменения в общем состоянии здоровья, влияющие на полость рта",
  "Самостоятельные манипуляции пациента или вмешательство сторонних специалистов",
];

export default function GarantiyaPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Гарантия", href: "/garantiya/" }]} />
      <article className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> Гарантия
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            От&nbsp;1&nbsp;до&nbsp;5&nbsp;лет на&nbsp;все виды работ
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Мы предоставляем официальную гарантию на&nbsp;каждый тип работ.
            Срок зависит от&nbsp;материала и&nbsp;сложности — указан
            в&nbsp;договоре. В&nbsp;период гарантии переделываем работу бесплатно
            при условии соблюдения рекомендаций по&nbsp;уходу.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/5 shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-gradient-to-br from-brand-50/80 to-mint-50/80">
                <tr>
                  <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Тип работ</th>
                  <th className="p-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Гарантия</th>
                </tr>
              </thead>
              <tbody>
                {TABLE.map((row, i) => (
                  <tr key={row.type} className={i > 0 ? "border-t border-foreground/5" : ""}>
                    <td className="p-4 text-[15px] text-ink-700">{row.type}</td>
                    <td className="p-4 text-right font-display text-lg font-medium text-ink-900">{row.years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Что входит в&nbsp;гарантию
          </h2>
          <ul className="mt-7 space-y-3">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
                >
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-[15px] text-ink-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Когда гарантия не&nbsp;действует
          </h2>
          <ul className="mt-7 space-y-3 text-[15px] text-muted-foreground">
            {EXCLUDED.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-white/50 p-4 ring-1 ring-foreground/5">
                <span aria-hidden="true" className="mt-2 inline-block size-1.5 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
