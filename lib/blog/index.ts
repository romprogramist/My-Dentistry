import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  authorName: string;
  authorRole: string;
  image: string;
  category: string;
};

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getBlogMeta(slug: string): BlogMeta {
  const file = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data } = matter(file);
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    authorName: String(data.authorName ?? ""),
    authorRole: String(data.authorRole ?? ""),
    image: String(data.image ?? "/images/og/default.jpg"),
    category: String(data.category ?? ""),
  };
}

export function getAllBlogMeta(): BlogMeta[] {
  return getAllBlogSlugs()
    .map(getBlogMeta)
    .sort((a, b) => b.date.localeCompare(a.date));
}
