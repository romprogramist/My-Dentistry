import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

const SLUG = "lechenie-kariesa";
const TITLE = "Лечение кариеса";
const PRICE_FROM = 4000;
const PRICE_TO = 7000;

export const metadata = createPageMetadata({
  title: `${TITLE} в Сочи — цена от ${PRICE_FROM.toLocaleString("ru-RU")} ₽`,
  description:
    "Безболезненное лечение кариеса в Сочи — от 4 000 ₽. Лечим кариес любой стадии композитными пломбами с световой полимеризацией. Современная анестезия.",
  path: `/uslugi/${SLUG}/`,
});

const FAQ_ITEMS = [
  {
    question: "Это больно?",
    answer:
      "Нет. Современная анестезия делает лечение безболезненным. Пациенты особо отмечают комфорт процедуры — даже при глубоком кариесе.",
  },
  {
    question: "Сколько служит композитная пломба?",
    answer:
      "При правильно проведённом лечении и хорошей гигиене — 7–10 лет. Раз в 6 месяцев на профосмотре мы проверяем краевое прилегание пломб.",
  },
  {
    question: "Можно ли вылечить кариес без сверления?",
    answer:
      "Только на стадии пятна — методом реминерализации (восстановление эмали препаратами кальция и фтора). При появлении полости в эмали или дентине без препарирования не обойтись.",
  },
  {
    question: "Что делать если боюсь стоматолога?",
    answer:
      "Скажите врачу — современная анестезия снимает 100% боли. При сильной тревожности возможна седация. Лечение в нашей клинике проходит спокойно: пациенты часто отмечают, что бояться было нечего.",
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
    "Лечение кариеса любой стадии композитными пломбами со световой полимеризацией. Безболезненно под современной анестезией.",
  offers: [
    {
      "@type": "Offer",
      price: PRICE_FROM,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function LechenieKariesaPage() {
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
          Кариес — самое распространённое заболевание зубов. Чем раньше начато
          лечение, тем меньше тканей удаляется и тем проще процедура. Наши
          пациенты особо отмечают безболезненность лечения.
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

        <h2 className="mt-12 text-2xl font-bold">Стадии кариеса</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Пятно — без лечения, проводится реминерализация</li>
          <li>✓ Поверхностный — затрагивает эмаль</li>
          <li>✓ Средний — доходит до дентина</li>
          <li>✓ Глубокий — близко к нерву (пульпе)</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современный аппликационный + инфильтрационный анестетик. Лечение
              безболезненное.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Удаление поражённых тканей</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаляем только повреждённые ткани, максимально сохраняя здоровый
              зуб.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">
              3. Пломбирование композитным материалом
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Послойное нанесение композита светового отверждения с подбором
              цвета под зуб.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Шлифовка и полировка</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Восстанавливаем анатомическую форму и гладкость зуба, проверяем
              прикус.
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
                <td className="p-3">Кариес — поверхностный</td>
                <td className="p-3 text-right font-semibold">4 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Кариес — средний</td>
                <td className="p-3 text-right font-semibold">5 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Кариес — глубокий</td>
                <td className="p-3 text-right font-semibold">6 000–7 000 ₽</td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Реминерализация (1 зуб)</td>
                <td className="p-3 text-right font-semibold">1 500 ₽</td>
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
