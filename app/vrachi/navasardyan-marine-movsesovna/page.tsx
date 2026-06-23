import Image from "next/image";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildPersonDentist } from "@/lib/schema/builders";

const NAME = "Навасардян Марине Мовсесовна";
const ROLE = "Врач-стоматолог-терапевт";
const PHOTO = "/media/doctors/navasardyan-marine-movsesovna.webp";
const SLUG = "navasardyan-marine-movsesovna";

export const metadata = createPageMetadata({
  title: `${NAME} — стоматолог-терапевт в Сочи`,
  description:
    "Навасардян Марине Мовсесовна — врач-стоматолог-терапевт клиники «Моя Стоматология» в Сочи. Лечение кариеса, эндодонтия под микроскопом, реставрация зубов.",
  path: `/vrachi/${SLUG}/`,
});

const SPECIALIZATIONS = [
  "Лечение кариеса любой сложности",
  "Эндодонтия под микроскопом — лечение и перелечивание каналов",
  "Лечение пульпита и периодонтита",
  "Художественная реставрация передних зубов",
  "Профессиональная гигиена полости рта",
];

const SCHEMA = buildPersonDentist({
  name: NAME,
  jobTitle: ROLE,
  description:
    "Врач-стоматолог-терапевт, специализация — лечение кариеса и эндодонтия под микроскопом.",
});

export default function DoctorPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[
          { name: "Врачи", href: "/vrachi/" },
          { name: NAME, href: `/vrachi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_2fr] md:gap-14 lg:gap-16">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-brand-100/60 via-transparent to-mint-100/60 blur-2xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-gradient-to-br from-brand-100 to-mint-100 ring-luxe">
              <Image
                src={PHOTO}
                alt={`${NAME} — ${ROLE}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="object-cover object-top"
              />
            </div>
          </div>

          <div>
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
              {ROLE}
            </span>
            <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl">
              {NAME}
            </h1>

            <h2 className="mt-10 font-display text-2xl font-medium text-ink-900">
              Специализация
            </h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {SPECIALIZATIONS.map((s) => (
                <li key={s} className="flex gap-3 text-ink-700">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
                  >
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-10 rounded-2xl border-l-4 border-mint-500 bg-white/60 p-6 font-display text-lg leading-relaxed text-ink-700 ring-1 ring-foreground/5 shadow-soft md:text-xl">
              «Большинство зубов можно сохранить — даже те, которые
              в&nbsp;других клиниках советуют удалить. Микроскоп позволяет
              видеть то, что не&nbsp;видно глазом, и&nbsp;работать точнее.»
            </blockquote>
          </div>
        </div>

        <section className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe md:mt-20">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1fr_1fr] md:gap-12 md:p-12">
            <div>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
                Запись
              </span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
                Записаться к&nbsp;Марине Мовсесовне
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Оставьте заявку — администратор перезвонит в&nbsp;течение часа
                и&nbsp;подберёт удобное время.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-elevated md:p-8">
              <BookingForm />
            </div>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </div>
  );
}
