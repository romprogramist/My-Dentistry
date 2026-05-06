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
    <>
      <Breadcrumbs
        items={[{ name: "Налоговый вычет", href: "/nalogovyy-vychet/" }]}
      />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          Налоговый вычет 13% за лечение зубов
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Каждый налогоплательщик в РФ может вернуть 13% от стоимости
          стоматологического лечения. Имплантация и протезирование относятся к
          дорогостоящим видам лечения — вычет можно получить с полной суммы без
          ограничения.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Сколько можно вернуть</h2>
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

        <h2 className="mt-12 text-2xl font-bold">Как получить вычет</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-lg border p-4">
            <p className="font-semibold">1. Получить документы в клинике</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Мы подготовим: договор на лечение, справку об оплате (форма
              КНД 1151022), копию лицензии клиники.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">2. Собрать остальные документы</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Декларация 3-НДФЛ, справка 2-НДФЛ от работодателя, копия паспорта,
              ИНН, реквизиты счёта для перечисления.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">3. Подать декларацию в ФНС</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Через личный кабинет на nalog.ru, портал Госуслуг или в отделении
              налоговой по месту прописки.
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-semibold">4. Получить деньги</p>
            <p className="mt-1 text-sm text-muted-foreground">
              ФНС проверяет декларацию до 3 месяцев, затем 1 месяц на
              перечисление средств.
            </p>
          </li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold">Мы помогаем оформить</h2>
        <p className="mt-4 text-muted-foreground">
          Все клинические документы для налоговой готовим бесплатно — в день
          оплаты или после прохождения курса лечения. Если есть вопросы по
          заполнению декларации — подскажем, что куда вписать.
        </p>

        <div className="mt-12 rounded-lg bg-brand-50 p-6">
          <p className="text-sm">
            Записывайтесь на лечение — все документы для вычета подготовим без
            доплат.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants()} mt-4 inline-flex`}
          >
            Записаться
          </Link>
        </div>
      </article>
    </>
  );
}
