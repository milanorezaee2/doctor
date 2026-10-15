import { useEffect, useRef } from 'react';
import { parallax } from '@/lib/motion';
import { FileSearch, Quote } from 'lucide-react';
import { Icon } from '@/components/icons';
import SectionHeader from '@/components/SectionHeader';
import { site } from '@/site';

export default function About() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  /* یک scrub آرام روی قاب تصویری — نه همه‌جا، فقط همین‌جا */
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    let dispose = () => {};
    let alive = true;
    parallax(el, 7).then((fn) => {
      if (!alive) return fn();
      dispose = fn;
    });
    return () => {
      alive = false;
      dispose();
    };
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* قاب تصویری / مونوگرام */}
          <div className="reveal reveal-native lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-teal-brand/12 to-gold/10" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-ink-900/8 bg-sand-100 shadow-xl">
                {site.photos.aboutPortrait ? (
                  <img
                    src={site.photos.aboutPortrait}
                    alt="دکتر محمدرضا هشترودی حین معاینهٔ بیمار"
                    width={900}
                    height={1100}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover"
                  />
                ) : (
                  /* تا رسیدن عکس واقعیِ پزشک، قاب تایپوگرافیک (بدون چهرهٔ جعلی) */
                  <div ref={parallaxRef} className="relative px-7 py-14 text-center">
                    <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-teal-brand/25 bg-linear-to-br from-teal-deep to-teal-brand text-4xl font-extrabold text-white shadow-lg">
                      م‌ر
                    </div>
                    <p className="mt-7 text-xl font-extrabold text-ink-900">{site.brand.nameFa}</p>
                    <p className="mt-2 text-sm font-medium text-teal-deep">{site.brand.role}</p>
                    <div className="mt-8 space-y-2.5 text-start">
                      {site.credentials.map((c) => (
                        <div
                          key={c.title}
                          className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm ring-1 ring-ink-900/5"
                        >
                          <Icon name={c.icon} className="h-4.5 w-4.5 shrink-0 text-teal-brand" />
                          <p className="text-[13px] font-semibold text-ink-800">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                    {site.about.research.url && (
                      <a
                        href={site.about.research.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-teal-deep hover:underline"
                      >
                        <FileSearch className="h-4 w-4" />
                        {site.about.research.label}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* شماره‌های رسمی */}
              {(site.brand.medicalCouncilNumber || site.brand.clinicLicense) && (
                <div className="glass absolute -bottom-7 inset-x-6 rounded-2xl px-4 py-3 text-center shadow-lg">
                  <p className="tabular text-[12px] font-semibold text-ink-800">
                    {site.brand.medicalCouncilNumber && (
                      <>شماره نظام پزشکی: {site.brand.medicalCouncilNumber}</>
                    )}
                    {site.brand.medicalCouncilNumber && site.brand.clinicLicense && ' · '}
                    {site.brand.clinicLicense && <>پروانه مطب: {site.brand.clinicLicense}</>}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* متن */}
          <div className="reveal reveal-native lg:col-span-7">
            <SectionHeader
              align="start"
              accent="gold"
              eyebrow="درباره پزشک"
              title={
                <>
                  من جایگزین نورولوژیست شما{' '}
                  <span className="gradient-text">نمی‌شوم</span>
                </>
              }
              lead={site.brand.tagline}
            />

            <div className="mt-8 space-y-5">
              {site.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-lead text-ink-800/90'
                      : 'text-[15px] leading-loose text-ink-700/85'
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <figure className="mt-9 rounded-2xl border-s-2 border-teal-brand bg-sand-100 p-6">
              <Quote className="h-6 w-6 text-teal-brand/50" />
              <blockquote className="mt-3 text-[17px] font-semibold leading-loose text-ink-900">
                {site.about.quote}
              </blockquote>
            </figure>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {site.credentials.map((c) => (
                <div
                  key={c.title}
                  className="card-hover flex items-start gap-3 rounded-2xl border border-ink-900/6 bg-sand-50 p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-teal-deep to-teal-brand">
                    <Icon name={c.icon} className="h-5 w-5 text-white" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-ink-900">{c.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-ink-700/80">{c.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
