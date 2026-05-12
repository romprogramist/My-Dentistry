import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SERVICE_CATEGORIES } from "@/lib/constants/services";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Услуги и цены",
  description:
    "Полный прайс на услуги стоматологии в Сочи: лечение, протезирование, имплантация, хирургия. Цены от 4 000 ₽.",
  path: "/uslugi/",
});

export default function ServicesIndex() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Услуги", href: "/uslugi/" }]} />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold md:text-4xl">Наши услуги</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Стоматология полного цикла: терапия, хирургия, ортопедия, имплантация.
          Гарантия от 1 до 5 лет.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICE_CATEGORIES.map((cat) => (
            <Card
              key={cat.slug}
              className="p-5 transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{cat.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {cat.description}
              </p>
              <Link
                href={`/uslugi/${cat.slug}/`}
                className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
              >
                Подробнее →
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
