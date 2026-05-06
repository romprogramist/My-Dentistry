import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildPersonDentist } from "@/lib/schema/builders";

const NAME = "Хечоян Армен Араратович";
const ROLE = "Врач-стоматолог-ортопед";
const SLUG = "khechoyan-armen-aratovich";

export const metadata = createPageMetadata({
  title: `${NAME} — стоматолог-ортопед в Сочи`,
  description:
    "Хечоян Армен Араратович — врач-стоматолог-ортопед клиники «Моя Стоматология» в Сочи. Протезирование зубов: коронки, виниры, мосты, протезы на имплантах.",
  path: `/vrachi/${SLUG}/`,
});

const SCHEMA = buildPersonDentist({
  name: NAME,
  jobTitle: ROLE,
  description:
    "Врач-стоматолог-ортопед, специализация — протезирование зубов.",
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
              <li>
                ✓ Протезирование зубов: коронки металлокерамика, цирконий, E.max
              </li>
              <li>✓ Виниры (керамические, E.max)</li>
              <li>✓ Съёмные и бюгельные протезы</li>
              <li>✓ Протезирование на имплантах</li>
              <li>✓ Восстановление зубов на штифтах и культевых вкладках</li>
            </ul>

            <p className="mt-8 text-muted-foreground italic">
              «Хорошая работа должна служить пациенту годами. Я стараюсь, чтобы
              каждая коронка была не просто красивой, а удобной для жевания и
              комфортной для дёсен.»
            </p>
          </div>
        </div>

        <section className="mt-12 rounded-lg bg-slate-50 p-6">
          <h2 className="text-xl font-bold">Записаться к Армену Араратовичу</h2>
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
