import { Icon } from '@/components/icons';
import SectionHeader from '@/components/SectionHeader';
import { useCountUp } from '@/hooks/useCountUp';
import { useReveal } from '@/hooks/useReveal';
import { site } from '@/site';

const marqueeItems = [
  'دکترای تخصصی پزشکی — دانشگاه تهران',
  'فلوشیپ طب سوزنی',
  'بورد لیزر درمانی پزشکی',
  'بیش از ۳۰ مقالهٔ بین‌المللی',
  'عضو انجمن طب سوزنی ایران',
  'مطب تهران، ولیعصر',
];

function StatCard({
  item,
  start,
}: {
  item: (typeof site.stats)[number];
  start: boolean;
}) {
  const count = useCountUp(item.target, 1800, start);
  return (
    <div className="group relative rounded-[1.6rem] border border-white/10 bg-white/6 p-6 text-center transition-colors duration-500 hover:bg-white/10">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-teal-brand to-teal-soft shadow-lg transition-transform duration-500 group-hover:scale-110">
        <Icon name={item.icon} className="h-6 w-6 text-white" />
      </span>
      <p className="tabular gradient-text-light mt-5 text-4xl font-extrabold lg:text-[42px]">
        {count.toLocaleString('fa-IR')}
        {item.suffix}
      </p>
      <p className="mt-2 text-[15px] font-bold text-white">{item.label}</p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">{item.note}</p>
    </div>
  );
}

export default function Stats() {
  // شمارش فقط وقتی سکشن دیده شد — همان useReveal (یک‌بار، بعد disconnect)
  const { ref, active } = useReveal<HTMLDivElement>();

  return (
    <section id="stats" className="relative overflow-hidden bg-ink-900 py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.12]" />

      {/* Marquee مدارک — حرکت افقیِ خالص CSS */}
      <div className="relative mb-14 overflow-hidden border-y border-white/10 py-3.5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-8 text-[13px] font-semibold text-ink-300">
              {t}
              <span className="h-1 w-1 rounded-full bg-teal-soft/60" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tone="dark"
          eyebrow="آمار مطب"
          title={
            <>
              ۲۰ سال، <span className="gradient-text-light">۵۰۰۰ پرونده</span>، یک روش: اندازه‌گیری
            </>
          }
          lead="پشت هر عدد، یک پروندهٔ بالینی با تاریخ و نمرهٔ ثبت‌شده است."
        />

        <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s) => (
            <StatCard key={s.label} item={s} start={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
