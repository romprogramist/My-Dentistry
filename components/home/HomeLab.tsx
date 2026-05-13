import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const POINTS = [
  "Срок изготовления коронки — от 5 дней",
  "Прямой диалог техника и врача — никаких потерь в коммуникации",
  "Бесплатная подгонка при необходимости",
];

export function HomeLab() {
  return (
    <section className="bg-ivory-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-sand-100 via-transparent to-brand-100/40 blur-2xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-slate-200 ring-luxe md:aspect-[5/6]">
              <Image
                src="/media/clinic/reception-wide.webp"
                alt="Интерьер клиники «Моя Стоматология»"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 hidden rounded-2xl bg-white p-5 shadow-luxe ring-1 ring-foreground/5 backdrop-blur md:block">
              <div className="font-display text-3xl font-medium text-ink-900">5–10</div>
              <div className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                Дней на коронку
              </div>
            </div>
          </div>
          <div>
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-sand-700">
              Лаборатория
            </span>
            <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
              Своя зуботехническая база
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              У нас есть собственный зубной техник, работающий эксклюзивно
              с&nbsp;клиникой. Коронки, мосты и&nbsp;виниры готовы за&nbsp;5–10
              дней — без посредников, с&nbsp;прямым контролем качества
              и&nbsp;подгонкой по&nbsp;месту.
            </p>
            <ul className="mt-7 space-y-3.5">
              {POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink-700">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
                  >
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/laboratoriya/"
              className={`${buttonVariants({ size: "lg" })} mt-8`}
            >
              Подробнее о лаборатории
              <ArrowRight className="ml-1 size-5 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
