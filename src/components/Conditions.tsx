import { useMemo, useState } from 'react';
import { Info, Search } from 'lucide-react';
import { Icon } from '@/components/icons';
import SectionHeader from '@/components/SectionHeader';
import { inquiryHref, site } from '@/site';

export default function Conditions() {
  const [group, setGroup] = useState<string>('all');

  const items = useMemo(
    () => (group === 'all' ? site.conditions : site.conditions.filter((c) => c.group === group)),
    [group]
  );

  const countOf = (id: string) =>
    id === 'all' ? site.conditions.length : site.conditions.filter((c) => c.group === id).length;

  const chips = [{ id: 'all', label: 'همه' }, ...site.conditionGroups];

  return (
    <section id="conditions" className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.14]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 start-1/3 h-96 w-96 rounded-full bg-teal-brand/14 blur-[110px]" />
        <div className="absolute bottom-0 end-10 h-80 w-80 rounded-full bg-teal-soft/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tone="dark"
          eyebrow="حوزهٔ درمان"
          title={
            <>
              بیماری‌هایی که <span className="gradient-text-light">رویشان تمرکز داریم</span>
            </>
          }
          lead="فهرست زیر «تخصص» ماست، نه تبلیغ. هر مورد را که انتخاب کنید، می‌گوییم چه چیزی قابل تغییر است و چه چیزی نه."
        />

        {/* فیلتر دسته‌ای */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {chips.map((c) => {
            const on = group === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setGroup(c.id)}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-300 ${
                  on
                    ? 'bg-white text-ink-950 shadow-lg'
                    : 'border border-white/12 text-ink-300 hover:border-teal-soft/40 hover:text-white'
                }`}
              >
                {c.label}
                <span
                  className={`tabular rounded-full px-1.5 text-[11px] ${
                    on ? 'bg-ink-900/10 text-ink-700' : 'bg-white/8 text-ink-300'
                  }`}
                >
                  {countOf(c.id).toLocaleString('fa-IR')}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-center text-[13px] text-ink-500">
          {items.length.toLocaleString('fa-IR')} مورد نمایش داده می‌شود
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c, i) => (
            <article
              key={c.name}
              className="group relative flex flex-col rounded-3xl glass-dark p-6 transition-all duration-500 hover:bg-white/10"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-teal-brand to-teal-soft transition-transform duration-500 group-hover:scale-110">
                <Icon name={c.icon} className="h-6 w-6 text-white" />
              </span>
              <h3 className="mt-4 text-[16px] font-extrabold text-white">{c.name}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-300">{c.desc}</p>

              {c.note && (
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-white/6 px-3 py-2 text-[11px] font-medium leading-relaxed text-teal-soft/90">
                  <Info className="mt-px h-3.5 w-3.5 shrink-0" />
                  {c.note}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* خودارزیابی کوتاه — تبدیل بالا و SEO */}
        <div className="mt-12 grid items-center gap-6 rounded-[1.8rem] border border-white/10 bg-linear-to-br from-white/8 to-transparent p-7 lg:grid-cols-[1.6fr_1fr] lg:p-9">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-white">
              <Search className="h-5 w-5 text-teal-soft" />
              آیا کاندیدای این درمان هستم؟
            </h3>
            <ul className="mt-4 grid gap-2.5 text-[14px] text-ink-300 sm:grid-cols-2">
              {[
                'بیش از ۶ ماه است با درد یا علائم عصبی زندگی می‌کنم',
                'درمان‌های دارویی علائم را کامل کنترل نکرده‌اند',
                'نورولوژیست/روماتولوژیست من درمان کمکی را منع نکرده است',
                'به اندازهٔ ۸ تا ۱۲ جلسه وقت و صبر دارم',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-teal-soft/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-soft" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-ink-500">
              اگر سه مورد یا بیشتر را «بله» گفتید، یک جلسهٔ ارزیابی برای گرفتن نظر صریح کافی است.
            </p>
          </div>
          <a
            href={inquiryHref('کاندیدای درمان بودن')}
            className="btn-primary flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold lg:justify-self-end"
          >
            ارسال پرونده و پرسش
          </a>
        </div>
      </div>
    </section>
  );
}
