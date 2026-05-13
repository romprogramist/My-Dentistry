import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Блог", href: "/blog/" }]} />
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            Блог
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Статьи и&nbsp;инструкции
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            О&nbsp;стоматологии простым языком: лечение, протезирование,
            имплантация, профилактика.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="group relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-elevated md:p-7"
            >
              <ArrowUpRight
                className="absolute right-6 top-6 size-5 text-muted-foreground/30 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-700"
                aria-hidden="true"
              />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-mint-700">
                {p.category}
              </span>
              <h2 className="mt-3 pr-8 font-display text-xl font-medium leading-snug text-ink-900 md:text-2xl">
                {p.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <p className="mt-5 border-t border-foreground/5 pt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {p.authorName} · {new Date(p.date).toLocaleDateString("ru-RU")}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
