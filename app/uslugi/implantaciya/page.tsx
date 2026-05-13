import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "implantaciya";
const TITLE = "Имплантация зубов";
const PRICE_FROM = 25000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽ под ключ`,
  description:
    "Имплантация зубов в Сочи под ключ от 25 000 ₽. Корейские (Osstem, Dentium) и израильские (MIS, Alpha-Bio) системы. Костная пластика. Гарантия 5 лет на имплант.",
  path: `/uslugi/${SLUG}/`,
});

const INDICATIONS = [
  "Потеря 1 зуба — без обтачивания соседних",
  "Потеря нескольких зубов",
  "Полное отсутствие зубов (all-on-4 / all-on-6)",
  "Необходимость опоры для съёмного протеза",
  "Сразу после удаления (одномоментная имплантация)",
];

const STEPS = [
  {
    title: "Диагностика и КТ",
    text: "Осмотр, 3D-снимок челюсти, оценка объёма кости, выбор системы импланта.",
  },
  {
    title: "Установка импланта (под анестезией)",
    text: "Минимально инвазивная операция, длительность — 30–60 минут на один имплант.",
  },
  {
    title: "Приживление 3–6 месяцев",
    text: "Имплант срастается с костью (остеоинтеграция). На время лечения ставится временная конструкция.",
  },
  {
    title: "Установка формирователя десны и абатмента",
    text: "Формируем правильный контур десны вокруг будущей коронки.",
  },
  {
    title: "Изготовление и фиксация коронки",
    text: "Снятие слепков, изготовление коронки в нашей лаборатории, фиксация на абатмент.",
  },
];

const PRICES: [string, string][] = [
  ["Osstem (Корея) — под ключ", "25 000 ₽"],
  ["Dentium (Корея) — под ключ", "30 000 ₽"],
  ["MIS (Израиль)", "35 000 ₽"],
  ["Alpha-Bio (Израиль)", "40 000 ₽"],
  ["Костная пластика", "от 15 000 ₽"],
  ["Синус-лифтинг", "от 20 000 ₽"],
  ["Коронка на имплант (цирконий)", "35 000 ₽"],
];

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
            Хирургия · Имплантация
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Имплант — это корень зуба из&nbsp;титана, который полностью заменяет
            утраченный. На&nbsp;имплант ставится коронка. Это самое долговечное
            решение при потере зуба.
          </p>

          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 px-5 py-3.5 ring-1 ring-brand-100/60 shadow-soft">
            <span className="text-sm text-muted-foreground">Цена:</span>
            <span className="font-display text-2xl font-medium text-ink-900">
              от&nbsp;{PRICE_FROM.toLocaleString("ru-RU")}&nbsp;₽
            </span>
            <span className="text-sm text-muted-foreground">под ключ</span>
          </div>

          <div className="mt-6">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на консультацию
              <ArrowRight className="ml-1 hidden size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1 xs:inline-block" />
            </Link>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Когда нужна имплантация
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {INDICATIONS.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
                >
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-[15px] text-ink-700">{item}</span>
              </li>
            ))}
          </ul>
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
                  <p className="font-display text-lg font-medium text-ink-900 md:text-xl">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
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
                <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
                  Запись
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
                  Записаться на консультацию
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Сначала — бесплатная консультация и&nbsp;КТ.
                  По&nbsp;результатам подберём систему импланта и&nbsp;посчитаем точную цену.
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
