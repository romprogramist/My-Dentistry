"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/constants/clinic";
import { REVIEWS } from "@/content/reviews";

export function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Отзывы пациентов</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ★ {CLINIC.ratings.twogis.score} на 2ГИС (
              {CLINIC.ratings.twogis.count} отзывов) · ★{" "}
              {CLINIC.ratings.yandex.score} на Яндексе (
              {CLINIC.ratings.yandex.count} отзывов)
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Предыдущий"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Следующий"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4">
            {REVIEWS.map((r, i) => (
              <Card
                key={i}
                className="min-w-[280px] flex-[0_0_280px] p-5 md:min-w-[360px] md:flex-[0_0_360px]"
              >
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm">{r.text}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {r.author} · {r.source === "2gis" ? "2ГИС" : "Яндекс"} ·{" "}
                  {r.date}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
