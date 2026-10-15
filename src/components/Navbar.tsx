import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { bookingHref, bookingLabel, site, telHref } from '@/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  /* فقط با یک ticker روی rAF — نه setState در هر رویداد اسکرول */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* سکشن فعال با IntersectionObserver (ارزان‌تر از محاسبهٔ rect در هر اسکرول) */
  useEffect(() => {
    const nodes = site.navigation
      .map((l) => document.getElementById(l.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.6] }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  const solid = scrolled || open;

  return (
    <>
      <nav
        aria-label="ناوبری اصلی"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          solid ? 'glass shadow-[0_1px_0_rgba(15,23,42,0.06)]' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          {/* لوگو */}
          <button
            onClick={() => goTo('hero')}
            className="group flex items-center gap-3 text-start"
            aria-label={`${site.brand.nameFa} — رفتن به ابتدای صفحه`}
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl transition-colors duration-500 ${
                solid
                  ? 'bg-linear-to-br from-teal-deep to-teal-brand text-white'
                  : 'border border-white/25 bg-white/10 text-white backdrop-blur-md'
              }`}
            >
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
            <span className="hidden sm:flex flex-col leading-tight">
              <span
                className={`text-[15px] font-bold transition-colors duration-500 ${
                  solid ? 'text-ink-900' : 'text-white'
                }`}
              >
                {site.brand.nameFa}
              </span>
              <span
                className={`text-[11px] font-medium transition-colors duration-500 ${
                  solid ? 'text-teal-deep' : 'text-teal-soft'
                }`}
              >
                طب سوزنی · لیزر درمانی
              </span>
            </span>
          </button>

          {/* لینک‌ها */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {site.navigation.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                aria-current={activeSection === link.id ? 'true' : undefined}
                className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === link.id
                    ? solid
                      ? 'bg-teal-brand/10 text-teal-deep'
                      : 'bg-white/15 text-white backdrop-blur-md'
                    : solid
                      ? 'text-ink-700 hover:bg-ink-900/5 hover:text-teal-deep'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className={`hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors md:inline-flex ${
                solid ? 'text-ink-700 hover:text-teal-deep' : 'text-white/85 hover:text-white'
              }`}
            >
              <Phone className="h-4 w-4" />
              {site.contact.telDisplay}
            </a>
            <a
              href={bookingHref}
              className="btn-primary hidden rounded-xl px-5 py-2.5 text-sm font-bold lg:inline-flex"
            >
              {bookingLabel}
            </a>
            <button
              className={`grid h-10 w-10 place-items-center rounded-xl transition-colors lg:hidden ${
                solid ? 'text-ink-900 hover:bg-ink-900/5' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* منوی موبایل */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={`absolute inset-y-0 end-0 flex w-[19rem] max-w-[86vw] flex-col bg-sand-50 shadow-2xl transition-transform duration-400 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex-1 overflow-y-auto px-5 pt-24 pb-6">
            <ul className="flex flex-col gap-1.5">
              {site.navigation.map((link, i) => (
                <li key={link.id}>
                  <button
                    onClick={() => goTo(link.id)}
                    style={{ transitionDelay: open ? `${i * 35}ms` : '0ms' }}
                    className={`w-full rounded-xl px-4 py-3 text-start text-[15px] font-semibold transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-linear-to-l from-teal-deep to-teal-brand text-white'
                        : 'text-ink-800 hover:bg-ink-900/5'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="safe-bottom border-t border-ink-900/10 bg-sand-100 p-4">
            <a href={bookingHref} className="btn-primary block rounded-xl px-5 py-3 text-center text-sm font-bold">
              {bookingLabel}
            </a>
            <a
              href={telHref}
              className="mt-2 block rounded-xl border border-ink-900/10 px-5 py-2.5 text-center text-sm font-semibold text-ink-700"
            >
              {site.contact.telDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
