import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { ArrowRight } from "lucide-react";

const SLUG = "implantaciya";
const TITLE = "Имплантация зубов";
const PRICE_FROM = 25000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽ под ключ`,
  description:
    "Имплантация зубов в Сочи под ключ от 25 000 ₽. Корейские (Osstem, Dentium) и израильские (MIS, Alpha-Bio) системы. Костная пластика. Гарантия 5 лет на имплант.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Это больно?",
    answer:
      "Нет. Установка импланта проходит под современной анестезией — пациент не чувствует боли. После процедуры возможен лёгкий дискомфорт 1–2 дня, который снимается обычными обезболивающими.",
  },
  {
    question: "Сколько служит имплант?",
    answer:
      "При правильной установке и уходе — десятилетиями. Производители Osstem, Dentium, MIS и Alpha-Bio дают пожизненную гарантию на сам имплант. На коронку — 3 года.",
  },
  {
    question: "Какая система лучше — корейская или израильская?",
    answer:
      "Корейские (Osstem, Dentium) — оптимальное соотношение цены и качества, отлично приживаются. Израильские (MIS, Alpha-Bio) — премиум-класс, чаще применяются при сложных клинических случаях. Обе категории — клинически доказанные системы с многолетней историей.",
  },
  {
    question: "Что такое одномоментная имплантация?",
    answer:
      "Это установка импланта сразу после удаления зуба, в один визит. Сокращает общее время лечения на 2–3 месяца. Возможна не во всех случаях — нужна оценка состояния кости.",
  },
  {
    question: "Какие противопоказания?",
    answer:
      "Абсолютные: тяжёлые заболевания крови, онкология в активной фазе, декомпенсированный диабет. Относительные (требуют подготовки): курение, пародонтит, недостаток костной ткани (решается костной пластикой).",
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
    "Имплантация зубов под ключ — установка импланта и коронки. Системы Osstem, Dentium, MIS, Alpha-Bio. Гарантия 5 лет.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function ImplantaciyaPage() {
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
          Имплант — это корень зуба из титана, который полностью заменяет
          утраченный. На имплант ставится коронка. Это самое долговечное решение
          при потере зуба.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            от {PRICE_FROM.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">под ключ</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
            <ArrowRight className="ml-1 hidden size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-1 xs:inline-block" />
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Когда нужна имплантация</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Потеря 1 зуба — без обтачивания соседних</li>
          <li>✓ Потеря нескольких зубов</li>
          <li>✓ Полное отсутствие зубов (all-on-4 / all-on-6)</li>
          <li>✓ Необходимость опоры для съёмного протеза</li>
          <li>✓ Сразу после удаления (одномоментная имплантация)</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Диагностика и КТ</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, 3D-снимок челюсти, оценка объёма кости, выбор системы
              импланта.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              2. Установка импланта (под анестезией)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Минимально инвазивная операция, длительность — 30–60 минут на один
              имплант.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">3. Приживление 3–6 месяцев</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Имплант срастается с костью (остеоинтеграция). На время лечения
              ставится временная конструкция.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              4. Установка формирователя десны и абатмента
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Формируем правильный контур десны вокруг будущей коронки.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              5. Изготовление и фиксация коронки
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Снятие слепков, изготовление коронки в нашей лаборатории, фиксация
              на абатмент.
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
                <td className="p-3">Osstem (Корея) — под ключ</td>
                <td className="p-3 text-right font-semibold">25 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Dentium (Корея) — под ключ</td>
                <td className="p-3 text-right font-semibold">30 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">MIS (Израиль)</td>
                <td className="p-3 text-right font-semibold">35 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Alpha-Bio (Израиль)</td>
                <td className="p-3 text-right font-semibold">40 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Костная пластика</td>
                <td className="p-3 text-right font-semibold">от 15 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Синус-лифтинг</td>
                <td className="p-3 text-right font-semibold">от 20 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Коронка на имплант (цирконий)</td>
                <td className="p-3 text-right font-semibold">35 000 ₽</td>
              </tr>
            </tbody>
            </table>
          </div>
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
