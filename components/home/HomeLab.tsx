import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function HomeLab() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
          <Image
            src="/media/clinic/reception-wide.webp"
            alt="Интерьер клиники «Моя Стоматология»"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            className="object-cover"
          />
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
