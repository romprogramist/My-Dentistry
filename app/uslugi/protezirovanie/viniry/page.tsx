import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { ArrowRight } from "lucide-react";

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
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Протезирование", href: "/uslugi/protezirovanie/" },
          { name: "Виниры", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Ортопедия · Виниры
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Виниры E.max — тонкие керамические накладки на&nbsp;переднюю
            поверхность зуба. Скрывают сколы, потемнения, неровности. Идеальны
            для коррекции улыбки.
          </p>

          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 px-5 py-3.5 ring-1 ring-brand-100/60 shadow-soft">
            <span className="text-sm text-muted-foreground">Цена:</span>
            <span className="font-display text-2xl font-medium text-ink-900">
              {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")}&nbsp;₽
            </span>
            <span className="text-sm text-muted-foreground">за единицу</span>
          </div>

          <div className="mt-6">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на консультацию
              <ArrowRight className="ml-1 hidden size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1 xs:inline-block" />
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Когда показаны виниры</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Потемнения после депульпирования</li>
          <li>✓ Сколы и трещины</li>
          <li>✓ Диастемы (промежутки между зубами)</li>
          <li>✓ Неровные передние зубы</li>
          <li>✓ Стёртая эмаль</li>
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы установки</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Консультация и фотопротокол</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, обсуждение пожеланий, фото улыбки, согласование формы и
              цвета будущих виниров.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              2. Минимальное препарирование (0,3–0,5 мм)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Снимаем тончайший слой эмали с передней поверхности зуба, делаем
              слепки.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">3. Изготовление виниров (10 дней)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Виниры готовит наш техник в собственной лаборатории. На время
              изготовления — временные накладки.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">4. Фиксация на специальный цемент</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Примерка, корректировка по цвету и форме, фиксация на адгезивный
              цемент со световой полимеризацией.
            </p>
          </li>
        </ol>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Цены</h2>
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

      <section>
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe">
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:gap-12 md:p-12">
              <div>
                <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">Запись</span>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
                  Записаться на&nbsp;установку виниров
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Покажем как будет выглядеть улыбка ещё до&nbsp;начала работы
                  — на&nbsp;пробных моделях.
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
