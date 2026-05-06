import { CLINIC } from "@/lib/constants/clinic";
import type {
  WithContext,
  Organization,
  MedicalClinic,
  Person,
  BreadcrumbList,
  FAQPage,
  Article,
  AggregateRating,
} from "./types";

const CLINIC_ID = `${CLINIC.domain}/#clinic`;
const ORG_ID = `${CLINIC.domain}/#organization`;

export function buildOrganization(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: CLINIC.name,
    url: CLINIC.domain,
    logo: `${CLINIC.domain}/images/logo.png`,
    sameAs: [CLINIC.social.instagram],
  };
}

function combineRatings(): AggregateRating {
  const a = CLINIC.ratings.twogis;
  const b = CLINIC.ratings.yandex;
  const totalCount = a.count + b.count;
  const weighted = (a.score * a.count + b.score * b.count) / totalCount;
  return {
    "@type": "AggregateRating",
    ratingValue: Number(weighted.toFixed(2)),
    reviewCount: totalCount,
    bestRating: 5,
    worstRating: 1,
  };
}

export function buildMedicalClinic(): WithContext<MedicalClinic> {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": CLINIC_ID,
    name: CLINIC.name,
    url: CLINIC.domain,
    telephone: CLINIC.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${CLINIC.address.street}, ${CLINIC.address.floor}`,
      addressLocality: CLINIC.address.city,
      addressRegion: CLINIC.address.region,
      postalCode: CLINIC.address.postalCode,
      addressCountry: CLINIC.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC.geo.latitude,
      longitude: CLINIC.geo.longitude,
    },
    openingHoursSpecification: CLINIC.hours.structured.map((h) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: "₽₽",
    aggregateRating: combineRatings(),
    sameAs: [CLINIC.social.instagram],
  };
}

export function buildBreadcrumbList(
  crumbs: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function buildPersonDentist(args: {
  name: string;
  jobTitle: string;
  image?: string;
  description?: string;
  alumniOf?: string;
}): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: args.name,
    jobTitle: args.jobTitle,
    image: args.image ? `${CLINIC.domain}${args.image}` : undefined,
    description: args.description,
    alumniOf: args.alumniOf,
    worksFor: {
      "@type": "Dentist",
      "@id": CLINIC_ID,
      name: CLINIC.name,
    },
  };
}

export function buildFAQPage(
  items: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question" as const,
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: it.answer,
      },
    })),
  };
}

export function buildArticle(args: {
  headline: string;
  description: string;
  image: string;
  authorName: string;
  authorJobTitle: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    image: `${CLINIC.domain}${args.image}`,
    author: {
      "@type": "Person",
      name: args.authorName,
      jobTitle: args.authorJobTitle,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: CLINIC.name,
      url: CLINIC.domain,
      logo: `${CLINIC.domain}/images/logo.png`,
    },
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": args.url,
    },
  };
}
