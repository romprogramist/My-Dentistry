import type { Metadata } from "next";
import { CLINIC } from "@/lib/constants/clinic";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

const TITLE_SUFFIX = ` — ${CLINIC.name}`;

export function createPageMetadata(input: PageMetadataInput): Metadata {
  const url = `${CLINIC.domain}${input.path}`;
  const fullTitle = `${input.title}${TITLE_SUFFIX}`;
  const og = input.ogImage
    ? input.ogImage.startsWith("http")
      ? input.ogImage
      : `${CLINIC.domain}${input.ogImage}`
    : `${CLINIC.domain}/images/og/default.jpg`;

  const ogBase = {
    title: fullTitle,
    description: input.description,
    url,
    siteName: CLINIC.name,
    locale: "ru_RU",
    images: [{ url: og, width: 1200, height: 630, alt: fullTitle }],
  };
  const openGraph =
    input.ogType === "article"
      ? {
          ...ogBase,
          type: "article" as const,
          publishedTime: input.publishedTime,
          authors: input.authors,
        }
      : { ...ogBase, type: "website" as const };

  return {
    // absolute обходит title.template из layout.tsx, иначе бренд клеится дважды.
    // Так бренд ровно один раз на всех страницах, включая главную (к ней шаблон не применяется).
    title: { absolute: fullTitle },
    description: input.description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
      images: [og],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
