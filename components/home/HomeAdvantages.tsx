import { Microscope, Wrench, ShieldCheck, CreditCard } from "lucide-react";

const ITEMS = [
  {
    icon: Microscope,
    title: "Эндодонтия под микроскопом",
    text: "Спасаем зубы, которые в других клиниках предлагают удалить.",
  },
  {
    icon: Wrench,
    title: "Свой зубной техник",
    text: "Коронка готова за 5–10 дней. Прямой контроль качества.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия от 1 до 5 лет",
    text: "На каждый тип работ — официальная гарантия и сервисное наблюдение.",
  },
  {
    icon: CreditCard,
    title: "Рассрочка и налоговый вычет",
    text: "Т-Банк, оплата долями, помощь с возвратом 13%.",
  },
];

export function HomeAdvantages() {
  return (
    <section className="bg-ivory-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Почему мы
          </span>
          <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
            Четыре причины выбрать нас
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
            Мы делаем стоматологию, после которой не хочется идти в&nbsp;другую клинику.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className="group relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated md:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 font-display text-xs font-medium text-white"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-mint-50 ring-1 ring-brand-100/60 transition-transform duration-500 group-hover:scale-110">
                <item.icon className="size-6 text-brand-700" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium leading-snug text-ink-900">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
