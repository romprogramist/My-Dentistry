import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buildArticle } from "@/lib/schema/builders";
import { getAllBlogSlugs, getBlogMeta } from "@/lib/blog";
import { CLINIC } from "@/lib/constants/clinic";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const meta = getBlogMeta(slug);
    return createPageMetadata({
      title: meta.title,
      description: meta.description,
      path: `/blog/${slug}/`,
      ogImage: meta.image,
    });
  } catch {
    return createPageMetadata({
      title: "Статья не найдена",
      description: "",
      path: `/blog/${slug}/`,
      noIndex: true,
    });
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let meta;
  try {
    meta = getBlogMeta(slug);
  } catch {
    notFound();
  }

  const Mdx = (await import(`@/content/blog/${slug}.mdx`)).default;

  const schema = buildArticle({
    headline: meta.title,
    description: meta.description,
    image: meta.image,
    authorName: meta.authorName,
    authorJobTitle: meta.authorRole,
    datePublished: meta.date,
    url: `${CLINIC.domain}/blog/${slug}/`,
  });

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Блог", href: "/blog/" },
          { name: meta.title, href: `/blog/${slug}/` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {meta.category}
        </span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">{meta.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {meta.authorName} · {meta.authorRole} ·{" "}
          {new Date(meta.date).toLocaleDateString("ru-RU")}
        </p>
        <div className="prose prose-slate mt-8 max-w-none">
          <Mdx />
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
