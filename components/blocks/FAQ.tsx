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
    <section className="bg-ivory-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight text-ink-900 md:text-4xl lg:text-[2.7rem]">
              {title}
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
              Самые частые вопросы — отвечаем подробно.
            </p>
          </div>
          <Accordion className="mt-10 rounded-2xl bg-white p-2 ring-1 ring-foreground/5 shadow-soft md:mt-12 md:p-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="not-last:border-b not-last:border-foreground/5"
              >
                <AccordionTrigger className="px-4 py-4 text-left text-[16px] font-medium text-ink-900 transition-colors hover:bg-brand-50/40 hover:no-underline md:px-5 md:py-5 md:text-[17px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-[15px] leading-relaxed text-muted-foreground md:px-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
