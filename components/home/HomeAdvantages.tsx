import { Microscope, Wrench, Shield, CreditCard } from "lucide-react";

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
    icon: Shield,
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
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">
        Почему выбирают нас
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="rounded-lg border bg-white p-6">
            <item.icon className="h-10 w-10 text-brand-600" />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
