import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { BookingForm } from "@/components/forms/BookingForm";

const ICON_CHIP =
  "inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-mint-700 text-white shadow-[0_6px_16px_rgba(8,145,178,0.30)]";

const CARD =
  "rounded-2xl bg-white/70 p-4 ring-1 ring-foreground/5 shadow-soft backdrop-blur-sm transition-shadow duration-300 hover:shadow-elevated";

export function HomeContact() {
  const routeUrl = `https://yandex.ru/maps/?rtext=~${CLINIC.geo.latitude}%2C${CLINIC.geo.longitude}&rtt=auto`;

  return (
    <section className="bg-ivory-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-mint-50 via-white to-brand-50 ring-1 ring-foreground/5 shadow-luxe">
          <div className="grid grid-cols-1 gap-10 p-6 md:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <div className="flex min-w-0 flex-col">
              <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
                Контакты
              </span>
              <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
                Где нас найти
              </h2>
              <p className="mt-3 text-pretty text-[15px] text-muted-foreground md:text-base">
                В&nbsp;шаговой доступности от&nbsp;центра Сочи. Парковка во&nbsp;дворе.
              </p>

              {/* Map — visual hero with floating address pill and route action */}
              <div className="group relative mt-7 aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-foreground/10 shadow-elevated md:aspect-[16/12]">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
                  allowFullScreen
                  loading="lazy"
                  title="Карта проезда"
                  className="absolute inset-0 h-full w-full"
                />
                <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-2 text-sm font-semibold text-ink-900 shadow-soft ring-1 ring-black/5 backdrop-blur-md">
                  <MapPin className="size-4 text-mint-700" strokeWidth={2} aria-hidden="true" />
                  {CLINIC.address.street}
                </div>
                <a
                  href={routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900/85 px-4 py-2.5 text-sm font-semibold text-white shadow-elevated backdrop-blur-md transition-all duration-200 hover:bg-ink-900 hover:gap-2.5"
                >
                  <Navigation className="size-4" strokeWidth={2} aria-hidden="true" />
                  Маршрут
                </a>
              </div>

              {/* Contact cards */}
              <div className="mt-5 grid gap-3 xl:grid-cols-2">
                <div className={`${CARD} flex gap-3.5 xl:col-span-2`}>
                  <span className={ICON_CHIP}>
                    <MapPin className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-mint-700">
                      Адрес
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">
                      {CLINIC.address.full}
                    </p>
                  </div>
                </div>

                <div className={`${CARD} flex gap-3.5`}>
                  <span className={ICON_CHIP}>
                    <Phone className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-mint-700">
                      Телефоны
                    </p>
                    <div className="mt-1 flex flex-col">
                      {CLINIC.phones.map((p) => (
                        <a
                          key={p.tel}
                          href={`tel:${p.tel}`}
                          className="whitespace-nowrap text-[15px] font-semibold text-ink-900 transition-colors hover:text-mint-700"
                        >
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${CARD} flex gap-3.5`}>
                  <span className={ICON_CHIP}>
                    <Clock className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-mint-700">
                      Часы работы
                    </p>
                    <p className="mt-1 text-sm font-medium text-ink-900">
                      {CLINIC.hours.weekdays}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {CLINIC.hours.weekend}
                    </p>
                  </div>
                </div>
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
