import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "khirurgiya/udalenie-zuba-mudrosti";
const TITLE = "Удаление зуба мудрости";
const PRICE_FROM = 5000;
const PRICE_TO = 10000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена ${PRICE_FROM.toLocaleString("ru-RU")}-${PRICE_TO.toLocaleString("ru-RU")} ₽`,
  description:
    "Удаление зуба мудрости в Сочи — 5 000-10 000 ₽. Простое и сложное удаление, в т.ч. ретенированных и дистопированных «восьмёрок». Современная анестезия.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Это очень больно?",
    answer:
      "Нет. Современная анестезия полностью снимает боль во время операции. После — возможен дискомфорт 1–3 дня, который снимается обезболивающими.",
  },
  {
    question: "Сколько заживает?",
    answer:
      "Десна заживает 7–10 дней, костная лунка — 2–3 месяца. Отёк после сложного удаления может держаться 3–5 дней — это нормально.",
  },
  {
    question: "Что делать после операции?",
    answer:
      "Первые 2 часа — не есть. Холод к щеке 15–20 минут (для уменьшения отёка). Не полоскать рот первые сутки (защита кровяного сгустка). Не курить 24 часа. Подробные инструкции даём после операции.",
  },
  {
    question: "Зачем нужна КТ?",
    answer:
      "КТ показывает положение корней восьмёрки относительно нижнечелюстного канала и гайморовой пазухи. Это позволяет планировать операцию безопасно и без осложнений.",
  },
  {
    question: "Можно ли удалить все 4 восьмёрки за один визит?",
    answer:
      "В ряде случаев да — обычно по 2 за один визит (с одной стороны верх+низ или только верх/низ). Но при сложных случаях каждую удаляют отдельно с интервалом 1–2 недели.",
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
    "Удаление зубов мудрости: простое и сложное, включая ретенированные и дистопированные восьмёрки. Под современной анестезией.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function UdalenieZubaMudrostiPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Хирургия", href: "/uslugi/khirurgiya/" },
          { name: "Удаление 8-ки", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Хирургия · Зуб мудрости
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Зубы мудрости часто прорезываются с&nbsp;осложнениями: давят
            на&nbsp;соседние, разрушаются под десной, провоцируют воспаление.
            В&nbsp;большинстве случаев их&nbsp;рекомендуют удалять.
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

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Когда нужно удалять восьмёрку</h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {[
            "Ретенция — зуб не прорезался и лежит в кости",
            "Дистопия — растёт криво, давит на соседние зубы",
            "Перикоронит — воспаление десны над зубом",
            "Разрушение коронки кариесом",
            "Подготовка к ортодонтическому лечению",
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft">
              <span aria-hidden="true" className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] text-ink-700">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы операции</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. КТ для оценки положения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              3D-снимок показывает, как расположены корни относительно
              нижнечелюстного канала и гайморовой пазухи.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">2. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современный анестетик — операция проходит безболезненно.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              3. Удаление (простое или сложное с разрезом десны)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              При прорезавшейся восьмёрке — обычное удаление, при ретенции —
              разрез десны и распиливание зуба на сегменты.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              4. Швы и послеоперационные рекомендации
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              При необходимости накладываем швы, даём подробные инструкции и
              рецепт. Снятие швов через 7–10 дней — бесплатно.
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
                  ["Простое удаление 8-ки", "5 000 ₽"],
                  ["Сложное удаление с разрезом десны", "7 000–8 000 ₽"],
                  ["Удаление ретенированной 8-ки", "8 000–10 000 ₽"],
                  ["КТ челюсти (если нужно)", "1 500 ₽"],
                  ["Снятие швов (через 7–10 дней)", "бесплатно"],
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
                  Записаться на&nbsp;удаление
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Перед операцией обязательно сделаем КТ — оценим положение
                  корней и&nbsp;спланируем операцию.
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
