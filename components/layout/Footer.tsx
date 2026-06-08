import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants/clinic";
import { ToothMark } from "./ToothMark";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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
    <footer className="relative overflow-hidden bg-ink-900 text-white/85">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 100% 0%, rgba(6,182,212,0.12) 0%, transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(56,189,248,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="container relative mx-auto grid gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-mint-500 text-white shadow-[0_8px_20px_rgba(8,145,178,0.30)]"
            >
              <ToothMark className="size-[22px]" />
            </span>
            <h3 className="font-display text-2xl font-medium text-white">{CLINIC.name}</h3>
          </div>
          <p className="mt-5 max-w-sm text-pretty text-[15px] leading-relaxed text-white/70">
            Стоматология полного цикла в&nbsp;центре Сочи. Лечение, протезирование, имплантация.
            Бессрочная медицинская лицензия.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={CLINIC.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-mint-300/50 hover:text-mint-200"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
            Навигация
          </h4>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li><Link href="/uslugi/" className="text-white/80 transition-colors hover:text-mint-200">Услуги</Link></li>
            <li><Link href="/vrachi/" className="text-white/80 transition-colors hover:text-mint-200">Врачи</Link></li>
            <li><Link href="/o-klinike/" className="text-white/80 transition-colors hover:text-mint-200">О клинике</Link></li>
            <li><Link href="/blog/" className="text-white/80 transition-colors hover:text-mint-200">Блог</Link></li>
            <li><Link href="/otzyvy/" className="text-white/80 transition-colors hover:text-mint-200">Отзывы</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
            Информация
          </h4>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li><Link href="/garantiya/" className="text-white/80 transition-colors hover:text-mint-200">Гарантия 1–5 лет</Link></li>
            <li><Link href="/rassrochka-i-oplata/" className="text-white/80 transition-colors hover:text-mint-200">Рассрочка и оплата</Link></li>
            <li><Link href="/nalogovyy-vychet/" className="text-white/80 transition-colors hover:text-mint-200">Налоговый вычет 13%</Link></li>
            <li><Link href="/litsenziya/" className="text-white/80 transition-colors hover:text-mint-200">Лицензия</Link></li>
            <li><Link href="/policy/" className="text-white/80 transition-colors hover:text-mint-200">Политика конфиденциальности</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
            Контакты
          </h4>
          <div className="mt-4 space-y-3.5 text-[15px]">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-4 flex-shrink-0 text-mint-300" strokeWidth={1.8} aria-hidden="true" />
              <span className="text-white/80">{CLINIC.address.full}</span>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 size-4 flex-shrink-0 text-mint-300" strokeWidth={1.8} aria-hidden="true" />
              <div>
                {CLINIC.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="block min-h-7 font-medium text-white transition-colors hover:text-mint-200"
                  >
                    {p.display}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 size-4 flex-shrink-0 text-mint-300" strokeWidth={1.8} aria-hidden="true" />
              <div className="text-white/80">
                <p>{CLINIC.hours.weekdays}</p>
                <p>{CLINIC.hours.weekend}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 text-xs text-white/50">
          <p>{CLINIC.legalName}, ОГРН {CLINIC.ogrn}</p>
          <p>Лицензия {CLINIC.license.number}, бессрочная</p>
          <p>© {new Date().getFullYear()} {CLINIC.name}</p>
        </div>
      </div>
    </footer>
  );
}
