import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getAllBlogMeta } from "@/lib/blog";

export const metadata = createPageMetadata({
  title: "Блог стоматологии",
  description:
    "Полезные статьи о лечении и профилактике. Эндодонтия под микроскопом, имплантация, протезирование, налоговый вычет за лечение.",
  path: "/blog/",
});

export default function BlogIndex() {
  const posts = getAllBlogMeta();
  return (
    <>
      <Breadcrumbs items={[{ name: "Блог", href: "/blog/" }]} />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Блог</h1>
        <p className="mt-2 text-muted-foreground">
          Статьи о стоматологии: лечение, протезирование, имплантация,
          профилактика.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <Card key={p.slug}>
              <Link
                href={`/blog/${p.slug}/`}
                className="block p-5 transition-shadow hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {p.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {p.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {p.authorName} ·{" "}
                  {new Date(p.date).toLocaleDateString("ru-RU")}
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
