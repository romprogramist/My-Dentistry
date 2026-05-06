import { MapPin, Phone, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { BookingForm } from "@/components/forms/BookingForm";

export function HomeContact() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">
        Записаться или приехать
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 flex-shrink-0 text-brand-600" />
            <div>
              <p className="font-semibold">Адрес</p>
              <p className="text-sm text-muted-foreground">
                {CLINIC.address.full}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 flex-shrink-0 text-brand-600" />
            <div>
              <p className="font-semibold">Телефоны</p>
              {CLINIC.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="block text-sm hover:text-brand-600"
                >
                  {p.display}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 flex-shrink-0 text-brand-600" />
            <div>
              <p className="font-semibold">Часы работы</p>
              <p className="text-sm text-muted-foreground">
                {CLINIC.hours.weekdays}
              </p>
              <p className="text-sm text-muted-foreground">
                {CLINIC.hours.weekend}
              </p>
            </div>
          </div>
          <iframe
            src={`https://yandex.ru/map-widget/v1/?ll=${CLINIC.geo.longitude}%2C${CLINIC.geo.latitude}&z=17&pt=${CLINIC.geo.longitude},${CLINIC.geo.latitude}`}
            width="100%"
            height="320"
            allowFullScreen
            loading="lazy"
            title="Карта проезда"
            className="rounded-lg"
          />
        </div>

        <div className="rounded-lg border bg-slate-50 p-6">
          <h3 className="text-lg font-semibold">Запишитесь онлайн</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Мы перезвоним в течение часа в рабочее время.
          </p>
          <div className="mt-4">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
