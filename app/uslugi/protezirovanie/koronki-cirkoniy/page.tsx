import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "protezirovanie/koronki-cirkoniy";
const TITLE = "Циркониевые коронки";
const PRICE_FROM = 20000;
const PRICE_TO = 22000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽`,
  description:
    "Циркониевые коронки в Сочи. Прочные, эстетичные, биосовместимые. Срок изготовления 5–10 дней благодаря собственной зуботехнической базе. Гарантия 3 года.",
  path: `/uslugi/${SLUG}/`,
  ogImage: "/images/og/koronki-cirkoniy.jpg",
});

const FAQ_ITEMS = [
  {
    question: "Чем циркониевая коронка отличается от металлокерамической?",
    answer:
      "Циркониевая коронка не имеет металлического каркаса — поэтому она светопроницаемая (выглядит как живой зуб), не вызывает аллергии и не темнеет у дёсен. Металлокерамика дешевле, но при тонкой десне со временем виден тёмный край.",
  },
  {
    question: "Сколько служит коронка из циркония?",
    answer:
      "При правильном уходе — от 15 до 20 лет. Цирконий не стирается и не теряет цвет.",
  },
  {
    question: "За сколько дней делается коронка из циркония?",
    answer:
      "У нас — от 5 до 10 дней благодаря собственному зубному технику. На время изготовления ставится временная коронка.",
  },
  {
    question: "Какая гарантия на циркониевую коронку?",
    answer:
      "Официальная гарантия — 3 года, плюс сервисное наблюдение в течение всего срока службы.",
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
    "Установка циркониевых коронок на зубы. Срок — от 5 дней. Гарантия 3 года.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function CirconiyKoronkiPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Протезирование", href: "/uslugi/protezirovanie/" },
          { name: TITLE, href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Ортопедия · Цирконий
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Циркониевые коронки — оптимальный выбор для тех, кто хочет получить
            прочный, естественно выглядящий зуб без металла под десной. Делаем
            за&nbsp;5–10 дней благодаря собственной зуботехнической базе.
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

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Почему циркониевая коронка</h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {[
            "Биосовместимый материал — не вызывает аллергии",
            "Не темнеет у десны (нет металлического каркаса)",
            "Прочность сравнима со стальной — выдерживает любую жевательную нагрузку",
            "Светопроницаемость — выглядит как живой зуб",
            "Срок службы 15–20 лет при правильном уходе",
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft">
              <span aria-hidden="true" className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] text-ink-700">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы установки</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Консультация и план лечения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография, согласование цвета и формы. Длительность —
              30–40 минут.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              2. Препарирование зуба и снятие слепков
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подготавливаем зуб под коронку, снимаем слепки. Ставим временную
              коронку из пластика.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              3. Изготовление коронки в нашей лаборатории
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Срок — 5–10 дней. Наш техник работает только с нашей клиникой,
              поэтому контроль качества и сроков прямой.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">4. Примерка и фиксация</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Если что-то не подходит по форме или цвету — переделываем.
              Окончательная фиксация на стоматологический цемент.
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
                  ["Циркониевая коронка", "20 000–22 000 ₽"],
                  ["Цирконий на импланте", "35 000 ₽"],
                  ["Фиксация коронки (цирконий)", "2 000 ₽"],
                  ["Временная клиническая пластмассовая коронка", "1 000–2 000 ₽"],
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
                  Записаться на&nbsp;установку коронки
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Цвет, форма и&nbsp;количество единиц — определим на&nbsp;консультации.
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
