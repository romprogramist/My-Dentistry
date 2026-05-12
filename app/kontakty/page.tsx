import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Контакты",
  description: `Адрес, телефоны, часы работы стоматологии «Моя Стоматология» в Сочи. ${CLINIC.address.full}.`,
  path: "/kontakty/",
});

export default function ContactsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Контакты", href: "/kontakty/" }]} />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Контакты</h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_400px]">
          <div className="min-w-0 space-y-4">
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-brand-600" />
              <div>
                <p className="font-semibold">Адрес</p>
                <p className="text-muted-foreground">{CLINIC.address.full}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-brand-600" />
              <div>
                <p className="font-semibold">Телефоны</p>
                {CLINIC.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="block hover:text-brand-600"
                  >
                    {p.display}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-brand-600" />
              <div>
                <p className="font-semibold">Часы работы</p>
                <p className="text-muted-foreground">{CLINIC.hours.weekdays}</p>
                <p className="text-muted-foreground">{CLINIC.hours.weekend}</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] max-h-[280px] overflow-hidden rounded-lg md:aspect-auto md:h-[480px] md:max-h-[480px]">
              <iframe
                src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
                loading="lazy"
                title="Карта проезда"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <aside className="min-w-0 rounded-lg border bg-slate-50 p-6">
            <h2 className="text-xl font-bold">Записаться на приём</h2>
            <div className="mt-4">
              <BookingForm />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
