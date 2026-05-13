import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
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
        className="container mx-auto px-4 pt-5 pb-2 text-[13px]"
      >
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground">
          {all.map((c, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5 text-foreground/30" aria-hidden="true" />}
                {isLast ? (
                  <span className="font-medium text-ink-900" aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1 transition-colors hover:text-brand-700"
                  >
                    {i === 0 && <Home className="size-3.5" aria-hidden="true" />}
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
