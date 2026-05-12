import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FEATURED_SERVICES, type Service } from "@/lib/constants/services";

function priceLabel(s: Service): string {
  if (s.priceTo)
    return `${s.priceFrom.toLocaleString("ru-RU")}–${s.priceTo.toLocaleString("ru-RU")} ₽`;
  return `от ${s.priceFrom.toLocaleString("ru-RU")} ₽`;
}

export function HomeServices() {
  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">Ключевые услуги</h2>
          <Link
            href="/uslugi/"
            className={buttonVariants({ variant: "ghost" })}
          >
            Все услуги <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURED_SERVICES.map((s) => (
            <Card
              key={s.slug}
              className="flex flex-col p-5 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {s.description}
              </p>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-semibold text-brand-700">
                  {priceLabel(s)}
                </span>
                <Link
                  href={`/uslugi/${s.slug}/`}
                  className="text-sm font-semibold text-brand-700 hover:underline"
                >
                  Подробнее →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
