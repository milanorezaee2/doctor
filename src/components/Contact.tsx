import { useMemo, useState } from 'react';
import { Check, Clock, ExternalLink, MapPin, Send } from 'lucide-react';
import BrandIcon from '@/components/icons/BrandIcon';
import SectionHeader from '@/components/SectionHeader';
import {
  bookingHref,
  hasWhatsapp,
  mailHref,
  mapHref,
  mapEmbed,
  site,
  telHref,
  whatsappHref,
} from '@/site';

type FormState = { name: string; phone: string; condition: string; message: string };
const empty: FormState = { name: '', phone: '', condition: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);

  const composed = useMemo(
    () =>
      [
        `نام: ${form.name || '—'}`,
        `تماس: ${form.phone || '—'}`,
        `وضعیت / بیماری: ${form.condition || '—'}`,
        `توضیح: ${form.message || '—'}`,
      ].join('\n'),
    [form]
  );

  const submitHref = hasWhatsapp
    ? whatsappHref(`سلام. برای ارزیابی و تعیین وقت:\n\n${composed}`)
    : mailHref('درخواست وقت ویزیت — وب‌سایت', composed);

  const canSubmit = form.name.trim().length > 1 && form.phone.trim().length > 6;

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const field =
    'w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-ink-500 focus:border-teal-soft/60 focus:bg-white/10';

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.13]" />
      <div className="pointer-events-none absolute -top-32 start-1/4 h-96 w-96 rounded-full bg-teal-brand/12 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tone="dark"
          align="start"
          eyebrow="تماس و نوبت‌دهی"
          title={
            <>
              یک پیام کافی است — <span className="gradient-text-light">پاسخ در ساعات کاری</span>
            </>
          }
          lead={site.contact.responseNote}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* راه‌های ارتباطی */}
          <div className="space-y-3 lg:col-span-5">
            {[
              {
                icon: 'phone' as const,
                label: 'تلفن مطب',
                value: site.contact.telDisplay,
                href: telHref,
                note: 'سریع‌ترین راه برای هماهنگی ساعت ویزیت',
              },
              hasWhatsapp
                ? {
                    icon: 'whatsapp' as const,
                    label: 'واتساپ',
                    value: site.contact.whatsapp,
                    href: whatsappHref('سلام. برای تعیین وقت ویزیت پیام می‌دهم.'),
                    note: 'ارسال عکس پرونده و پرسش کوتاه',
                  }
                : {
                    icon: 'mail' as const,
                    label: 'ایمیل',
                    value: site.contact.email,
                    href: mailHref('درخواست اطلاعات', 'سلام.\n\n'),
                    note: 'مناسب برای ارسال مدارک و پرسش مفصل',
                  },
              {
                icon: 'map' as const,
                label: 'آدرس مطب',
                value: site.contact.address,
                href: mapHref,
                note: 'باز کردن مسیر در گوگل‌مپ',
              },
            ].map((row) => (
              <a
                key={row.label}
                href={row.href}
                target={row.icon === 'map' ? '_blank' : undefined}
                rel={row.icon === 'map' ? 'noopener noreferrer' : undefined}
                className="group flex items-start gap-4 rounded-2xl glass-dark p-5 transition-all duration-400 hover:bg-white/10"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-teal-brand to-teal-soft">
                  {row.icon === 'phone' ? (
                    <span className="grid h-5 w-5 place-items-center">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
                      </svg>
                    </span>
                  ) : row.icon === 'map' ? (
                    <MapPin className="h-5 w-5 text-white" />
                  ) : row.icon === 'whatsapp' ? (
                    <BrandIcon name="whatsapp" className="h-5 w-5 text-white" />
                  ) : (
                    <Send className="h-5 w-5 text-white" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold text-teal-soft/85">{row.label}</span>
                  <span className="mt-1 block text-[15px] font-bold leading-relaxed text-white">
                    {row.value}
                  </span>
                  <span className="mt-1 flex items-center gap-1 text-[12px] text-ink-500 transition-colors group-hover:text-teal-soft">
                    {row.note}
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </span>
              </a>
            ))}

            {/* ساعات کاری */}
            <div className="rounded-2xl border border-white/10 p-5">
              <p className="flex items-center gap-2 text-[12px] font-semibold text-teal-soft/85">
                <Clock className="h-4 w-4" />
                ساعات کاری
              </p>
              <ul className="mt-3 space-y-2">
                {site.contact.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between text-[14px]">
                    <span className="text-ink-300">{h.day}</span>
                    <span className="tabular font-bold text-white">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* فرم — بدون بک‌اند، پیام را به واتساپ/ایمیل می‌برد */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = submitHref;
                setSent(true);
                window.setTimeout(() => {
                  setSent(false);
                  setForm(empty);
                }, 5000);
              }}
              className="rounded-[1.6rem] border border-white/10 bg-linear-to-br from-white/8 to-transparent p-6 backdrop-blur-md sm:p-8"
            >
              <h3 className="text-lg font-extrabold text-white">فرم درخواست ویزیت</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-300">
                {hasWhatsapp
                  ? 'با زدن دکمهٔ زیر، پیام شما در واتساپ آمادهٔ ارسال می‌شود — شماره‌ای در دیتابیس ذخیره نمی‌شود.'
                  : 'با زدن دکمهٔ زیر، متن پیام در ایمیل شما آماده می‌شود. برای دریافت پیامک، شمارهٔ واتساپ مطب را در src/site.ts وارد کنید.'}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-300">نام و نام خانوادگی *</span>
                  <input value={form.name} onChange={set('name')} className={field} placeholder="مثلاً مریم احمدی" required />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-300">شمارهٔ تماس *</span>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    className={`tabular ${field}`}
                    placeholder="09xxxxxxxxx"
                    inputMode="tel"
                    required
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-300">بیماری یا علامت اصلی</span>
                <input
                  value={form.condition}
                  onChange={set('condition')}
                  className={field}
                  placeholder="مثلاً ام‌اس · درد مزمن کمر · بی‌حسی پا"
                  list="conditions-list"
                />
                <datalist id="conditions-list">
                  {site.conditions.map((c) => (
                    <option key={c.name} value={c.name} />
                  ))}
                </datalist>
              </label>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-[12.5px] font-semibold text-ink-300">توضیح کوتاه</span>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  rows={4}
                  className={`${field} resize-none`}
                  placeholder="از کی شروع شده، چه درمان‌هایی رفته‌اید و الان کدام داروها را مصرف می‌کنید."
                />
              </label>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {sent ? <Check className="h-4.5 w-4.5" /> : <Send className="h-4.5 w-4.5" />}
                  {sent ? 'پیام باز شد — ارسال را بزنید' : 'ارسال درخواست ویزیت'}
                </button>
                <a href={bookingHref} className="text-[13px] font-bold text-teal-soft hover:underline">
                  عجله دارید؟ زنگ بزنید
                </a>
              </div>

              <p className="mt-4 text-[11.5px] leading-relaxed text-ink-500">
                این فرم جایگزین اورژانس پزشکی نیست. در موارد اورژانس با ۱۱۵ تماس بگیرید.
              </p>
            </form>

            {/* نقشه */}
            <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-white/10">
              <iframe
                src={mapEmbed}
                title={`نقشهٔ محل مطب — ${site.contact.addressShort}`}
                className="h-56 w-full grayscale-[0.25] contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 bg-white/6 px-5 py-3 text-[13px] font-bold text-teal-soft transition-colors hover:bg-white/10"
              >
                {site.contact.address}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
