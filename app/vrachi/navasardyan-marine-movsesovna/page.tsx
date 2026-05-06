import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildPersonDentist } from "@/lib/schema/builders";

const NAME = "Навасардян Марине Мовсесовна";
const ROLE = "Врач-стоматолог-терапевт";
const SLUG = "navasardyan-marine-movsesovna";

export const metadata = createPageMetadata({
  title: `${NAME} — стоматолог-терапевт в Сочи`,
  description:
    "Навасардян Марине Мовсесовна — врач-стоматолог-терапевт клиники «Моя Стоматология» в Сочи. Лечение кариеса, эндодонтия под микроскопом, реставрация зубов.",
  path: `/vrachi/${SLUG}/`,
});

const SCHEMA = buildPersonDentist({
  name: NAME,
  jobTitle: ROLE,
  description:
    "Врач-стоматолог-терапевт, специализация — лечение кариеса и эндодонтия под микроскопом.",
});

export default function DoctorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Врачи", href: "/vrachi/" },
          { name: NAME, href: `/vrachi/${SLUG}/` },
        ]}
      />

      <article className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="aspect-[3/4] rounded-2xl bg-slate-200">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Фото врача
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{NAME}</h1>
            <p className="mt-2 text-lg text-brand-700">{ROLE}</p>

            <h2 className="mt-8 text-xl font-bold">Специализация</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li>✓ Лечение кариеса любой сложности</li>
              <li>
                ✓ Эндодонтия под микроскопом — лечение и перелечивание каналов
              </li>
              <li>✓ Лечение пульпита и периодонтита</li>
              <li>✓ Художественная реставрация передних зубов</li>
              <li>✓ Профессиональная гигиена полости рта</li>
            </ul>

            <p className="mt-8 text-muted-foreground italic">
              «Большинство зубов можно сохранить — даже те, которые в других
              клиниках советуют удалить. Микроскоп позволяет видеть то, что не
              видно глазом, и работать точнее.»
            </p>
          </div>
        </div>

        <section className="mt-12 rounded-lg bg-slate-50 p-6">
          <h2 className="text-xl font-bold">Записаться к Марине Мовсесовне</h2>
          <div className="mx-auto mt-4 max-w-md">
            <BookingForm />
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </>
  );
}
