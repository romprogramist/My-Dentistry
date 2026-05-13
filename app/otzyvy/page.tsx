import { ArrowUpRight, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReviewsCarousel } from "@/components/blocks/ReviewsCarousel";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

export const metadata = createPageMetadata({
  title: "Отзывы пациентов",
  description: `★ ${CLINIC.ratings.twogis.score} на 2ГИС, ★ ${CLINIC.ratings.yandex.score} на Яндексе. Более 100 реальных отзывов с ${CLINIC.founded} года.`,
  path: "/otzyvy/",
});

export default function OtzyvyPage() {
  const totalReviews =
    CLINIC.ratings.twogis.count + CLINIC.ratings.yandex.count;
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Отзывы", href: "/otzyvy/" }]} />
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Отзывы
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Что говорят пациенты
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Более {totalReviews} реальных отзывов на&nbsp;2ГИС
            и&nbsp;Яндекс.Картах с&nbsp;{CLINIC.founded} года. Самые частые
            слова — «безболезненно», «профессионально», «уютно».
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <a
            href="https://2gis.ru/sochi/firm/70000001037204916/tab/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated md:p-8"
          >
            <ArrowUpRight
              className="absolute right-6 top-6 size-5 text-muted-foreground/40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-700"
              aria-hidden="true"
            />
            <h2 className="font-display text-2xl font-medium text-ink-900">2ГИС</h2>
            <div className="mt-4 flex items-baseline gap-2">
              <Star className="size-6 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="font-display text-4xl font-medium text-ink-900">{CLINIC.ratings.twogis.score}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{CLINIC.ratings.twogis.count} отзывов</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-700">Все отзывы на 2ГИС</span>
          </a>

          <a
            href="https://yandex.ru/maps/org/moya_stomatologiya/158836694146/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated md:p-8"
          >
            <ArrowUpRight
              className="absolute right-6 top-6 size-5 text-muted-foreground/40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-700"
              aria-hidden="true"
            />
            <h2 className="font-display text-2xl font-medium text-ink-900">Яндекс.Карты</h2>
            <div className="mt-4 flex items-baseline gap-2">
              <Star className="size-6 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="font-display text-4xl font-medium text-ink-900">{CLINIC.ratings.yandex.score}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{CLINIC.ratings.yandex.count} отзывов</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-700">Все отзывы на Яндексе</span>
          </a>
        </div>
      </section>

      <ReviewsCarousel />
    </div>
  );
}
