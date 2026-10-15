import { ArrowUp, MapPin, Phone } from 'lucide-react';
import BrandIcon from '@/components/icons/BrandIcon';
import {
  mailHref,
  mapHref,
  site,
  socialLinks,
  telHref,
} from '@/site';

const quickLinks = site.navigation;

export default function Footer() {
  const year = new Date().getFullYear().toLocaleString('fa-IR');

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950 pt-16 pb-28 text-ink-300 lg:pb-10">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.1]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* برند */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-teal-deep to-teal-brand text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path
                    d="M3 13h3.2l1.9-5.4 2.6 9.8 2.1-6.2 1.4 3.4H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-[15px] font-bold text-white">{site.brand.nameFa}</span>
                <span className="block text-[12px] text-teal-soft/85">{site.brand.role}</span>
              </span>
            </div>

            <p className="mt-5 text-[13.5px] leading-relaxed">{site.brand.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-soft/45 hover:text-white"
                >
                  <BrandIcon name={s.key} className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* دسترسی سریع */}
          <nav aria-label="دسترسی سریع" className="lg:col-span-2">
            <h2 className="text-[13px] font-bold text-white">دسترسی سریع</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-[13.5px] transition-colors hover:text-teal-soft"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* خدمات */}
          <nav aria-label="خدمات" className="lg:col-span-3">
            <h2 className="text-[13px] font-bold text-white">خدمات</h2>
            <ul className="mt-4 space-y-2.5">
              {site.services.map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="text-[13.5px] transition-colors hover:text-teal-soft">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* تماس */}
          <div className="lg:col-span-3">
            <h2 className="text-[13px] font-bold text-white">تماس</h2>
            <ul className="mt-4 space-y-3 text-[13.5px]">
              <li>
                <a href={telHref} className="tabular flex items-center gap-2 hover:text-teal-soft">
                  <Phone className="h-4 w-4 text-teal-soft/80" />
                  {site.contact.telDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailHref('درخواست اطلاعات', 'سلام.\n\n')}
                  className="flex items-center gap-2 hover:text-teal-soft"
                >
                  <span className="grid h-4 w-4 place-items-center text-teal-soft/80">@</span>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-teal-soft"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-soft/80" />
                  {site.contact.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* شماره‌های رسمی */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 text-[12px]">
          <p className="tabular">
            {(site.brand.medicalCouncilNumber || site.brand.clinicLicense) && (
              <>
                {site.brand.medicalCouncilNumber && <>شماره نظام پزشکی: {site.brand.medicalCouncilNumber} · </>}
                {site.brand.clinicLicense && <>پروانه مطب: {site.brand.clinicLicense} · </>}
              </>
            )}
            © {year} — همهٔ حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <p className="max-w-md text-[11.5px] leading-relaxed text-ink-500">
              مطالب این صفحه آموزشی است و جایگزین معاینهٔ پزشک نیست. در اورژانس با ۱۱۵ تماس بگیرید.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 text-white transition-colors hover:border-teal-soft/50"
              aria-label="بازگشت به بالا"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
