import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "lechenie-kanalov";
const TITLE = "Лечение каналов (пульпит, периодонтит)";
const PRICE_FROM = 5000;
const PRICE_TO = 6000;

export const metadata = createPageMetadata({
  title: `Лечение каналов в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽ за канал`,
  description:
    "Лечение каналов в Сочи от 5 000 ₽ за канал. Лечим пульпит и периодонтит с медикаментозной обработкой и контрольными снимками. Под микроскопом — для сложных случаев.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Сколько визитов?",
    answer:
      "От 1 до 3 визитов в зависимости от состояния зуба. При пульпите часто хватает одного визита, при периодонтите — 2–3 (нужна медикаментозная обработка под временной пломбой).",
  },
  {
    question: "Можно ли спасти зуб без лечения каналов?",
    answer:
      "Если кариес дошёл до нерва или развился пульпит/периодонтит — нет. Без лечения каналов воспаление перейдёт на кость, и зуб придётся удалять. Эндодонтия — это единственный способ спасти зуб.",
  },
  {
    question: "Зачем нужен микроскоп?",
    answer:
      "Микроскоп нужен при сложной анатомии каналов, перелечивании, поиске трещин или сломанных инструментов. Для простых случаев он не обязателен. Подробнее о микроскопе — на странице про эндодонтию: /uslugi/endodontiya-pod-mikroskopom/",
  },
  {
    question: "Гарантия?",
    answer:
      "На эндодонтическое лечение — 1 год. При своевременной установке коронки или вкладки пролеченный зуб служит десятилетиями.",
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
    "Лечение пульпита и периодонтита: эндодонтическая обработка корневых каналов с медикаментозной обработкой и контрольными снимками. Гарантия 1 год.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function LechenieKanalovPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Лечение каналов", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Когда кариес доходит до нерва, начинается пульпит — острая боль. Если
          не лечить, развивается периодонтит — воспаление на корне.
          Эндодонтическое лечение спасает зуб от удаления.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">за канал</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Когда нужно лечение каналов</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Пульпит — острая зубная боль</li>
          <li>✓ Периодонтит — воспаление на верхушке корня</li>
          <li>✓ Гнойный процесс на корне (свищ, флюс)</li>
          <li>✓ Подготовка зуба под коронку</li>
          <li>✓ Глубокий кариес с возможным затрагиванием пульпы</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Диагностика, анестезия, изоляция</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Рентгенография для оценки каналов, анестезия, изоляция зуба
              коффердамом.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              2. Удаление пульпы и обработка каналов
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Раскрытие коронки зуба, поиск устьев каналов, механическая
              обработка с расширением и формированием.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              3. Медикаментозная обработка и временная пломба (1–2 визита)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Дезинфекция каналов, лечебная паста, временная пломба. При
              периодонтите этапов может быть несколько.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              4. Окончательное пломбирование с контрольным снимком
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Пломбирование каналов гуттаперчей с силером, контрольный снимок,
              постоянная пломба или подготовка под коронку.
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
                <td className="p-3">1-канальный зуб (резец)</td>
                <td className="p-3 text-right font-semibold">5 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">2-канальный (премоляр)</td>
                <td className="p-3 text-right font-semibold">6 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">3-канальный (моляр)</td>
                <td className="p-3 text-right font-semibold">7 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Под микроскопом — за канал</td>
                <td className="p-3 text-right font-semibold">от 7 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Контрольный снимок</td>
                <td className="p-3 text-right font-semibold">500 ₽</td>
              </tr>
            </tbody>
            </table>
          </div>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на лечение</h2>
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
