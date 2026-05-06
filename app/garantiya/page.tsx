import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Гарантия 1–5 лет",
  description:
    "Гарантия от 1 года до 5 лет на разные типы работ. Сервисное наблюдение и переделка при необходимости.",
  path: "/garantiya/",
});

const TABLE = [
  { type: "Терапевтическое лечение, пломбы", years: "1 год" },
  { type: "Металлокерамические коронки", years: "2 года" },
  { type: "Циркониевые коронки, E.max", years: "3 года" },
  { type: "Виниры", years: "3 года" },
  { type: "Имплантация (имплант + установка)", years: "5 лет" },
];

export default function GarantiyaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Гарантия", href: "/garantiya/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          Гарантия от 1 до 5 лет
        </h1>
        <p className="mt-4 text-muted-foreground">
          Мы предоставляем официальную гарантию на каждый тип работ. Срок
          зависит от материала и сложности — указан в договоре. В период
          гарантии переделываем работу бесплатно при условии соблюдения
          рекомендаций по уходу.
        </p>

        <Card className="mt-8 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Тип работ</th>
                <th className="p-3 text-right">Гарантия</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row) => (
                <tr key={row.type} className="border-t">
                  <td className="p-3">{row.type}</td>
                  <td className="p-3 text-right font-semibold">{row.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <h2 className="mt-12 text-2xl font-bold">Что входит в гарантию</h2>
        <ul className="mt-4 space-y-2">
          <li>✓ Бесплатная переделка при дефекте, не зависящем от пациента</li>
          <li>✓ Бесплатные осмотры в течение всего срока гарантии</li>
          <li>
            ✓ Ведение электронной карты пациента — все работы зафиксированы
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Когда гарантия не действует</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>
            — Несоблюдение рекомендаций по уходу (нерегулярная гигиена, пропуск
            осмотров)
          </li>
          <li>— Травма зубов</li>
          <li>
            — Изменения в общем состоянии здоровья, влияющие на полость рта
          </li>
          <li>
            — Самостоятельные манипуляции пациента или вмешательство сторонних
            специалистов
          </li>
        </ul>
      </article>
    </>
  );
}
