import { MapPin, Quote } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { site } from '@/site';

const fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const toFa = (v: string) =>
  v.replace(/\d/g, (d) => fa[Number(d)] ?? d);

/** حرف اول نام به‌جای چهره — بدون ساختن «بیمار جعلی» */
function Monogram({ name }: { name: string }) {
  const letter = toFa(name.trim().charAt(0));
  const hues = ['from-teal-deep to-teal-brand', 'from-ink-700 to-ink-500', 'from-gold to-[oklch(0.62_0.1_75)]'];
  const hue = hues[(name.charCodeAt(0) + name.length) % hues.length];
  return (
    <span
      aria-hidden="true"
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${hue} text-base font-extrabold text-white shadow-sm`}
    >
      {letter}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-sand-100 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="start"
          eyebrow="تجربهٔ بیماران"
          title={
            <>
              روز اول تا <span className="gradient-text">جلسهٔ دوازدهم</span>
            </>
          }
          lead="آنچه بیماران تغییر کرده‌اند، با ذکر برنامه و تعداد جلسه. هیچ «۵ ستاره»ای اینجا وجود ندارد — چون چیزی که اندازه نگرفته‌ایم را ادعا نمی‌کنیم."
        />

        {/* اسکرول افقی با snap روی موبایل، گرید روی دسکتاپ */}
        <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
          {site.testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="reveal reveal-native card-hover group relative w-[85%] min-w-[19rem] shrink-0 snap-start rounded-[1.6rem] border border-ink-900/6 bg-white p-6 shadow-sm lg:w-auto lg:min-w-0"
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              <Quote className="h-7 w-7 text-teal-brand/22 transition-colors duration-500 group-hover:text-teal-brand/45" />
              <blockquote className="mt-4 text-[14.5px] leading-loose text-ink-800/90">{t.text}</blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-900/6 pt-5">
                <Monogram name={t.name} />
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-bold text-ink-900">{t.name}</span>
                  <span className="mt-0.5 block text-[11.5px] font-medium text-ink-500">
                    {t.since} · {t.program}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-ink-500 lg:mt-8">
          <MapPin className="h-3.5 w-3.5" />
          نام‌ها کوتاه‌شده‌اند؛ متن نظرات با رضایت بیمار منتشر می‌شود.
        </p>
      </div>
    </section>
  );
}
