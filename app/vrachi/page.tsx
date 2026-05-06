import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Наши врачи",
  description:
    "Команда стоматологии «Моя Стоматология» в Сочи: ортопед, терапевт. Опытные врачи с многолетним стажем и отзывами пациентов.",
  path: "/vrachi/",
});

const DOCTORS = [
  {
    slug: "khechoyan-armen-aratovich",
    name: "Хечоян Армен Араратович",
    role: "Врач-стоматолог-ортопед",
  },
  {
    slug: "navasardyan-marine-movsesovna",
    name: "Навасардян Марине Мовсесовна",
    role: "Врач-стоматолог-терапевт",
  },
];

export default function DoctorsIndex() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Врачи", href: "/vrachi/" }]} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold md:text-4xl">Наши врачи</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {DOCTORS.map((d) => (
            <Card key={d.slug} className="overflow-hidden">
              <Link
                href={`/vrachi/${d.slug}/`}
                className="block p-5 transition-colors hover:bg-slate-50"
              >
                <div className="flex gap-4">
                  <div className="h-32 w-32 flex-shrink-0 rounded-lg bg-slate-200" />
                  <div>
                    <h2 className="text-lg font-semibold">{d.name}</h2>
                    <p className="text-sm text-brand-700">{d.role}</p>
                    <span className="mt-3 inline-block text-sm text-muted-foreground">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
