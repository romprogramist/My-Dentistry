import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Налоговый вычет 13% за лечение зубов",
  description:
    "Как вернуть 13% от стоимости стоматологического лечения. Список документов, пошаговая инструкция, помощь в оформлении.",
  path: "/nalogovyy-vychet/",
});

export default function NalogovyyVychetPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[{ name: "Налоговый вычет", href: "/nalogovyy-vychet/" }]}
      />
      <article className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Налоговый вычет
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Верните 13% за&nbsp;лечение зубов
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Каждый налогоплательщик в&nbsp;РФ может вернуть 13% от&nbsp;стоимости
            стоматологического лечения. Имплантация и&nbsp;протезирование
            относятся к&nbsp;дорогостоящим видам лечения — вычет можно получить
            с&nbsp;полной суммы без ограничения.
          </p>
        </div>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Сколько можно вернуть</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <strong>Обычное лечение</strong> (терапия, пломбы, чистка): до 13%
            от 150 000 ₽ в год = до 19 500 ₽
          </li>
          <li>
            <strong>Дорогостоящее лечение</strong> (имплантация,
            сложное протезирование): 13% от полной суммы без ограничения
          </li>
        </ul>
        <p className="mt-2 text-sm text-muted-foreground">
          Например: имплантация на 100 000 ₽ → возврат 13 000 ₽; имплантация на
          300 000 ₽ → возврат 39 000 ₽.
        </p>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Как получить вычет</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">1. Получить документы в клинике</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Мы подготовим: договор на лечение, справку об оплате (форма
              КНД 1151022), копию лицензии клиники.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">2. Собрать остальные документы</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Декларация 3-НДФЛ, справка 2-НДФЛ от работодателя, копия паспорта,
              ИНН, реквизиты счёта для перечисления.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">3. Подать декларацию в ФНС</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Через личный кабинет на nalog.ru, портал Госуслуг или в отделении
              налоговой по месту прописки.
            </p>
          </li>
          <li className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft md:p-6">
            <p className="font-semibold">4. Получить деньги</p>
            <p className="mt-1 text-sm text-muted-foreground">
              ФНС проверяет декларацию до 3 месяцев, затем 1 месяц на
              перечисление средств.
            </p>
          </li>
        </ol>

        <h2 className="mt-16 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">Мы помогаем оформить</h2>
        <p className="mt-4 text-muted-foreground">
          Все клинические документы для налоговой готовим бесплатно — в день
          оплаты или после прохождения курса лечения. Если есть вопросы по
          заполнению декларации — подскажем, что куда вписать.
        </p>

        <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 p-8 ring-1 ring-foreground/5 shadow-luxe md:p-12">
          <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
            Записывайтесь на&nbsp;лечение
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Все документы для вычета подготовим без доплат.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants({ size: "lg" })} mt-6`}
          >
            Записаться
          </Link>
        </section>
      </article>
    </div>
  );
}
