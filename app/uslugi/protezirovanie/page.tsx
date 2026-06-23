import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "protezirovanie";
const TITLE = "Протезирование зубов";
const PRICE_FROM = 20000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽ за коронку`,
  description:
    "Протезирование зубов в Сочи: коронки, виниры, мосты, съёмные и бюгельные протезы. Своя зуботехническая база — сроки от 5 до 10 дней. Гарантия до 5 лет.",
  path: `/uslugi/${SLUG}/`,
  ogImage: "/images/og/protezirovanie.jpg",
});

const FAQ_ITEMS = [
  {
    question: "Чем отличаются коронки металлокерамика, цирконий, E.max?",
    answer:
      "Металлокерамика — самая бюджетная (от 12 000 ₽), но со временем у дёсен может быть виден тёмный край металла. Цирконий — прочный и эстетичный, без металла, не темнеет (от 20 000 ₽). E.max — стеклокерамика премиум-класса, идеальна для передних зубов из-за светопроницаемости (от 25 000 ₽).",
  },
  {
    question: "Сколько служит протез?",
    answer:
      "Циркониевые и E.max коронки служат 15–20 лет, металлокерамика — 8–10 лет, съёмные протезы — 5–7 лет. Срок зависит от ухода и состояния опорных зубов.",
  },
  {
    question: "Что лучше — мост или имплант?",
    answer:
      "Имплант — долговечнее (служит десятилетиями) и не требует обтачивания соседних зубов. Мост дешевле и быстрее, но требует препарирования двух здоровых зубов под опору. На консультации мы подбираем оптимальное решение.",
  },
  {
    question: "Можно ли получить налоговый вычет?",
    answer:
      "Да. Протезирование относится к медицинским услугам, по ним можно вернуть 13% от стоимости. Мы предоставляем все необходимые документы: договор, чеки, справку для налоговой.",
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
    "Протезирование зубов: коронки металлокерамика, цирконий, E.max, виниры, мосты, съёмные и бюгельные протезы. Собственная зуботехническая база.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function ProtezirovaniePage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: TITLE, href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Ортопедия · Протезирование
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Протезирование восстанавливает форму, функцию и&nbsp;эстетику зубов.
            У&nbsp;нас собственный зубной техник — поэтому коронки и&nbsp;протезы
            готовятся за&nbsp;5–10 дней без посредников.
          </p>

          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 px-5 py-3.5 ring-1 ring-brand-100/60 shadow-soft">
            <span className="text-sm text-muted-foreground">Цена:</span>
            <span className="font-display text-2xl font-medium text-ink-900">
              от&nbsp;{PRICE_FROM.toLocaleString("ru-RU")}&nbsp;₽
            </span>
            <span className="text-sm text-muted-foreground">за коронку</span>
          </div>

          <div className="mt-6">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на консультацию
              <ArrowRight className="ml-1 hidden size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1 xs:inline-block" />
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Что мы делаем</h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {[
            "Коронки — металлокерамика, цирконий, E.max",
            "Виниры E.max и композитные",
            "Мосты на 2–3 единицы",
            "Съёмные и бюгельные протезы",
            "Протезы на имплантах (all-on-4 / all-on-6)",
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft">
              <span aria-hidden="true" className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] text-ink-700">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Консультация и план лечения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография, согласование вида протеза, материала, цвета
              и формы.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">2. Препарирование и снятие слепков</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подготавливаем зубы под протез, снимаем слепки. На время изготовления
              ставится временная конструкция.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              3. Изготовление в нашей лаборатории
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Срок — 5–10 дней. Наш техник работает напрямую с клиникой, без
              посредников и пересылок.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">4. Примерка и фиксация</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Примерка, корректировка по форме и цвету при необходимости,
              окончательная фиксация на стоматологический цемент.
            </p>
          </li>
        </ol>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Виды протезирования</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Link
            href="/uslugi/protezirovanie/koronki-cirkoniy/"
            className="group relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated"
          >
            <h3 className="font-display text-xl font-medium leading-snug text-ink-900">Циркониевые коронки</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Прочные, биосовместимые, без металла. Срок службы 15–20&nbsp;лет.
            </p>
            <p className="mt-4 font-display text-xl font-medium text-brand-700">от&nbsp;20 000&nbsp;₽</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-700">
              Подробнее →
            </span>
          </Link>
          <Link
            href="/uslugi/protezirovanie/viniry/"
            className="group relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated"
          >
            <h3 className="font-display text-xl font-medium leading-snug text-ink-900">Виниры E.max</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Тонкие керамические накладки для голливудской улыбки. Не&nbsp;темнеют.
            </p>
            <p className="mt-4 font-display text-xl font-medium text-brand-700">от&nbsp;25 000&nbsp;₽</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-700">
              Подробнее →
            </span>
          </Link>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Цены</h2>
        <div className="mt-7 overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/5 shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-gradient-to-br from-brand-50/80 to-mint-50/80">
                <tr>
                  <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Услуга</th>
                  <th className="p-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Цена</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ["Циркониевая коронка", "20 000–22 000 ₽"],
                  ["Металлокерамическая коронка", "12 000 ₽"],
                  ["Коронка E.max", "25 000 ₽"],
                  ["Винир E.max", "25 000 ₽"],
                  ["Мост (за единицу)", "от 12 000 ₽"],
                  ["Съёмный протез", "от 25 000 ₽"],
                ] as const).map(([label, price], i) => (
                  <tr key={label} className={i > 0 ? "border-t border-foreground/5" : ""}>
                    <td className="p-4 text-[15px] text-ink-700">{label}</td>
                    <td className="p-4 text-right font-display text-lg font-medium text-ink-900">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section>
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe">
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:gap-12 md:p-12">
              <div>
                <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">Запись</span>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
                  Записаться на консультацию
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  На&nbsp;консультации подберём конструкцию и&nbsp;материал.
                  Помогаем с&nbsp;рассрочкой и&nbsp;налоговым вычетом.
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
