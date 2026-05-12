import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "restavraciya-zubov";
const TITLE = "Реставрация зубов";
const PRICE_FROM = 4000;
const PRICE_TO = 12000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽`,
  description:
    "Прямая художественная реставрация зубов в Сочи — 4 000-12 000 ₽. Восстанавливаем форму, цвет и функцию зуба за один визит. Композитные материалы.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Чем реставрация отличается от пломбы?",
    answer:
      "Пломба восстанавливает только утраченные ткани после кариеса. Реставрация — это художественное воссоздание формы, цвета и прозрачности зуба, в том числе при сколах, потемнениях или для эстетики (например, закрытие диастемы).",
  },
  {
    question: "Сколько служит реставрация?",
    answer:
      "Качественная реставрация на передних зубах служит 5–7 лет, на жевательных — 7–10 лет. Раз в 6 месяцев на профосмотре мы проверяем краевое прилегание и при необходимости полируем.",
  },
  {
    question: "Когда лучше винир чем реставрация?",
    answer:
      "Если нужно изменить цвет или форму нескольких передних зубов — винир E.max выглядит эстетичнее и служит 15–20 лет. Реставрация подходит для одиночных сколов или если нужен быстрый и более бюджетный результат за один визит.",
  },
  {
    question: "Меняет ли реставрация цвет со временем?",
    answer:
      "Композит со временем может слегка потемнеть от чая, кофе и сигарет — обычно это заметно через 4–5 лет. Профгигиена с полировкой возвращает изначальный цвет.",
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
    "Прямая художественная реставрация зубов композитными материалами: восстановление формы, цвета и функции за один визит.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function RestavraciyaZubovPage() {
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
          Художественная реставрация — это создание формы зуба прямо во рту, без
          снятия слепков. За один визит мы восстанавливаем сколы, изменяем
          форму, закрываем щели между зубами.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">за зуб</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Когда показана реставрация</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Сколы и трещины</li>
          <li>✓ Кариес</li>
          <li>✓ Изменение цвета (потемнение)</li>
          <li>✓ Неровные края зубов</li>
          <li>✓ Щели между зубами (диастемы, тремы)</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы реставрации</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современная анестезия — процедура безболезненная.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Препарирование (минимальное)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаляем только разрушенные ткани, максимально сохраняя здоровый
              зуб.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              3. Послойная реставрация композитом
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Послойное нанесение композита разных оттенков и прозрачности —
              врач воссоздаёт естественный вид зуба.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Шлифовка и полировка</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Восстановление анатомической формы, проверка прикуса, финишная
              полировка до зеркального блеска.
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
                <td className="p-3">Реставрация скола</td>
                <td className="p-3 text-right font-semibold">4 000–6 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Полная реставрация коронки зуба</td>
                <td className="p-3 text-right font-semibold">
                  8 000–12 000 ₽
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Закрытие диастемы (1 зуб)</td>
                <td className="p-3 text-right font-semibold">6 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">
                  Художественная реставрация переднего зуба
                </td>
                <td className="p-3 text-right font-semibold">8 000 ₽</td>
              </tr>
            </tbody>
            </table>
          </div>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на реставрацию</h2>
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
