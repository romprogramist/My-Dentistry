import Link from "next/link";
import { Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";

export function HomeHero() {
  return (
    <section className="bg-gradient-to-br from-brand-50 to-white py-16 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Стоматология полного цикла
            <br />в центре Сочи
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Безболезненное лечение, протезирование и имплантация. Своя
            зуботехническая база. Гарантия до 5 лет.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-amber-900">
              <Star className="h-4 w-4 fill-current" /> {CLINIC.ratings.twogis.score} ·
              2ГИС ({CLINIC.ratings.twogis.count})
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-amber-900">
              <Star className="h-4 w-4 fill-current" /> {CLINIC.ratings.yandex.score} ·
              Яндекс ({CLINIC.ratings.yandex.count})
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/zapis/"
              className={buttonVariants({ size: "lg" })}
            >
              Записаться на приём
            </Link>
            <Link
              href="/uslugi/"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Услуги и цены
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 md:aspect-square">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото клиники
          </div>
        </div>
      </div>
    </section>
  );
}
