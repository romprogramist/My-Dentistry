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
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Профгигиена", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Даже идеальная домашняя чистка не удаляет зубной камень и налёт в
          труднодоступных местах. Профгигиена раз в 6 месяцев — основа здоровья
          зубов и дёсен.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">комплексно</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
            <ArrowRight className="ml-1 size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Что включает профгигиена</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Ультразвуковое снятие зубного камня</li>
          <li>✓ AIR-FLOW — полировка содой и водой под давлением</li>
          <li>✓ Удаление налёта от чая, кофе, сигарет</li>
          <li>✓ Полировка щёточками и пастой</li>
          <li>✓ Фторирование эмали</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы процедуры</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Осмотр и диагностика</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Оценка состояния зубов и дёсен, определение объёма работы.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Ультразвуковая чистка</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаление зубного камня над и под десной с помощью ультразвукового
              скейлера.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">3. AIR-FLOW</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаление мягкого налёта и пигментации потоком воды с содой —
              эффективно и безопасно для эмали.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Полировка и фторирование</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Полировка щёточками с пастой для гладкости поверхности,
              фторирование для укрепления эмали.
            </p>
          </li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold">Цены</h2>
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

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на профгигиену</h2>
          <div className="mx-auto mt-6 max-w-md">
            <BookingForm servicePreselected={SLUG} />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </>
  );
}
