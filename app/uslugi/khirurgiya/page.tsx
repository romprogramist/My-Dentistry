import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { ArrowRight } from "lucide-react";

const SLUG = "khirurgiya";
const TITLE = "Хирургическая стоматология";
const PRICE_FROM = 3000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽`,
  description:
    "Хирургическая стоматология в Сочи — удаление зубов, в т.ч. зубов мудрости и ретенированных. Цистэктомия. Аугментация костной ткани. Современная анестезия.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Сколько заживает после удаления?",
    answer:
      "Десна заживает 7–10 дней, костная лунка — 2–3 месяца. Полное восстановление кости — до 6 месяцев. Швы (если накладывались) снимаются через 7–10 дней — у нас бесплатно.",
  },
  {
    question: "Можно ли есть после удаления?",
    answer:
      "Первые 2 часа — нельзя. Затем — мягкая прохладная пища с противоположной стороны. Горячее, твёрдое, острое исключить на 2–3 дня. Алкоголь и курение — минимум 24 часа.",
  },
  {
    question: "Что делать если десна болит?",
    answer:
      "Лёгкая боль 1–3 дня — норма, снимается обычными обезболивающими. Если боль усиливается, появляется отёк, температура или неприятный запах из лунки — обратитесь к нам. Возможен альвеолит (воспаление лунки), который мы быстро лечим.",
  },
  {
    question: "Когда обязательно удалять зуб мудрости?",
    answer:
      "При ретенции (зуб не прорезался), дистопии (растёт криво), перикороните (воспаление десны над зубом), сильном разрушении кариесом, при подготовке к ортодонтическому лечению. На КТ мы оцениваем положение и принимаем решение.",
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
    "Хирургическая стоматология: удаление зубов любой сложности, удаление зубов мудрости, цистэктомия, резекция верхушки корня, костная пластика.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function KhirurgiyaPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Хирургия", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Хирургия
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Стоматолог-хирург решает задачи, выходящие за&nbsp;рамки обычной
            терапии: удаление, операции на&nbsp;дёснах и&nbsp;кости. Современная
            анестезия делает процедуры безболезненными.
          </p>

          <div className="mt-7 inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-mint-50 px-5 py-3.5 ring-1 ring-brand-100/60 shadow-soft">
            <span className="text-sm text-muted-foreground">Цена:</span>
            <span className="font-display text-2xl font-medium text-ink-900">
              от&nbsp;{PRICE_FROM.toLocaleString("ru-RU")}&nbsp;₽
            </span>
            <span className="text-sm text-muted-foreground">за удаление</span>
          </div>

          <div className="mt-6">
            <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
              Записаться на консультацию
              <ArrowRight className="ml-1 hidden size-5 transition-transform duration-300 ease-out group-hover/button:translate-x-1 xs:inline-block" />
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Что мы делаем</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Удаление зубов любой сложности</li>
          <li>✓ Удаление зубов мудрости (восьмёрок)</li>
          <li>✓ Удаление корней</li>
          <li>✓ Цистэктомия — удаление кисты</li>
          <li>✓ Резекция верхушки корня</li>
          <li>✓ Костная пластика и синус-лифтинг</li>
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы операции</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Консультация и КТ</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография или 3D-снимок для оценки сложности,
              определение тактики операции.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">2. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современная анестезия — операция проходит безболезненно.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">3. Операция</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаление, цистэктомия или резекция верхушки корня — в зависимости
              от показаний.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              4. Послеоперационные рекомендации
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подробные инструкции по уходу, контакт врача для вопросов, контроль
              заживления.
            </p>
          </li>
        </ol>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Виды операций</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card className="p-5 transition-shadow hover:shadow-md">
            <h3 className="text-lg font-semibold">Удаление зуба мудрости</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Простое и сложное удаление, в т.ч. ретенированных и
              дистопированных «восьмёрок».
            </p>
            <p className="mt-2 font-semibold text-brand-700">5 000–10 000 ₽</p>
            <Link
              href="/uslugi/khirurgiya/udalenie-zuba-mudrosti/"
              className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
            >
              Подробнее →
            </Link>
          </Card>
          <Card className="p-5">
            <h3 className="text-lg font-semibold">Удаление корня</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Удаление корня разрушенного зуба или оставшегося после неудачного
              предыдущего удаления.
            </p>
            <p className="mt-2 font-semibold text-brand-700">от 3 000 ₽</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Запишитесь на консультацию для оценки сложности.
            </p>
          </Card>
        </div>

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
                <td className="p-3">Удаление простое</td>
                <td className="p-3 text-right font-semibold">3 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Удаление сложное</td>
                <td className="p-3 text-right font-semibold">5 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Зуб мудрости — простое удаление</td>
                <td className="p-3 text-right font-semibold">5 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">
                  Зуб мудрости — сложное удаление (ретенированный)
                </td>
                <td className="p-3 text-right font-semibold">8 000–10 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Удаление корня</td>
                <td className="p-3 text-right font-semibold">от 3 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Цистэктомия</td>
                <td className="p-3 text-right font-semibold">от 7 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Резекция верхушки корня</td>
                <td className="p-3 text-right font-semibold">от 8 000 ₽</td>
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
                  Записаться на консультацию
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                  Перед операцией — обязательная консультация и&nbsp;осмотр.
                  Подбираем тактику с&nbsp;учётом КТ.
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
