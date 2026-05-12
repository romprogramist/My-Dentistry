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
    <>
      <Breadcrumbs
        items={[
          { name: "Услуги", href: "/uslugi/" },
          { name: "Хирургия", href: `/uslugi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">{TITLE} в Сочи</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Стоматолог-хирург решает задачи, выходящие за рамки обычной терапии:
          удаление, операции на дёснах и кости. Современная анестезия делает
          процедуры безболезненными.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm text-muted-foreground">Цена:</span>
          <span className="text-xl font-bold text-brand-700">
            от {PRICE_FROM.toLocaleString("ru-RU")} ₽
          </span>
          <span className="text-sm text-muted-foreground">за удаление</span>
        </div>

        <div className="mt-4">
          <Link href="/zapis/" className={buttonVariants({ size: "lg" })}>
            Записаться на консультацию
            <ArrowRight className="ml-1 size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-1" />
          </Link>
        </div>

        <h2 className="mt-12 text-2xl font-bold">Что мы делаем</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Удаление зубов любой сложности</li>
          <li>✓ Удаление зубов мудрости (восьмёрок)</li>
          <li>✓ Удаление корней</li>
          <li>✓ Цистэктомия — удаление кисты</li>
          <li>✓ Резекция верхушки корня</li>
          <li>✓ Костная пластика и синус-лифтинг</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы операции</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Консультация и КТ</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Осмотр, рентгенография или 3D-снимок для оценки сложности,
              определение тактики операции.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современная анестезия — операция проходит безболезненно.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">3. Операция</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаление, цистэктомия или резекция верхушки корня — в зависимости
              от показаний.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              4. Послеоперационные рекомендации
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Подробные инструкции по уходу, контакт врача для вопросов, контроль
              заживления.
            </p>
          </li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold">Виды операций</h2>
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
