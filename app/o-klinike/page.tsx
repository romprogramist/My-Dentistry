import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { VideoPlayer } from "@/components/blocks/VideoPlayer";

export const metadata = createPageMetadata({
  title: "О клинике",
  description: `«Моя Стоматология» — стоматологическая клиника в центре Сочи с ${CLINIC.founded} года. Бессрочная медицинская лицензия ${CLINIC.license.number}.`,
  path: "/o-klinike/",
});

export default function AboutPage() {
  const yearsActive = new Date().getFullYear() - CLINIC.founded;
  return (
    <>
      <Breadcrumbs items={[{ name: "О клинике", href: "/o-klinike/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">О клинике</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {CLINIC.name} — стоматологическая клиника полного цикла в Центральном
          районе Сочи на улице Донская, 52. Работаем с {CLINIC.founded} года —{" "}
          {yearsActive} лет с момента открытия.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Наши принципы</h2>
        <ul className="mt-4 space-y-3">
          <li>
            <strong>Безболезненность.</strong> Современная анестезия и
            индивидуальный подбор препаратов. Это самое частое слово в наших
            отзывах.
          </li>
          <li>
            <strong>Полный цикл лечения.</strong> Терапия, хирургия, ортопедия,
            имплантация — всё в одной клинике, без отправки пациента «по другим
            адресам».
          </li>
          <li>
            <strong>Своя зуботехническая база.</strong> Эксклюзивный зубной
            техник делает коронки и протезы за 5–10 дней.
          </li>
          <li>
            <strong>Прозрачные цены.</strong> Полный прайс — на сайте, рассрочка
            от Т-Банка, помощь с налоговым вычетом 13%.
          </li>
          <li>
            <strong>Гарантия 1–5 лет</strong> на все типы работ.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Реквизиты и лицензия</h2>
        <dl className="mt-4 grid gap-2 text-sm">
          <div>
            <dt className="font-semibold">Юридическое лицо</dt>
            <dd className="text-muted-foreground">{CLINIC.legalName}</dd>
          </div>
          <div>
            <dt className="font-semibold">ОГРН</dt>
            <dd className="text-muted-foreground">{CLINIC.ogrn}</dd>
          </div>
          <div>
            <dt className="font-semibold">Медицинская лицензия</dt>
            <dd className="text-muted-foreground">
              {CLINIC.license.number}, бессрочная
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Год основания</dt>
            <dd className="text-muted-foreground">{CLINIC.founded}</dd>
          </div>
        </dl>

        <h2 className="mt-12 text-2xl font-bold">Клиника в работе</h2>

        <figure className="mt-6 overflow-hidden rounded-2xl bg-slate-200">
          <Image
            src="/media/clinic/reception-wide.webp"
            alt="Приёмная клиники «Моя Стоматология»"
            width={1600}
            height={1200}
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full object-cover"
          />
        </figure>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src="/media/clinic/doctor-at-work-1.webp"
              alt="Команда клиники в работе"
              width={1200}
              height={1600}
              sizes="(min-width: 640px) 384px, 100vw"
              className="h-auto w-full object-cover"
            />
          </figure>
          <figure className="overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src="/media/clinic/doctor-at-work-2.webp"
              alt="Лечение пациента"
              width={1200}
              height={1600}
              sizes="(min-width: 640px) 384px, 100vw"
              className="h-auto w-full object-cover"
            />
          </figure>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src="/media/procedures/implant-1.webp"
              alt="Имплантация — установка имплантата"
              width={1200}
              height={1600}
              sizes="(min-width: 640px) 384px, 100vw"
              className="h-auto w-full object-cover"
            />
          </figure>
          <VideoPlayer
            src="/media/video/clinic-tour"
            poster="/media/video/clinic-tour.poster.webp"
            title="Тур по кабинету"
            aspectRatio="9/16"
          />
        </div>

        <div className="mt-4">
          <VideoPlayer
            src="/media/video/treatment"
            poster="/media/video/treatment.poster.webp"
            title="Общий план лечения"
            aspectRatio="9/16"
          />
        </div>
      </article>
    </>
  );
}
