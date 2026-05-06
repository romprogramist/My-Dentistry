import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Онлайн-запись",
  description:
    "Запишитесь на приём в стоматологию «Моя Стоматология» в Сочи. Мы перезвоним в течение часа в рабочее время.",
  path: "/zapis/",
});

export default function ZapisPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Запись", href: "/zapis/" }]} />
      <section className="container mx-auto max-w-md px-4 py-8 md:py-16">
        <h1 className="text-3xl font-bold">Записаться на приём</h1>
        <p className="mt-2 text-muted-foreground">
          Заполните форму — мы перезвоним в течение часа в рабочее время и
          подберём удобное время.
        </p>
        <div className="mt-6">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
