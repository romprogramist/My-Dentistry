import Link from "next/link";
import { CLINIC } from "@/lib/constants/clinic";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto grid gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-base font-bold text-brand-700">{CLINIC.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Стоматология полного цикла в центре Сочи. Лечение, протезирование,
            имплантация.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={CLINIC.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-brand-600"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Навигация</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/uslugi/" className="hover:text-brand-600">
                Услуги
              </Link>
            </li>
            <li>
              <Link href="/vrachi/" className="hover:text-brand-600">
                Врачи
              </Link>
            </li>
            <li>
              <Link href="/o-klinike/" className="hover:text-brand-600">
                О клинике
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="hover:text-brand-600">
                Блог
              </Link>
            </li>
            <li>
              <Link href="/otzyvy/" className="hover:text-brand-600">
                Отзывы
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Информация</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/garantiya/" className="hover:text-brand-600">
                Гарантия 1–5 лет
              </Link>
            </li>
            <li>
              <Link
                href="/rassrochka-i-oplata/"
                className="hover:text-brand-600"
              >
                Рассрочка и оплата
              </Link>
            </li>
            <li>
              <Link href="/nalogovyy-vychet/" className="hover:text-brand-600">
                Налоговый вычет 13%
              </Link>
            </li>
            <li>
              <Link href="/litsenziya/" className="hover:text-brand-600">
                Лицензия
              </Link>
            </li>
            <li>
              <Link href="/policy/" className="hover:text-brand-600">
                Политика конфиденциальности
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Контакты</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            {CLINIC.address.full}
          </p>
          <div className="mt-2 text-sm">
            {CLINIC.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="flex min-h-11 items-center hover:text-brand-600"
              >
                {p.display}
              </a>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {CLINIC.hours.weekdays}
          </p>
          <p className="text-sm text-muted-foreground">
            {CLINIC.hours.weekend}
          </p>
        </div>
      </div>

      <div className="border-t py-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 text-xs text-muted-foreground">
          <p>
            {CLINIC.legalName}, ОГРН {CLINIC.ogrn}
          </p>
          <p>Лицензия {CLINIC.license.number}, бессрочная</p>
          <p>
            © {new Date().getFullYear()} {CLINIC.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
