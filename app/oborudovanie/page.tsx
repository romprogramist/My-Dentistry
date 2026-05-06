import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Оборудование клиники",
  description:
    "Дентальный микроскоп для эндодонтии, оборудование для стерилизации и безопасного лечения.",
  path: "/oborudovanie/",
});

export default function OborudovaniePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Оборудование", href: "/oborudovanie/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Оборудование</h1>

        <h2 className="mt-8 text-2xl font-bold">Дентальный микроскоп</h2>
        <p className="mt-4 text-muted-foreground">
          Главный инструмент при лечении корневых каналов. Даёт увеличение до
          25× и направленную подсветку — врач видит каждый канал и микротрещину.
          Это позволяет лечить даже сложные случаи и спасать зубы, которые в
          других клиниках предлагают удалить.
        </p>
        <Link
          href="/uslugi/endodontiya-pod-mikroskopom/"
          className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
        >
          Подробнее об эндодонтии под микроскопом →
        </Link>

        <h2 className="mt-12 text-2xl font-bold">Стерилизация</h2>
        <p className="mt-4 text-muted-foreground">
          Все инструменты проходят полный цикл стерилизации: предварительная
          очистка, ультразвуковая ванна, автоклавирование при +134 °C. Одноразовые
          материалы (перчатки, шприцы, наконечники для AIR-FLOW) используются
          строго на одного пациента.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Анестезия</h2>
        <p className="mt-4 text-muted-foreground">
          Используем современные карпульные анестетики (Ультракаин, Скандонест и
          аналоги). Подбираем дозу индивидуально с учётом аллергоанамнеза и
          состояния пациента.
        </p>

        <div className="mt-12 rounded-lg bg-brand-50 p-6">
          <p className="text-sm">
            Хотите увидеть нашу клинику и оборудование лично? Запишитесь на
            бесплатный осмотр-консультацию.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants()} mt-4 inline-flex`}
          >
            Записаться на осмотр
          </Link>
        </div>
      </article>
    </>
  );
}
