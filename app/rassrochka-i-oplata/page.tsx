import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Рассрочка и оплата",
  description:
    "Рассрочка через Т-Банк (одна заявка — 5 банков), оплата долями, налоговый вычет 13%. Все способы оплаты.",
  path: "/rassrochka-i-oplata/",
});

export default function RassrochkaPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Рассрочка и оплата", href: "/rassrochka-i-oplata/" }]}
      />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          Рассрочка и способы оплаты
        </h1>

        <h2 className="mt-12 text-2xl font-bold">Рассрочка от Т-Банка</h2>
        <p className="mt-4">
          Одна заявка — рассмотрение в 5 банках сразу. Решение приходит обычно в
          течение 10–15 минут. Помогаем заполнить заявку прямо в клинике.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Доступная сумма зависит от вашей кредитной истории. Особенно удобно
          для имплантации и комплексного протезирования.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Оплата долями</h2>
        <p className="mt-4">
          Можно разбить оплату на 4 равных платежа без процентов и переплат.
          Подходит для лечения от 10 000 ₽.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Налоговый вычет 13%</h2>
        <p className="mt-4">
          Каждый налогоплательщик может вернуть 13% от стоимости лечения. Для
          сложного лечения (например, имплантация) — ограничение по сумме не
          действует, можно вернуть 13% от полной стоимости.
        </p>
        <Link
          href="/nalogovyy-vychet/"
          className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
        >
          Подробная инструкция как получить вычет →
        </Link>

        <h2 className="mt-12 text-2xl font-bold">Способы оплаты</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Наличные</li>
          <li>✓ Банковская карта</li>
          <li>✓ Система быстрых платежей (СБП)</li>
          <li>✓ QR-код</li>
          <li>✓ Рассрочка / кредит</li>
        </ul>

        <div className="mt-12 rounded-lg bg-brand-50 p-6">
          <p className="text-sm">
            Запишитесь на бесплатную консультацию — обсудим план лечения и
            подберём удобный для вас способ оплаты.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants()} mt-4 inline-flex`}
          >
            Записаться
          </Link>
        </div>
      </article>
    </>
  );
}
