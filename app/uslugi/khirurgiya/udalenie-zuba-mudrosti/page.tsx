import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Хирургия", href: "/uslugi/khirurgiya/" },
          { name: "Удаление 8-ки", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Зубы мудрости часто прорезываются с осложнениями: давят на соседние,
          разрушаются под десной, провоцируют воспаление. В большинстве случаев
          их рекомендуют удалять.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            {PRICE_FROM.toLocaleString("ru-RU")}–{PRICE_TO.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">за зуб</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Когда нужно удалять восьмёрку</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Ретенция — зуб не прорезался и лежит в кости</li>
          <li>✓ Дистопия — растёт криво, давит на соседние зубы</li>
          <li>✓ Перикоронит — воспаление десны над зубом</li>
          <li>✓ Разрушение коронки кариесом</li>
          <li>✓ Подготовка к ортодонтическому лечению</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы операции</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. КТ для оценки положения</p>
            <p className="mt-1 text-sm text-muted-foreground">
              3D-снимок показывает, как расположены корни относительно
              нижнечелюстного канала и гайморовой пазухи.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современный анестетик — операция проходит безболезненно.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              3. Удаление (простое или сложное с разрезом десны)
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              При прорезавшейся восьмёрке — обычное удаление, при ретенции —
              разрез десны и распиливание зуба на сегменты.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              4. Швы и послеоперационные рекомендации
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              При необходимости накладываем швы, даём подробные инструкции и
              рецепт. Снятие швов через 7–10 дней — бесплатно.
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
                <td className="p-3">Простое удаление 8-ки</td>
                <td className="p-3 text-right font-semibold">5 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Сложное удаление с разрезом десны</td>
                <td className="p-3 text-right font-semibold">7 000–8 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Удаление ретенированной 8-ки</td>
                <td className="p-3 text-right font-semibold">8 000–10 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">КТ челюсти (если нужно)</td>
                <td className="p-3 text-right font-semibold">1 500 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Снятие швов (через 7–10 дней)</td>
                <td className="p-3 text-right font-semibold">бесплатно</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </article>

      <FAQ items={FAQ_ITEMS} />

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Записаться на удаление</h2>
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
