import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { VideoPlayer } from "@/components/blocks/VideoPlayer";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "endodontiya-pod-mikroskopom";
const TITLE = "Эндодонтия под микроскопом";
const PRICE_FROM = 7000;
const PRICE_TO = 15000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽ за канал`,
  description:
    "Лечение и перелечивание корневых каналов под дентальным микроскопом в Сочи. Увеличение до 25× — врач видит каждый канал и микротрещину. Спасаем зубы, которые в других клиниках предлагают удалить.",
  path: `/uslugi/${SLUG}/`,
  ogImage: "/images/og/endodontiya.jpg",
});

const FAQ_ITEMS = [
  {
    question: "Чем эндодонтия под микроскопом отличается от обычной?",
    answer:
      "Дентальный микроскоп даёт увеличение до 25× и яркую направленную подсветку. Врач видит устья каналов, микротрещины и ранее необнаруженные дополнительные каналы. Это особенно важно при перелечивании — без микроскопа часть инфекции может остаться незамеченной.",
  },
  {
    question: "Когда обязательно нужен микроскоп?",
    answer:
      "При перелечивании каналов (вторая попытка), при сложной анатомии (изогнутые и кальцифицированные каналы), при поиске трещин корня, при удалении сломанных инструментов из канала. Также — для извлечения ранее установленных штифтов и культевых вкладок.",
  },
  {
    question: "Сколько визитов занимает лечение?",
    answer:
      "От 1 до 3 визитов в зависимости от количества каналов и состояния зуба. На каждом этапе делаем контрольный снимок. Между визитами в зубе стоит лекарство и временная пломба.",
  },
  {
    question: "Это больно?",
    answer:
      "Современная анестезия делает процедуру безболезненной. Большинство пациентов отмечают, что лечение проходит комфортнее, чем они ожидали. После лечения возможна лёгкая чувствительность 1–2 дня.",
  },
  {
    question: "Какая гарантия?",
    answer:
      "Гарантия на эндодонтическое лечение — 1 год. При соблюдении рекомендаций (своевременная установка коронки или вкладки) пролеченный зуб служит десятилетиями.",
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
    "Лечение и перелечивание корневых каналов под дентальным микроскопом с увеличением до 25×. Гарантия 1 год.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function EndodontiyaPodMikroskopomPage() {
  const INDICATIONS = [
    "Перелечивание каналов (повторное лечение)",
    "Сложная анатомия — изогнутые и кальцифицированные каналы",
    "Поиск трещин корня",
    "Извлечение сломанных инструментов из канала",
    "Извлечение штифтов и культевых вкладок",
    "Лечение пульпита и периодонтита со сложной анатомией",
  ];

  const STEPS = [
    {
      title: "Диагностика и план лечения",
      text: "Осмотр, рентгенография или 3D-снимок. Определяем количество каналов и сложность случая.",
    },
    {
      title: "Анестезия и изоляция зуба",
      text: "Современная анестезия — лечение безболезненное. Зуб изолируется коффердамом для стерильности.",
    },
    {
      title: "Обработка каналов под микроскопом",
      text: "Поиск всех устьев, механическая и медикаментозная обработка каналов с контролем под 25× увеличением.",
    },
    {
      title: "Пломбирование и контроль",
      text: "Каналы пломбируются гуттаперчей с силером. Контрольный снимок — убеждаемся, что пломбировка плотная до самой верхушки.",
    },
  ];

  const PRICES: [string, string][] = [
    ["Лечение 1 канала под микроскопом", "7 000–10 000 ₽"],
    ["Перелечивание 1 канала", "10 000–15 000 ₽"],
    ["Извлечение штифта / сломанного инструмента", "от 5 000 ₽"],
    ["Контрольный снимок", "500 ₽"],
  ];

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
            Терапия · Микроскоп
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Дентальный микроскоп даёт увеличение до&nbsp;25× — врач видит
            каждый канал и&nbsp;микротрещину. Это позволяет лечить даже сложные
            случаи и&nbsp;спасать зубы, которые в&nbsp;других клиниках предлагают
            удалить.
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

        <section className="mt-16 grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
              Когда нужен микроскоп
            </h2>
            <ul className="mt-7 space-y-3">
              {INDICATIONS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
                  >
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span className="text-[15px] text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-brand-100/40 to-mint-100/40 blur-2xl"
            />
            <div className="relative ring-luxe rounded-2xl overflow-hidden">
              <VideoPlayer
                src="/media/video/microscope"
                poster="/media/video/microscope.poster.webp"
                title="Дентальный микроскоп Zeiss в работе"
                aspectRatio="9/16"
              />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Этапы лечения
          </h2>
          <ol className="mt-7 space-y-4">
            {STEPS.map((step, idx) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 font-display text-xl font-medium text-brand-700 ring-1 ring-brand-100/60 md:size-14"
                >
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-medium text-ink-900 md:text-xl">{step.title}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Цены
          </h2>
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
                  {PRICES.map(([label, price], i) => (
                    <tr key={label} className={i > 0 ? "border-t border-foreground/5" : ""}>
                      <td className="p-4 text-[15px] text-ink-700">{label}</td>
                      <td className="p-4 text-right font-display text-lg font-medium text-ink-900">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section>
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe">
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:gap-12 md:p-12">
              <div>
                <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">Запись</span>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Записаться на консультацию</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Сначала — бесплатная консультация и&nbsp;осмотр. По&nbsp;результатам подберём план лечения.
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
