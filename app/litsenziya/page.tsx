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
    <>
      <Breadcrumbs items={[{ name: "Лицензия", href: "/litsenziya/" }]} />
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-bold md:text-4xl">Медицинская лицензия</h1>
        <p className="mt-6">
          Клиника осуществляет медицинскую деятельность на основании бессрочной
          лицензии Министерства здравоохранения Российской Федерации.
        </p>

        <dl className="mt-8 grid gap-3 rounded-lg border p-6">
          <div>
            <dt className="font-semibold">Юридическое лицо</dt>
            <dd className="text-muted-foreground">{CLINIC.legalName}</dd>
          </div>
          <div>
            <dt className="font-semibold">ОГРН</dt>
            <dd className="text-muted-foreground">{CLINIC.ogrn}</dd>
          </div>
          <div>
            <dt className="font-semibold">Номер лицензии</dt>
            <dd className="text-muted-foreground">{CLINIC.license.number}</dd>
          </div>
          <div>
            <dt className="font-semibold">Срок действия</dt>
            <dd className="text-muted-foreground">Бессрочная</dd>
          </div>
          <div>
            <dt className="font-semibold">Адрес осуществления деятельности</dt>
            <dd className="text-muted-foreground">{CLINIC.address.full}</dd>
          </div>
        </dl>

        <p className="mt-8 text-sm text-muted-foreground">
          Скан лицензии будет размещён здесь после получения от заказчика.
        </p>
      </article>
    </>
  );
}
