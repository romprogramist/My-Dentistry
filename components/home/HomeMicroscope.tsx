import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { VideoPlayer } from "@/components/blocks/VideoPlayer";

export function HomeMicroscope() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-mint-50 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[360px] w-[360px] rounded-full bg-mint-100/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-0 h-[360px] w-[360px] rounded-full bg-brand-100/50 blur-3xl"
      />
      <div className="container relative mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-700 to-mint-700 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-soft">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Уникальное в Сочи
          </span>
          <h2 className="mt-5 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
            Эндодонтия
            <br />
            под микроскопом
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Дентальный микроскоп даёт увеличение до&nbsp;25× — врач видит
            каждый канал и&nbsp;микротрещину. Это позволяет лечить даже
            сложные случаи и&nbsp;спасать зубы, которые в&nbsp;других клиниках
            предлагают удалить.
          </p>
          <div className="mt-7 grid max-w-md grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-foreground/5 shadow-soft backdrop-blur">
              <div className="font-display text-3xl font-medium text-ink-900">25×</div>
              <div className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                Увеличение
              </div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-foreground/5 shadow-soft backdrop-blur">
              <div className="font-display text-3xl font-medium text-ink-900">Zeiss</div>
              <div className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                Производитель
              </div>
            </div>
          </div>
          <Link
            href="/uslugi/endodontiya-pod-mikroskopom/"
            className={`${buttonVariants()} mt-8`}
          >
            Узнать больше
            <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-brand-200/40 to-mint-200/40 blur-2xl"
          />
          <div className="relative ring-luxe rounded-2xl overflow-hidden">
            <VideoPlayer
              src="/media/video/microscope"
              poster="/media/video/microscope.poster.webp"
              title="Дентальный микроскоп Zeiss в работе"
              aspectRatio="9/16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
