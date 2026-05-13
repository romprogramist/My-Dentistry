"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";
import { REVIEWS } from "@/content/reviews";

export function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sand-100 via-ivory-50 to-brand-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
              Отзывы
            </span>
            <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
              Отзывы пациентов
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[15px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium text-ink-900 shadow-soft ring-1 ring-foreground/5 backdrop-blur">
                <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                <strong className="font-semibold">{CLINIC.ratings.twogis.score}</strong>
                <span className="text-muted-foreground">· 2ГИС · {CLINIC.ratings.twogis.count}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium text-ink-900 shadow-soft ring-1 ring-foreground/5 backdrop-blur">
                <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                <strong className="font-semibold">{CLINIC.ratings.yandex.score}</strong>
                <span className="text-muted-foreground">· Яндекс · {CLINIC.ratings.yandex.count}</span>
              </span>
            </div>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        <div ref={emblaRef} className="mt-10 overflow-hidden md:mt-12">
          <div className="flex gap-5">
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="relative flex min-w-[280px] flex-[0_0_280px] flex-col rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 hover:shadow-elevated md:min-w-[360px] md:flex-[0_0_360px] md:p-7"
              >
                <Quote
                  className="absolute right-5 top-5 size-7 text-brand-100"
                  aria-hidden="true"
                  strokeWidth={1.2}
                />
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                  «{r.text}»
                </p>
                <p className="mt-5 border-t border-foreground/5 pt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {r.author} · {r.source === "2gis" ? "2ГИС" : "Яндекс"} · {r.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
