import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function HomeMicroscope() {
  return (
    <section className="bg-brand-50 py-12 md:py-16">
      <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            УНИКАЛЬНОЕ В СОЧИ
          </span>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Эндодонтия под микроскопом
          </h2>
          <p className="mt-4 text-muted-foreground">
            Дентальный микроскоп даёт увеличение до 25× — врач видит каждый
            канал и микротрещину. Это позволяет лечить даже сложные случаи и
            спасать зубы, которые в других клиниках предлагают удалить.
          </p>
          <Link
            href="/uslugi/endodontiya-pod-mikroskopom/"
            className={`${buttonVariants()} mt-6 inline-flex`}
          >
            Узнать больше
          </Link>
        </div>
        <div className="aspect-[4/3] rounded-2xl bg-slate-200">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Фото микроскопа в кабинете
          </div>
        </div>
      </div>
    </section>
  );
}
