import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReviewsCarousel } from "@/components/blocks/ReviewsCarousel";
import { Card } from "@/components/ui/card";
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
    <>
      <Breadcrumbs items={[{ name: "Отзывы", href: "/otzyvy/" }]} />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Отзывы пациентов</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Более {totalReviews} реальных отзывов на 2ГИС и Яндекс.Картах с{" "}
          {CLINIC.founded} года. Самые частые слова — «безболезненно»,
          «профессионально», «уютно».
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold">2ГИС</h2>
            <p className="mt-2 text-3xl font-bold text-amber-500">
              ★ {CLINIC.ratings.twogis.score}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {CLINIC.ratings.twogis.count} отзывов
            </p>
            <a
              href="https://2gis.ru/sochi/firm/70000001037204916/tab/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
            >
              Все отзывы на 2ГИС →
            </a>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">Яндекс.Карты</h2>
            <p className="mt-2 text-3xl font-bold text-amber-500">
              ★ {CLINIC.ratings.yandex.score}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {CLINIC.ratings.yandex.count} отзывов
            </p>
            <a
              href="https://yandex.ru/maps/org/moya_stomatologiya/158836694146/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
            >
              Все отзывы на Яндексе →
            </a>
          </Card>
        </div>
      </section>

      <ReviewsCarousel />
    </>
  );
}
