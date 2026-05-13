import Link from "next/link";
import { ArrowRight, Check, CreditCard } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Рассрочка и оплата",
  description:
    "Рассрочка через Т-Банк (одна заявка — 5 банков), оплата долями, налоговый вычет 13%. Все способы оплаты.",
  path: "/rassrochka-i-oplata/",
});

const METHODS = [
  "Наличные",
  "Банковская карта",
  "Система быстрых платежей (СБП)",
  "QR-код",
  "Рассрочка / кредит",
];

export default function RassrochkaPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[{ name: "Рассрочка и оплата", href: "/rassrochka-i-oplata/" }]}
      />
      <article className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            <CreditCard className="size-3.5" aria-hidden="true" /> Оплата
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Рассрочка и&nbsp;способы оплаты
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Делаем лечение доступным. Рассрочка от&nbsp;Т-Банка, оплата долями,
            налоговый вычет 13% — выберите удобный вариант.
          </p>
        </div>

        <section className="mt-12 rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft md:p-8">
          <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
            Рассрочка от&nbsp;Т-Банка
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-700 md:text-base">
            Одна заявка — рассмотрение в&nbsp;5 банках сразу. Решение приходит
            обычно в&nbsp;течение 10–15 минут. Помогаем заполнить заявку прямо
            в&nbsp;клинике.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Доступная сумма зависит от&nbsp;вашей кредитной истории. Особенно
            удобно для имплантации и&nbsp;комплексного протезирования.
          </p>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft md:p-8">
          <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
            Оплата долями
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-700 md:text-base">
            Можно разбить оплату на&nbsp;4 равных платежа без процентов и&nbsp;переплат.
            Подходит для лечения от&nbsp;10&nbsp;000&nbsp;₽.
          </p>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft md:p-8">
          <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
            Налоговый вычет 13%
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-700 md:text-base">
            Каждый налогоплательщик может вернуть 13% от&nbsp;стоимости лечения.
            Для сложного лечения (например, имплантация) — ограничение
            по&nbsp;сумме не&nbsp;действует, можно вернуть 13% от&nbsp;полной
            стоимости.
          </p>
          <Link
            href="/nalogovyy-vychet/"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
          >
            Подробная инструкция как получить вычет
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Способы оплаты
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {METHODS.map((m) => (
              <li
                key={m}
                className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
                >
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-[15px] font-medium text-ink-900">{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 p-8 ring-1 ring-foreground/5 shadow-luxe md:p-12">
          <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
            Запишитесь на&nbsp;бесплатную консультацию
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Обсудим план лечения и&nbsp;подберём удобный для вас способ оплаты.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants({ size: "lg" })} mt-6`}
          >
            Записаться
            <ArrowRight className="ml-1 size-5 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </section>
      </article>
    </div>
  );
}
