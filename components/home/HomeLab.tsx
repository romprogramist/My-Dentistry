import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function HomeLab() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="aspect-[4/3] rounded-2xl bg-slate-200">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото зубного техника / лаборатории
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">
            Своя зуботехническая база
          </h2>
          <p className="mt-4 text-muted-foreground">
            У нас есть собственный зубной техник, работающий эксклюзивно с
            клиникой. Это значит: коронки, мосты и виниры готовы за 5–10 дней —
            без посредников, с прямым контролем качества и подгонкой по месту.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>✓ Срок изготовления коронки — от 5 дней</li>
            <li>
              ✓ Прямой диалог техника и врача — никаких потерь в коммуникации
            </li>
            <li>✓ Бесплатная подгонка при необходимости</li>
          </ul>
          <Link
            href="/laboratoriya/"
            className={`${buttonVariants()} mt-6 inline-flex`}
          >
            Подробнее о лаборатории
          </Link>
        </div>
      </div>
    </section>
  );
}
