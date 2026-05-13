import { MapPin, Phone, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { BookingForm } from "@/components/forms/BookingForm";

export function HomeContact() {
  return (
    <section className="bg-ivory-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe">
          <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-2 md:gap-14 md:p-10 lg:p-14">
            <div className="min-w-0">
              <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
                Контакты
              </span>
              <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
                Где нас найти
              </h2>
              <p className="mt-3 text-pretty text-[15px] text-muted-foreground md:text-base">
                В&nbsp;шаговой доступности от&nbsp;центра Сочи. Парковка во&nbsp;дворе.
              </p>

              <div className="mt-7 space-y-5">
                <div className="flex gap-4">
                  <span className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-mint-700 ring-1 ring-mint-100 shadow-soft">
                    <MapPin className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900">Адрес</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {CLINIC.address.full}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-mint-700 ring-1 ring-mint-100 shadow-soft">
                    <Phone className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900">Телефоны</p>
                    {CLINIC.phones.map((p) => (
                      <a
                        key={p.tel}
                        href={`tel:${p.tel}`}
                        className="flex min-h-9 items-center text-[15px] font-medium text-ink-900 transition-colors hover:text-mint-700"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-mint-700 ring-1 ring-mint-100 shadow-soft">
                    <Clock className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900">Часы работы</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {CLINIC.hours.weekdays}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {CLINIC.hours.weekend}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-7 aspect-[4/3] max-h-[280px] overflow-hidden rounded-2xl ring-1 ring-foreground/5 shadow-soft md:aspect-auto md:h-[400px] md:max-h-[400px]">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
                  allowFullScreen
                  loading="lazy"
                  title="Карта проезда"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>

            <div className="min-w-0 rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-elevated md:p-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
