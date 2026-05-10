import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "protezirovanie/viniry";
const TITLE = "Виниры E.max";
const PRICE_FROM = 25000;
const PRICE_TO = 30000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽ за единицу`,
  description:
    "Виниры E.max в Сочи — цена от 25 000 ₽ за единицу. Голливудская улыбка за 10 дней. Тонкие керамические накладки, не темнеют со временем. Срок службы 15-20 лет.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Чем виниры отличаются от коронок?",
    answer:
      "Винир покрывает только переднюю поверхность зуба (толщина 0,3–0,5 мм), коронка — весь зуб. Виниры применяют для эстетики, когда зуб в целом здоров. Коронки — когда зуб сильно разрушен.",
  },
  {
    question: "Сколько зубов нужно покрывать?",
    answer:
      "Зависит от линии улыбки. Чаще всего покрывают 6–10 верхних передних зубов, чтобы добиться гармоничного результата. На консультации мы подбираем оптимальное количество по фотопротоколу.",
  },
  {
    question: "Сколько служат виниры?",
    answer:
      "Виниры E.max при правильном уходе служат 15–20 лет. Композитные виниры — 5–7 лет.",
  },
  {
    question: "Не желтеют ли они со временем?",
    answer:
      "Нет. Керамика E.max не впитывает пигменты от чая, кофе и сигарет — цвет остаётся стабильным весь срок службы.",
  },
  {
    question: "Можно ли снять виниры?",
    answer:
      "Виниры устанавливаются с минимальным препарированием эмали (0,3–0,5 мм), поэтому снять без замены нельзя — но эту процедуру делают редко, обычно только при замене на новые.",
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
    "Установка виниров E.max — тонких керамических накладок на передние зубы. Срок изготовления 10 дней. Срок службы 15–20 лет.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function ViniryPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Протезирование", href: "/uslugi/protezirovanie/" },
          { name: "Виниры", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Виниры E.max — тонкие керамические накладки на переднюю поверхность
          зуба. Скрывают сколы, потемнения, неровности. Идеальны для коррекции
          улыбки.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">за единицу</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Когда показаны виниры</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Потемнения после депульпирования</li>
          <li>✓ Сколы и трещины</li>
          <li>✓ Диастемы (промежутки между зубами)</li>
          <li>✓ Неровные передние зубы</li>
          <li>✓ Стёртая эмаль</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы установки</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Консультация и фотопротокол</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, обсуждение пожеланий, фото улыбки, согласование формы и
              цвета будущих виниров.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              2. Минимальное препарирование (0,3–0,5 мм)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Снимаем тончайший слой эмали с передней поверхности зуба, делаем
              слепки.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">3. Изготовление виниров (10 дней)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Виниры готовит наш техник в собственной лаборатории. На время
              изготовления — временные накладки.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Фиксация на специальный цемент</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Примерка, корректировка по цвету и форме, фиксация на адгезивный
              цемент со световой полимеризацией.
            </p>
          </li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold">Цены</h2>
        <Card className="mt-4 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Услуга</th>
                <th className="p-3 text-right">Цена</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Винир E.max</td>
                <td className="p-3 text-right font-semibold">
                  25 000–30 000 ₽
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Композитный винир</td>
                <td className="p-3 text-right font-semibold">8 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Подготовка / пробные модели</td>
                <td className="p-3 text-right font-semibold">2 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Фиксация</td>
                <td className="p-3 text-right font-semibold">2 000 ₽</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на установку виниров</h2>
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
