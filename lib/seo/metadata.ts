import type { Metadata } from "next";
import { CLINIC } from "@/lib/constants/clinic";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
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

  return {
    title: fullTitle,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url,
      siteName: CLINIC.name,
      type: "website",
      locale: "ru_RU",
      images: [{ url: og, width: 1200, height: 630, alt: fullTitle }],
    },
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
