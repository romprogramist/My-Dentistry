import Link from "next/link";
import { Card } from "@/components/ui/card";

const DOCTORS = [
  {
    slug: "khechoyan-armen-aratovich",
    name: "Хечоян Армен Араратович",
    role: "Врач-стоматолог-ортопед",
    bio: "Специализация — протезирование зубов: коронки, виниры, мосты, протезы на имплантах. Особо отмечается пациентами в отзывах.",
  },
  {
    slug: "navasardyan-marine-movsesovna",
    name: "Навасардян Марине Мовсесовна",
    role: "Врач-стоматолог-терапевт",
    bio: "Терапевтическое лечение зубов, эндодонтия под микроскопом, лечение каналов любой сложности.",
  },
];

export function HomeDoctors() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">Наши врачи</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {DOCTORS.map((d) => (
          <Card key={d.slug} className="overflow-hidden">
            <Link
              href={`/vrachi/${d.slug}/`}
              className="flex gap-4 p-5 transition-colors hover:bg-slate-50"
            >
              <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-slate-200" />
              <div>
                <h3 className="font-semibold">{d.name}</h3>
                <p className="text-sm text-brand-700">{d.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d.bio}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
