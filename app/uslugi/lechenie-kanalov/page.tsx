import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { ArrowRight } from "lucide-react";

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
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Лечение каналов", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Терапия · Эндодонтия
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Когда кариес доходит до&nbsp;нерва, начинается пульпит — острая боль.
            Если не&nbsp;лечить, развивается периодонтит — воспаление на&nbsp;корне.
            Эндодонтическое лечение спасает зуб от&nbsp;удаления.
          </p>

          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 px-5 py-3.5 ring-1 ring-brand-100/60 shadow-soft">
            <span className="text-sm text-muted-foreground">Цена:</span>
            <span className="font-display text-2xl font-medium text-ink-900">
              {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")}&nbsp;₽
            </span>
            <span className="text-sm text-muted-foreground">за канал</span>
          </div>

          <div className="mt-6">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на консультацию
              <ArrowRight className="ml-1 hidden size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1 xs:inline-block" />
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Когда нужно лечение каналов</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Пульпит — острая зубная боль</li>
          <li>✓ Периодонтит — воспаление на верхушке корня</li>
          <li>✓ Гнойный процесс на корне (свищ, флюс)</li>
          <li>✓ Подготовка зуба под коронку</li>
          <li>✓ Глубокий кариес с возможным затрагиванием пульпы</li>
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Диагностика, анестезия, изоляция</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Рентгенография для оценки каналов, анестезия, изоляция зуба
              коффердамом.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              2. Удаление пульпы и обработка каналов
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Раскрытие коронки зуба, поиск устьев каналов, механическая
              обработка с расширением и формированием.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              3. Медикаментозная обработка и временная пломба (1–2 визита)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Дезинфекция каналов, лечебная паста, временная пломба. При
              периодонтите этапов может быть несколько.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              4. Окончательное пломбирование с контрольным снимком
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Пломбирование каналов гуттаперчей с силером, контрольный снимок,
              постоянная пломба или подготовка под коронку.
            </p>
          </li>
        </ol>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Цены</h2>
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

      <section>
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe">
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:gap-12 md:p-12">
              <div>
                <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">Запись</span>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
                  Записаться на лечение
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  При острой боли — позвоните, постараемся принять в&nbsp;день обращения.
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
