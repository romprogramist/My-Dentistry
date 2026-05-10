import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { VideoPlayer } from "@/components/blocks/VideoPlayer";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
          Дентальный микроскоп даёт увеличение до 25× — врач видит каждый канал
          и микротрещину. Это позволяет лечить даже сложные случаи и спасать
          зубы, которые в других клиниках предлагают удалить.
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

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Когда нужен микроскоп</h2>
            <ul className="mt-4 space-y-2">
              <li>✓ Перелечивание каналов (повторное лечение)</li>
              <li>✓ Сложная анатомия — изогнутые и кальцифицированные каналы</li>
              <li>✓ Поиск трещин корня</li>
              <li>✓ Извлечение сломанных инструментов из канала</li>
              <li>✓ Извлечение штифтов и культевых вкладок</li>
              <li>✓ Лечение пульпита и периодонтита со сложной анатомией</li>
            </ul>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <VideoPlayer
              src="/media/video/microscope"
              poster="/media/video/microscope.poster.webp"
              title="Дентальный микроскоп Zeiss в работе"
              aspectRatio="9/16"
            />
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Диагностика и план лечения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография или 3D-снимок. Определяем количество
              каналов и сложность случая.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Анестезия и изоляция зуба</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современная анестезия — лечение безболезненное. Зуб изолируется
              коффердамом для стерильности.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              3. Обработка каналов под микроскопом
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Поиск всех устьев, механическая и медикаментозная обработка
              каналов с контролем под 25× увеличением.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Пломбирование и контроль</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Каналы пломбируются гуттаперчей с силером. Контрольный снимок —
              убеждаемся, что пломбировка плотная до самой верхушки.
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
                <td className="p-3">Лечение 1 канала под микроскопом</td>
                <td className="p-3 text-right font-semibold">7 000–10 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Перелечивание 1 канала</td>
                <td className="p-3 text-right font-semibold">10 000–15 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Извлечение штифта / сломанного инструмента</td>
                <td className="p-3 text-right font-semibold">от 5 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Контрольный снимок</td>
                <td className="p-3 text-right font-semibold">500 ₽</td>
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
