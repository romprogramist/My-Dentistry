import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Своя зуботехническая база",
  description:
    "Собственный зубной техник, работающий эксклюзивно с нашей клиникой. Коронки и протезы за 5–10 дней.",
  path: "/laboratoriya/",
});

const ADVANTAGES = [
  {
    title: "Срок изготовления коронки — 5–10 дней",
    text: "Не недели, а дни.",
  },
  {
    title: "Прямой диалог техника и врача",
    text: "Никаких потерь в коммуникации, искажений в технических картах.",
  },
  {
    title: "Контроль качества на всех этапах",
    text: "Если что-то не подходит по форме или цвету — переделываем сразу.",
  },
  {
    title: "Бесплатная подгонка",
    text: "Если коронка села не идеально — техник на связи, переделываем без доплаты.",
  },
];

const PRODUCTS = [
  "Металлокерамические коронки",
  "Циркониевые коронки",
  "Коронки и виниры из E.max (пресс-керамика)",
  "Бюгельные протезы (на кламмерах и аттачменах)",
  "Съёмные протезы (акрил, нейлон)",
  "Протезы на имплантах (балочные, телескопические)",
  "Культевые вкладки (разборные и неразборные)",
];

export default function LaboratoryPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs items={[{ name: "Лаборатория", href: "/laboratoriya/" }]} />
      <article className="container mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-sand-700">
            Лаборатория
          </span>
          <h1 className="mt-3 font-display text-balance text-4xl font-medium leading-[1.05] text-ink-900 md:text-5xl lg:text-[3.4rem]">
            Своя зуботехническая база
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Большинство стоматологий заказывают коронки и&nbsp;протезы
            у&nbsp;внешних лабораторий. Это значит: пациент ждёт 3–4 недели,
            врач не&nbsp;может контролировать качество в&nbsp;процессе,
            переделки растягиваются на&nbsp;месяц.
          </p>
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-700 md:text-lg">
            У&nbsp;нас другой подход: мы&nbsp;работаем с&nbsp;собственным зубным
            техником, который делает работы только для нашей клиники.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {ADVANTAGES.map((a, idx) => (
            <div
              key={a.title}
              className="relative rounded-2xl bg-white p-6 ring-1 ring-foreground/5 shadow-soft md:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 font-display text-xs font-medium text-white"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-medium leading-snug text-ink-900 md:text-xl">
                {a.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {a.text}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-medium leading-tight text-ink-900 md:text-4xl">
            Что мы делаем
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {PRODUCTS.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/5 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-mint-50 text-mint-700 ring-1 ring-mint-100"
                >
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-[15px] text-ink-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-mint-50 via-white to-brand-50 p-8 ring-1 ring-foreground/5 shadow-luxe md:p-12">
          <h2 className="font-display text-2xl font-medium leading-tight text-ink-900 md:text-3xl">
            Хотите узнать подробнее?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Запишитесь на&nbsp;бесплатную консультацию — обсудим вашу ситуацию,
            покажем варианты, посчитаем стоимость и&nbsp;сроки.
          </p>
          <Link
            href="/zapis/"
            className={`${buttonVariants({ size: "lg" })} mt-6`}
          >
            Записаться на консультацию
            <ArrowRight className="ml-1 size-5 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </section>
      </article>
    </div>
  );
}
