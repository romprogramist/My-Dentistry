import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Своя зуботехническая база",
  description:
    "Собственный зубной техник, работающий эксклюзивно с нашей клиникой. Коронки и протезы за 5–10 дней.",
  path: "/laboratoriya/",
});

export default function LaboratoryPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Лаборатория", href: "/laboratoriya/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          Своя зуботехническая база
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Большинство стоматологий заказывают коронки и протезы у внешних
          лабораторий. Это значит: пациент ждёт 3–4 недели, врач не может
          контролировать качество в процессе, переделки растягиваются на месяц.
        </p>
        <p className="mt-4">
          У нас другой подход: мы работаем с собственным зубным техником,
          который делает работы только для нашей клиники. Это значит:
        </p>

        <ul className="mt-6 space-y-3">
          <li>
            <strong>Срок изготовления коронки — от 5 до 10 дней.</strong> Не
            недели, а дни.
          </li>
          <li>
            <strong>Прямой диалог техника и врача.</strong> Никаких потерь в
            коммуникации, искажений в технических картах.
          </li>
          <li>
            <strong>Контроль качества на всех этапах.</strong> Если что-то не
            подходит по форме или цвету — переделываем сразу.
          </li>
          <li>
            <strong>Бесплатная подгонка.</strong> Если коронка села не идеально
            — техник на связи, переделываем без доплаты.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Что мы делаем</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Металлокерамические коронки</li>
          <li>✓ Циркониевые коронки</li>
          <li>✓ Коронки и виниры из E.max (пресс-керамика)</li>
          <li>✓ Бюгельные протезы (на кламмерах и аттачменах)</li>
          <li>✓ Съёмные протезы (акрил, нейлон)</li>
          <li>✓ Протезы на имплантах (балочные, телескопические)</li>
          <li>✓ Культевые вкладки (разборные и неразборные)</li>
        </ul>

        <div className="mt-12 rounded-lg bg-brand-50 p-6">
          <h2 className="text-xl font-bold">Хотите узнать подробнее?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Запишитесь на бесплатную консультацию — обсудим вашу ситуацию,
            покажем варианты, посчитаем стоимость и сроки.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants()} mt-4 inline-flex`}
          >
            Записаться на консультацию
          </Link>
        </div>
      </article>
    </>
  );
}
