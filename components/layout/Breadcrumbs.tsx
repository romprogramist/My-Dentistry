import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { buildBreadcrumbList } from "@/lib/schema/builders";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Главная", href: "/" }, ...items];
  const schemaItems = all.map((c) => ({
    name: c.name,
    url: `${CLINIC.domain}${c.href}`,
  }));
  const schema = buildBreadcrumbList(schemaItems);

  return (
    <>
      <nav
        aria-label="Хлебные крошки"
        className="container mx-auto px-4 py-3 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                {isLast ? (
                  <span className="text-foreground" aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-brand-600">
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
