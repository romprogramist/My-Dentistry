import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Протезирование", href: "/uslugi/protezirovanie/" },
          { name: TITLE, href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Циркониевые коронки — оптимальный выбор для тех, кто хочет получить
          прочный, естественно выглядящий зуб без металла под десной. Делаем за
          5–10 дней благодаря собственной зуботехнической базе.
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

        <h2 className="mt-12 text-2xl font-bold">Почему циркониевая коронка</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Биосовместимый материал — не вызывает аллергии</li>
          <li>✓ Не темнеет у десны (нет металлического каркаса)</li>
          <li>
            ✓ Прочность сравнима со стальной — выдерживает любую жевательную
            нагрузку
          </li>
          <li>✓ Светопроницаемость — выглядит как живой зуб</li>
          <li>✓ Срок службы 15–20 лет при правильном уходе</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы установки</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Консультация и план лечения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография, согласование цвета и формы. Длительность —
              30–40 минут.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              2. Препарирование зуба и снятие слепков
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подготавливаем зуб под коронку, снимаем слепки. Ставим временную
              коронку из пластика.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              3. Изготовление коронки в нашей лаборатории
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Срок — 5–10 дней. Наш техник работает только с нашей клиникой,
              поэтому контроль качества и сроков прямой.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Примерка и фиксация</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Если что-то не подходит по форме или цвету — переделываем.
              Окончательная фиксация на стоматологический цемент.
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
                <td className="p-3">Циркониевая коронка</td>
                <td className="p-3 text-right font-semibold">
                  20 000–22 000 ₽
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Цирконий на импланте</td>
                <td className="p-3 text-right font-semibold">35 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Фиксация коронки (цирконий)</td>
                <td className="p-3 text-right font-semibold">2 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">
                  Временная клиническая пластмассовая коронка
                </td>
                <td className="p-3 text-right font-semibold">1 000–2 000 ₽</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на установку коронки</h2>
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
