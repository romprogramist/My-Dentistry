import {
  FEATURED_SERVICES,
  SERVICE_CATEGORIES,
} from "@/lib/constants/services";

export function getServiceLabel(
  slug: string | undefined | null
): string | null {
  if (!slug) return null;
  const featured = FEATURED_SERVICES.find((s) => s.slug === slug);
  if (featured) return featured.shortTitle;
  const category = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  if (category) return category.shortTitle;
  return null;
}
