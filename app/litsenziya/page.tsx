import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

export const metadata = createPageMetadata({
  title: "Медицинская лицензия",
  description: `Лицензия № ${CLINIC.license.number}, бессрочная. Реквизиты ${CLINIC.legalName}, ОГРН ${CLINIC.ogrn}.`,
  path: "/litsenziya/",
});

export default function LitsenziyaPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Лицензия", href: "/litsenziya/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-10 md:py-16">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> Лицензия
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Медицинская лицензия
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Клиника осуществляет медицинскую деятельность на&nbsp;основании
            бессрочной лицензии Министерства здравоохранения Российской Федерации.
          </p>
        </div>

        <dl className="mt-10 grid gap-3 rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft md:p-8">
          {[
            ["Юридическое лицо", CLINIC.legalName],
            ["ОГРН", CLINIC.ogrn],
            ["Номер лицензии", CLINIC.license.number],
            ["Срок действия", "Бессрочная"],
            ["Адрес осуществления деятельности", CLINIC.address.full],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 border-b border-foreground/5 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
              <dd className="text-[15px] font-medium text-ink-900 sm:text-right">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm text-muted-foreground">
          Скан лицензии будет размещён здесь после получения от&nbsp;заказчика.
        </p>
      </article>
    </div>
  );
}
