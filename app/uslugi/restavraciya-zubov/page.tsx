import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
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
  ogImage: "/images/og/restavraciya-zubov.jpg",
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
            Эстетика · Реставрация
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Художественная реставрация — это создание формы зуба прямо
            во&nbsp;рту, без снятия слепков. За&nbsp;один визит мы восстанавливаем
            сколы, изменяем форму, закрываем щели между зубами.
          </p>

          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 px-5 py-3.5 ring-1 ring-brand-100/60 shadow-soft">
            <span className="text-sm text-muted-foreground">Цена:</span>
            <span className="font-display text-2xl font-medium text-ink-900">
              {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")}&nbsp;₽
            </span>
            <span className="text-sm text-muted-foreground">за зуб</span>
          </div>

          <div className="mt-6">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на консультацию
              <ArrowRight className="ml-1 hidden size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1 xs:inline-block" />
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Когда показана реставрация</h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {[
            "Сколы и трещины",
            "Кариес",
            "Изменение цвета (потемнение)",
            "Неровные края зубов",
            "Щели между зубами (диастемы, тремы)",
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft">
              <span aria-hidden="true" className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] text-ink-700">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы реставрации</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современная анестезия — процедура безболезненная.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">2. Препарирование (минимальное)</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаляем только разрушенные ткани, максимально сохраняя здоровый
              зуб.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              3. Послойная реставрация композитом
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Послойное нанесение композита разных оттенков и прозрачности —
              врач воссоздаёт естественный вид зуба.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">4. Шлифовка и полировка</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Восстановление анатомической формы, проверка прикуса, финишная
              полировка до зеркального блеска.
            </p>
          </li>
        </ol>

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
                  ["Реставрация скола", "4 000–6 000 ₽"],
                  ["Полная реставрация коронки зуба", "8 000–12 000 ₽"],
                  ["Закрытие диастемы (1 зуб)", "6 000 ₽"],
                  ["Художественная реставрация переднего зуба", "8 000 ₽"],
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
                  Записаться на реставрацию
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Покажите фото зуба — мы&nbsp;ориентировочно оценим сложность.
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
