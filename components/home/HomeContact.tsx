import { MapPin, Phone, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { BookingForm } from "@/components/forms/BookingForm";

export function HomeContact() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="rounded-2xl bg-mint-50 p-6 md:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wider text-mint-600">
              Контакты
            </div>
            <h2 className="mt-1 text-2xl font-bold text-mint-900 md:text-3xl">
              Где нас найти
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-mint-600" />
                <div>
                  <p className="font-semibold text-mint-900">Адрес</p>
                  <p className="text-sm text-muted-foreground">
                    {CLINIC.address.full}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-mint-600" />
                <div>
                  <p className="font-semibold text-mint-900">Телефоны</p>
                  {CLINIC.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block text-sm hover:text-mint-700"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-mint-600" />
                <div>
                  <p className="font-semibold text-mint-900">Часы работы</p>
                  <p className="text-sm text-muted-foreground">
                    {CLINIC.hours.weekdays}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {CLINIC.hours.weekend}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 aspect-[4/3] max-h-[280px] overflow-hidden rounded-xl md:aspect-auto md:h-[420px] md:max-h-[420px]">
              <iframe
                src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
                allowFullScreen
                loading="lazy"
                title="Карта проезда"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          <div className="min-w-0 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
