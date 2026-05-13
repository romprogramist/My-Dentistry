import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQ } from "@/components/blocks/FAQ";
import { BookingForm } from "@/components/forms/BookingForm";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { ArrowRight } from "lucide-react";

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
            Терапия · Кариес
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            {TITLE} в Сочи
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Кариес — самое распространённое заболевание зубов. Чем раньше начато
            лечение, тем меньше тканей удаляется и&nbsp;тем проще процедура.
            Наши пациенты особо отмечают безболезненность лечения.
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

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Стадии кариеса</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Пятно — без лечения, проводится реминерализация</li>
          <li>✓ Поверхностный — затрагивает эмаль</li>
          <li>✓ Средний — доходит до дентина</li>
          <li>✓ Глубокий — близко к нерву (пульпе)</li>
        </ul>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Этапы лечения</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Анестезия</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Современный аппликационный + инфильтрационный анестетик. Лечение
              безболезненное.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">2. Удаление поражённых тканей</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Удаляем только повреждённые ткани, максимально сохраняя здоровый
              зуб.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">
              3. Пломбирование композитным материалом
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Послойное нанесение композита светового отверждения с подбором
              цвета под зуб.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">4. Шлифовка и полировка</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Восстанавливаем анатомическую форму и гладкость зуба, проверяем
              прикус.
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
                  Чем раньше начать — тем легче пройдёт лечение.
                  Запишитесь на&nbsp;осмотр.
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
