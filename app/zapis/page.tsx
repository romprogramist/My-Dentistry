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
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Запись", href: "/zapis/" }]} />
      <section className="container mx-auto max-w-md px-4 py-10 md:py-20">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-foreground/5 shadow-luxe md:p-10">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
