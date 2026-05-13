import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CLINIC } from "@/lib/constants/clinic";

export const metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных в соответствии с 152-ФЗ.",
  path: "/policy/",
  noIndex: true,
});

export default function PolicyPage() {
  return (
    <div className="bg-ivory-gradient">
      <Breadcrumbs
        items={[{ name: "Политика конфиденциальности", href: "/policy/" }]}
      />
      <article className="container mx-auto max-w-3xl px-4 py-10 md:py-16">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-mint-700">
          Юридическое
        </span>
        <h1 className="mt-3 font-display text-balance text-3xl font-medium leading-[1.1] text-ink-900 md:text-4xl lg:text-[2.7rem]">
          Политика обработки персональных данных
        </h1>
        <p className="mt-5 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Дата вступления в&nbsp;силу: 01.01.2026
        </p>

        <p className="mt-6">
          {CLINIC.legalName} (далее — «Клиника»), ОГРН {CLINIC.ogrn},
          расположенная по адресу {CLINIC.address.full}, обрабатывает
          персональные данные пользователей сайта {CLINIC.domain} (далее —
          «Сайт») в соответствии с настоящей Политикой и Федеральным законом
          № 152-ФЗ «О персональных данных».
        </p>

        <h2 className="mt-10 font-display text-2xl font-medium leading-tight text-ink-900">1. Цели обработки</h2>
        <p className="mt-2">
          Персональные данные пользователя обрабатываются для следующих целей:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
          <li>Запись на приём в Клинику</li>
          <li>Связь с пользователем по вопросам, связанным с записью</li>
          <li>Информирование пользователя о статусе его обращения</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl font-medium leading-tight text-ink-900">2. Состав обрабатываемых данных</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
          <li>Фамилия и имя</li>
          <li>Номер телефона</li>
          <li>Сообщение, оставленное пользователем</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl font-medium leading-tight text-ink-900">3. Передача третьим лицам</h2>
        <p className="mt-2 text-sm">
          Клиника не передаёт персональные данные третьим лицам, кроме случаев,
          прямо предусмотренных законодательством РФ.
        </p>

        <h2 className="mt-10 font-display text-2xl font-medium leading-tight text-ink-900">4. Срок хранения</h2>
        <p className="mt-2 text-sm">
          Персональные данные хранятся в течение 3 лет с момента последнего
          обращения. По запросу пользователя данные могут быть удалены раньше
          этого срока.
        </p>

        <h2 className="mt-10 font-display text-2xl font-medium leading-tight text-ink-900">5. Права пользователя</h2>
        <p className="mt-2 text-sm">
          Пользователь имеет право запросить информацию о своих персональных
          данных, потребовать их изменения или удаления. Для этого нужно
          отправить запрос на телефон {CLINIC.phones[0]?.display}.
        </p>

        <h2 className="mt-10 font-display text-2xl font-medium leading-tight text-ink-900">
          6. Контактные данные оператора
        </h2>
        <p className="mt-2 text-sm">
          {CLINIC.legalName}, ОГРН {CLINIC.ogrn}, адрес: {CLINIC.address.full}.
          Телефон: {CLINIC.phones[0]?.display}.
        </p>
      </article>
    </div>
  );
}
