import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildFAQPage } from "@/lib/schema/builders";

export type FAQItem = { question: string; answer: string };

export function FAQ({
  items,
  title = "Частые вопросы",
}: {
  items: FAQItem[];
  title?: string;
}) {
  const schema = buildFAQPage(items);
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <Accordion className="mt-6">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
