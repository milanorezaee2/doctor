import { ArrowLeft, Clock, Layers } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import SmartImage from '@/components/SmartImage';
import { inquiryHref, site } from '@/site';

type ServiceItem = (typeof site.services)[number];

function Meta({ item, dark = false }: { item: ServiceItem; dark?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-semibold ${
        dark ? 'text-teal-soft/85' : 'text-ink-700/75'
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Layers className="h-3.5 w-3.5" />
        {item.sessions}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        هر جلسه {item.duration}
      </span>
    </div>
  );
}

export default function Services() {
  const [featured, ...rest] = site.services;

  return (
    <section id="services" className="relative overflow-hidden bg-sand-100 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="خدمات تخصصی"
          title={
            <>
              چه چیزی، <span className="gradient-text">چطور</span> درمان می‌شود
            </>
          }
          lead="پنج پروتکل روشن، با تعداد جلسه و زمان هر جلسه — تا قبل از شروع بدانید قرار است چه اتفاقی بیفتد."
        />

        {/* بِنتو — به‌جای شش کارت هم‌اندازه */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {/* کارت ویژه */}
          <article className="reveal reveal-native group relative overflow-hidden rounded-[1.8rem] bg-ink-950 text-white shadow-xl md:col-span-2 lg:col-span-4 lg:row-span-2">
            <div className="grid h-full lg:grid-cols-2">
              <div className="flex flex-col justify-between p-7 lg:p-9">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-teal-soft/14 px-3 py-1 text-[11px] font-bold text-teal-soft ring-1 ring-white/10">
                    پایهٔ همهٔ پروتکل‌ها
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold lg:text-[28px]">{featured.title}</h3>
                  <p className="text-[15px] leading-loose text-ink-300 mt-4">{featured.desc}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {featured.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-white/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-soft" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 space-y-4">
                  <Meta item={featured} dark />
                  <a
                    href={inquiryHref(featured.title)}
                    className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                  >
                    پرسش دربارهٔ {featured.title}
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="relative min-h-[240px]">
                <SmartImage
                  src={featured.image}
                  alt="درمان با طب سوزنی در مطب"
                  width={1000}
                  height={1200}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.1s] group-hover:scale-[1.06]"
                  fallbackLabel="عکس واقعی اتاق درمان جای این قاب می‌رود"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-ink-950/25 lg:bg-linear-to-l" />
              </div>
            </div>
          </article>

          {/* کارت‌های کوچک‌تر */}
          {rest.map((s, i) => (
            <article
              key={s.slug}
              className={`reveal reveal-native card-hover group flex flex-col overflow-hidden rounded-[1.6rem] border border-ink-900/6 bg-white shadow-sm ${
                i < 2 ? 'lg:col-span-2' : 'md:col-span-1 lg:col-span-3'
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start gap-4 p-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl lg:hidden">
                  <SmartImage
                    src={s.image}
                    alt={s.title}
                    width={400}
                    height={400}
                    className="h-full w-full"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-extrabold text-ink-900">{s.title}</h3>
                  <p className="mt-1 text-[12px] font-bold text-teal-deep">{s.lead}</p>
                </div>
              </div>

              <div className="px-6">
                <p className="text-[14px] leading-loose text-ink-700/85">{s.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="rounded-lg bg-teal-brand/8 px-2.5 py-1 text-[11px] font-semibold text-teal-deep"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-900/6 px-6 py-4">
                <Meta item={s} />
                <a
                  href={inquiryHref(s.title)}
                  className="inline-flex shrink-0 items-center gap-1 text-[13px] font-bold text-teal-deep transition-colors hover:text-ink-900"
                >
                  پرسش
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
