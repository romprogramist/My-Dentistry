import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { ArrowRight } from "lucide-react";

const SLUG = "professionalnaya-gigiena";
const TITLE = "Профессиональная гигиена полости рта";
const PRICE_FROM = 5000;
const PRICE_TO = 7000;

export const metadata = createPageMetadata({
  title: `Профгигиена в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽`,
  description:
    "Профгигиена в Сочи — 5 000-7 000 ₽. Ультразвук + AIR-FLOW + полировка. Безопасно для эмали. Раз в 6 месяцев — для здоровья зубов и дёсен.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Это больно?",
    answer:
      "В большинстве случаев нет — процедура проходит комфортно. При повышенной чувствительности или большом количестве зубного камня можно сделать аппликационную анестезию.",
  },
  {
    question: "Как часто нужно делать?",
    answer:
      "Раз в 6 месяцев — стандартная рекомендация. При наличии брекетов, имплантов или склонности к образованию камня — раз в 3–4 месяца.",
  },
  {
    question: "Безопасно ли для эмали?",
    answer:
      "Да. Ультразвуковая чистка и AIR-FLOW не повреждают эмаль — наоборот, удаляют налёт, который её разрушает. После процедуры мы проводим фторирование для укрепления эмали.",
  },
  {
    question: "Можно ли отбелить зубы профгигиеной?",
    answer:
      "Профгигиена возвращает зубам естественный цвет, удаляя налёт от чая, кофе, сигарет — обычно зубы становятся на 1–2 тона светлее. Для более выраженного отбеливания нужны отдельные процедуры (ZOOM, Opalescence).",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: TITLE,
  provider: {
    "@type": "Dentist",
    name: CLINIC.name,
    "@id": `${CLINIC.domain}/#clinic`,
  },
  areaServed: { "@type": "City", name: "Сочи" },
  description:
    "Профессиональная гигиена полости рта: ультразвук, AIR-FLOW, полировка, фторирование. Раз в 6 месяцев.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function ProfgigienaPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Профгигиена", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Гигиена · Профилактика
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Даже идеальная домашняя чистка не&nbsp;удаляет зубной камень
            и&nbsp;налёт в&nbsp;труднодоступных местах. Профгигиена раз в&nbsp;6
            месяцев — основа здоровья зубов и&nbsp;дёсен.
          </p>

          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 px-5 py-3.5 ring-1 ring-brand-100/60 shadow-soft">
            <span className="text-sm text-muted-foreground">Цена:</span>
            <span className="font-display text-2xl font-medium text-ink-900">
              {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")}&nbsp;₽
            </span>
            <span className="text-sm text-muted-foreground">комплексно</span>
          </div>

          <div className="mt-6">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на консультацию
              <ArrowRight className="ml-1 hidden size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1 xs:inline-block" />
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Что включает профгигиена</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Ультразвуковое снятие зубного камня</li>
          <li>✓ AIR-FLOW — полировка содой и водой под давлением</li>
          <li>✓ Удаление налёта от чая, кофе, сигарет</li>
          <li>✓ Полировка щёточками и пастой</li>
          <li>✓ Фторирование эмали</li>
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы процедуры</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Осмотр и диагностика</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Оценка состояния зубов и дёсен, определение объёма работы.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">2. Ультразвуковая чистка</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаление зубного камня над и под десной с помощью ультразвукового
              скейлера.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">3. AIR-FLOW</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаление мягкого налёта и пигментации потоком воды с содой —
              эффективно и безопасно для эмали.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">4. Полировка и фторирование</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Полировка щёточками с пастой для гладкости поверхности,
              фторирование для укрепления эмали.
            </p>
          </li>
        </ol>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Цены</h2>
        <Card className="mt-4 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Услуга</th>
                <th className="p-3 text-right">Цена</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">
                  Комплексная гигиена (ультразвук + AIR-FLOW + полировка)
                </td>
                <td className="p-3 text-right font-semibold">5 000–7 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Только ультразвук</td>
                <td className="p-3 text-right font-semibold">3 500 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Только AIR-FLOW</td>
                <td className="p-3 text-right font-semibold">3 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Глубокое фторирование</td>
                <td className="p-3 text-right font-semibold">1 500 ₽</td>
              </tr>
            </tbody>
            </table>
          </div>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section>
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe">
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:gap-12 md:p-12">
              <div>
                <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">Запись</span>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
                  Записаться на профгигиену
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Раз в&nbsp;6&nbsp;месяцев — оптимальный интервал. Запишитесь заранее.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-elevated md:p-8">
                <BookingForm servicePreselected={SLUG} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </div>
  );
}
