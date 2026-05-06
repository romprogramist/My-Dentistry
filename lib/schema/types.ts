export type SchemaContext = "https://schema.org";

export type WithContext<T> = T & { "@context": SchemaContext };

export type PostalAddress = {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
};

export type GeoCoordinates = {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
};

export type OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

export type AggregateRating = {
  "@type": "AggregateRating";
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
};

export type Review = {
  "@type": "Review";
  author: { "@type": "Person"; name: string };
  reviewBody: string;
  reviewRating: { "@type": "Rating"; ratingValue: number; bestRating?: number };
  datePublished?: string;
};

export type Organization = {
  "@type": "Organization";
  "@id"?: string;
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
};

export type MedicalClinic = {
  "@type": "MedicalClinic" | "Dentist";
  "@id"?: string;
  name: string;
  url: string;
  telephone: string[];
  address: PostalAddress;
  geo: GeoCoordinates;
  openingHoursSpecification: OpeningHoursSpecification[];
  priceRange?: string;
  aggregateRating?: AggregateRating;
  image?: string[];
  sameAs?: string[];
};

export type Person = {
  "@type": "Person";
  "@id"?: string;
  name: string;
  jobTitle?: string;
  image?: string;
  description?: string;
  alumniOf?: string;
  worksFor?: { "@type": "MedicalClinic" | "Dentist"; name: string; "@id"?: string };
};

export type Offer = {
  "@type": "Offer";
  price: number;
  priceCurrency: "RUB";
  availability: "https://schema.org/InStock";
};

export type Service = {
  "@type": "Service";
  serviceType: string;
  provider: { "@type": "Dentist"; name: string; "@id"?: string };
  areaServed: { "@type": "City"; name: string };
  description: string;
  offers?: Offer[];
};

export type BreadcrumbList = {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

export type FAQPage = {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>;
};

export type Article = {
  "@type": "Article";
  headline: string;
  description: string;
  image: string;
  author: Person;
  publisher: Organization;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: { "@type": "WebPage"; "@id": string };
};
