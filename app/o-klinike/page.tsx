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

const PRINCIPLES = [
  {
    title: "Безболезненность",
    text: "Современная анестезия и индивидуальный подбор препаратов. Это самое частое слово в наших отзывах.",
  },
  {
    title: "Полный цикл лечения",
    text: "Терапия, хирургия, ортопедия, имплантация — всё в одной клинике, без отправки пациента «по другим адресам».",
  },
  {
    title: "Своя зуботехническая база",
    text: "Эксклюзивный зубной техник делает коронки и протезы за 5–10 дней.",
  },
  {
    title: "Прозрачные цены",
    text: "Полный прайс — на сайте, рассрочка от Т-Банка, помощь с налоговым вычетом 13%.",
  },
  {
    title: "Гарантия 1–5 лет",
    text: "На все типы работ — официальная гарантия и сервисное наблюдение.",
  },
];

export default function AboutPage() {
  const yearsActive = new Date().getFullYear() - CLINIC.founded;
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "О клинике", href: "/o-klinike/" }]} />
      <article className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div>
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            О клинике
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Клиника, к&nbsp;которой возвращаются
          </h1>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {CLINIC.name} — стоматологическая клиника полного цикла
            в&nbsp;Центральном районе Сочи на&nbsp;улице Донская, 52.
            Работаем с&nbsp;{CLINIC.founded}&nbsp;года — {yearsActive}&nbsp;лет
            с&nbsp;момента открытия.
          </p>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Наши принципы
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, idx) => (
              <div
                key={p.title}
                className="relative rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 font-display text-xs font-medium text-white"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-medium leading-snug text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Реквизиты и&nbsp;лицензия
          </h2>
          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              ["Юридическое лицо", CLINIC.legalName],
              ["ОГРН", CLINIC.ogrn],
              ["Медицинская лицензия", `${CLINIC.license.number}, бессрочная`],
              ["Год основания", String(CLINIC.founded)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-white p-5 ring-1 ring-foreground/5 shadow-soft"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1.5 font-display text-base font-medium text-ink-900 md:text-lg">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Клиника в&nbsp;работе
          </h2>

          <figure className="relative mt-7 overflow-hidden rounded-[24px] bg-slate-200 ring-luxe">
            <Image
              src="/media/clinic/reception-wide.webp"
              alt="Приёмная клиники «Моя Стоматология»"
              width={1600}
              height={1200}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto w-full object-cover"
            />
          </figure>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <figure className="relative overflow-hidden rounded-[20px] bg-slate-200 ring-luxe">
              <Image
                src="/media/clinic/doctor-at-work-1.webp"
                alt="Команда клиники в работе"
                width={1200}
                height={1600}
                sizes="(min-width: 640px) 384px, 100vw"
                className="h-auto w-full object-cover"
              />
            </figure>
            <figure className="relative overflow-hidden rounded-[20px] bg-slate-200 ring-luxe">
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

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <figure className="relative overflow-hidden rounded-[20px] bg-slate-200 ring-luxe">
              <Image
                src="/media/procedures/implant-1.webp"
                alt="Имплантация — установка имплантата"
                width={1200}
                height={1600}
                sizes="(min-width: 640px) 384px, 100vw"
                className="h-auto w-full object-cover"
              />
            </figure>
            <div className="relative ring-luxe rounded-[20px] overflow-hidden">
              <VideoPlayer
                src="/media/video/clinic-tour"
                poster="/media/video/clinic-tour.poster.webp"
                title="Тур по кабинету"
                aspectRatio="9/16"
              />
            </div>
          </div>

          <div className="mt-5 relative ring-luxe rounded-[20px] overflow-hidden">
            <VideoPlayer
              src="/media/video/treatment"
              poster="/media/video/treatment.poster.webp"
              title="Общий план лечения"
              aspectRatio="9/16"
            />
          </div>
        </section>
      </article>
    </div>
  );
}
