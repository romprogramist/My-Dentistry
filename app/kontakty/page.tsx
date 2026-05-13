import { MapPin, Phone, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/forms/BookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

export const metadata = createPageMetadata({
  title: "Контакты",
  description: `Адрес, телефоны, часы работы стоматологии «Моя Стоматология» в Сочи. ${CLINIC.address.full}.`,
  path: "/kontakty/",
});

export default function ContactsPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Контакты", href: "/kontakty/" }]} />
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Контакты
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Где нас найти
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            В&nbsp;шаговой доступности от&nbsp;центра Сочи. Парковка во&nbsp;дворе.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_420px] md:gap-12">
          <div className="min-w-0">
            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="inline-flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-mint-700 ring-1 ring-mint-100 shadow-soft">
                  <MapPin className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">Адрес</p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">
                    {CLINIC.address.full}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="inline-flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-mint-700 ring-1 ring-mint-100 shadow-soft">
                  <Phone className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">Телефоны</p>
                  {CLINIC.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block min-h-9 text-[15px] font-medium text-ink-900 transition-colors hover:text-mint-700"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <span className="inline-flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-mint-700 ring-1 ring-mint-100 shadow-soft">
                  <Clock className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">Часы работы</p>
                  <p className="mt-0.5 text-[15px] text-muted-foreground">{CLINIC.hours.weekdays}</p>
                  <p className="text-[15px] text-muted-foreground">{CLINIC.hours.weekend}</p>
                </div>
              </div>
            </div>
            <div className="relative mt-8 aspect-[4/3] max-h-[320px] overflow-hidden rounded-2xl ring-1 ring-foreground/5 shadow-soft md:aspect-auto md:h-[480px] md:max-h-[480px]">
              <iframe
                src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
                loading="lazy"
                title="Карта проезда"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <aside className="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-foreground/5 shadow-luxe md:p-8">
            <BookingForm />
          </aside>
        </div>
      </section>
    </div>
  );
}
