import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: TITLE, href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Протезирование восстанавливает форму, функцию и эстетику зубов. У нас
          собственный зубной техник — поэтому коронки и протезы готовятся за
          5–10 дней без посредников.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            от {PRICE_FROM.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">за коронку</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Что мы делаем</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Коронки — металлокерамика, цирконий, E.max</li>
          <li>✓ Виниры E.max и композитные</li>
          <li>✓ Мосты на 2–3 единицы</li>
          <li>✓ Съёмные и бюгельные протезы</li>
          <li>✓ Протезы на имплантах (all-on-4 / all-on-6)</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Консультация и план лечения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография, согласование вида протеза, материала, цвета
              и формы.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Препарирование и снятие слепков</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подготавливаем зубы под протез, снимаем слепки. На время изготовления
              ставится временная конструкция.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              3. Изготовление в нашей лаборатории
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Срок — 5–10 дней. Наш техник работает напрямую с клиникой, без
              посредников и пересылок.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Примерка и фиксация</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Примерка, корректировка по форме и цвету при необходимости,
              окончательная фиксация на стоматологический цемент.
            </p>
          </li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold">Виды протезирования</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card className="p-5 transition-shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Циркониевые коронки</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Прочные, биосовместимые, без металла. Срок службы 15–20 лет.
            </p>
            <p className="mt-2 font-semibold text-brand-700">от 20 000 ₽</p>
            <Link
              href="/uslugi/protezirovanie/koronki-cirkoniy/"
              className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
            >
              Подробнее →
            </Link>
          </Card>
          <Card className="p-5 transition-shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Виниры E.max</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Тонкие керамические накладки для голливудской улыбки. Не темнеют.
            </p>
            <p className="mt-2 font-semibold text-brand-700">от 25 000 ₽</p>
            <Link
              href="/uslugi/protezirovanie/viniry/"
              className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
            >
              Подробнее →
            </Link>
          </Card>
        </div>

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
                <td className="p-3">Циркониевая коронка</td>
                <td className="p-3 text-right font-semibold">
                  20 000–22 000 ₽
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Металлокерамическая коронка</td>
                <td className="p-3 text-right font-semibold">12 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Коронка E.max</td>
                <td className="p-3 text-right font-semibold">25 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Винир E.max</td>
                <td className="p-3 text-right font-semibold">25 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Мост (за единицу)</td>
                <td className="p-3 text-right font-semibold">от 12 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Съёмный протез</td>
                <td className="p-3 text-right font-semibold">от 25 000 ₽</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на консультацию</h2>
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
