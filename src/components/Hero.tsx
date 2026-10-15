import { useEffect, useRef } from 'react';
import { animateTitle } from '@/lib/motion';
import { ArrowLeft, Award, CalendarCheck, Phone, ShieldCheck } from 'lucide-react';
import { Icon } from '@/components/icons';
import SmartImage from '@/components/SmartImage';
import BrandIcon from '@/components/icons/BrandIcon';
import {
  bookingHref,
  bookingLabel,
  hasWhatsapp,
  site,
  socialLinks,
  telHref,
} from '@/site';

const heroAmbience =
  'https://images.pexels.com/photos/8312839/pexels-photo-8312839.jpeg?auto=compress&cs=tinysrgb&w=1200';

/** تقویم هفتگی ایران: شنبه‌تاچهارشنبه ۹–۱۸ · پنجشنبه ۹–۱۳ · جمعه تعطیل */
function openStatus(now = new Date()) {
  const day = now.getDay(); // JS: 0 یکشنبه · 4 پنجشنبه · 5 جمعه · 6 شنبه
  const hour = now.getHours() + now.getMinutes() / 60;
  const today: [number, number] | null = day === 5 ? null : day === 4 ? [9, 13] : [9, 18];

  if (!today) return { open: false, text: 'جمعه — مطب تعطیل است' };
  const [from, to] = today;
  const isOpen = hour >= from && hour < to;
  return {
    open: isOpen,
    text: isOpen
      ? `امروز تا ${to}:۰۰ باز است`
      : hour < from
        ? `امروز از ${from}:۰۰ باز می‌شود`
        : 'ساعات کاری امروز تمام شده است',
  };
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const status = openStatus();

  /* حروف‌چینی عنوان — GSAP تنبل؛ cleanup با تابع بازگشتی */
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    let dispose = () => {};
    let alive = true;
    animateTitle(el).then((fn) => {
      if (!alive) return fn();
      dispose = fn;
    });
    return () => {
      alive = false;
      dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden mesh-gradient text-white"
    >
      {/* نورهای نرم */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-24 h-[440px] w-[440px] rounded-full bg-teal-soft/12 blur-[130px] animate-glowPulse" />
        <div className="absolute bottom-1/4 -right-24 h-[380px] w-[380px] rounded-full bg-teal-brand/14 blur-[120px] animate-glowPulse [animation-delay:1.8s]" />
      </div>
      <div className="pointer-events-none absolute inset-0 medical-pattern opacity-25" />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.16]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── متن ── */}
          <div className="lg:col-span-7">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2.5 rounded-full glass-dark px-3.5 py-2 text-[13px] font-medium text-teal-soft">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full animate-ping-slow ${
                      status.open ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                      status.open ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                </span>
                {site.contact.addressShort} · {status.text}
              </span>
            </div>

            <div
              className="mb-4 flex items-center gap-4 animate-textReveal"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="h-px w-16 bg-linear-to-l from-teal-soft to-transparent animate-lineGrow" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-teal-soft">
                {site.brand.handle}
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-display font-extrabold [text-wrap:balance] overflow-hidden"
            >
              {site.hero.titleTop}{' '}
              <span className="gradient-text-light">{site.hero.titleAccent}</span>
              {site.hero.titleEnd}
            </h1>

            <p className="mt-3 text-lg font-semibold text-teal-soft/90 sm:text-xl">
              {site.brand.role}
            </p>

            <p className="text-lead mt-6 max-w-2xl text-ink-300">{site.hero.lead}</p>

            {/* سه ستون وعده */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {site.hero.pillars.map((p) => (
                <li
                  key={p.k}
                  className="rounded-2xl glass-dark px-4 py-3 transition-colors duration-300 hover:bg-white/10"
                >
                  <p className="flex items-center gap-2 text-sm font-bold text-white">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-teal-soft" />
                    {p.k}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-300">{p.v}</p>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={bookingHref}
                className="btn-primary inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-base font-bold"
              >
                {hasWhatsapp ? <BrandIcon name="whatsapp" className="h-5 w-5" /> : <CalendarCheck className="h-5 w-5" />}
                {bookingLabel}
              </a>
              <a
                href={telHref}
                className="btn-quiet inline-flex items-center gap-2.5 rounded-2xl px-6 py-4 text-base font-bold text-white"
              >
                <Phone className="h-4.5 w-4.5 text-teal-soft" />
                {site.contact.telDisplay}
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 px-2 py-4 text-sm font-semibold text-ink-300 transition-colors hover:text-white"
              >
                چه چیزی درمان می‌شود
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
            </div>

            {/* نوار اعتماد */}
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6">
              {site.hero.evidence.map((t) => (
                <span key={t.text} className="flex items-center gap-2 text-sm text-ink-300">
                  <Icon name={t.icon} className="h-4.5 w-4.5 text-teal-soft" />
                  {t.text}
                </span>
              ))}
              {socialLinks.length > 0 &&
                socialLinks.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-ink-300 transition-colors hover:border-teal-soft/40 hover:text-white"
                  >
                    <BrandIcon name={s.key} className="h-3.5 w-3.5" />
                    {s.handle}
                  </a>
                ))}
            </div>
          </div>

          {/* ── تصویر / قاب واقعی ── */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-teal-soft/12 to-transparent blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <SmartImage
                  src={site.photos.heroPortrait || heroAmbience}
                  alt={
                    site.photos.heroPortrait
                      ? 'دکتر محمدرضا هشترودی در مطب'
                      : 'نمای اتاق درمان کلینیک طب سوزنی'
                  }
                  width={900}
                  height={1100}
                  priority
                  className="w-full"
                  imgClassName="animate-floatY"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink-950/75 via-ink-950/5 to-transparent" />

                {/* برچسب روی عکس */}
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-soft/80">
                      مطب تخصصی
                    </p>
                    <p className="text-sm font-bold text-white">{site.brand.nameFa}</p>
                  </div>
                  <span className="glass-dark rounded-full px-2.5 py-1 text-[11px] font-semibold text-white">
                    {site.contact.hours[0].time}
                  </span>
                </div>
              </div>

              {/* کارت شناور: تجربه */}
              <div className="glass absolute -bottom-8 start-[-14px] z-20 flex items-center gap-3 rounded-2xl p-3.5 shadow-2xl animate-floatY sm:start-[-24px]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-gold to-[oklch(0.6_0.1_75)]">
                  <Award className="h-5 w-5 text-ink-950" />
                </div>
                <div>
                  <p className="tabular text-2xl font-extrabold text-ink-900">+۲۰</p>
                  <p className="text-[11px] font-medium text-ink-700">سال بالینی</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* گذار موجی */}
      <div className="absolute inset-x-0 bottom-0 z-10 leading-none">
        <svg viewBox="0 0 1440 110" fill="none" preserveAspectRatio="none" className="h-14 w-full lg:h-20">
          <path d="M0,70 C240,110 480,15 720,45 C960,75 1200,95 1440,52 L1440,110 L0,110 Z" fill="#faf7f2" />
        </svg>
      </div>
    </section>
  );
}
