import { CheckCircle2, Timer } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { site } from '@/site';

/**
 * «مسیر درمان» — ستون چسبان در سمت راست (RTL) و کارت‌های اسکرول‌شونده در چپ.
 * بدون GSAP pin: position: sticky طبیعی‌تر با اسکرول صفحه و اسکرول‌بار موبایل کار می‌کند.
 */
export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-sand-50 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 medical-pattern opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                align="start"
                eyebrow="چطور کار می‌کنیم"
                title={
                  <>
                    از «درمان مبهم» تا{' '}
                    <span className="gradient-text">عدد قابل‌سنجش</span>
                  </>
                }
                lead="مسیر درمان ما چهار مرحله دارد و در هر مرحله می‌دانید کجا هستید، چند جلسه مانده و چه چیزی اندازه‌گیری می‌شود."
              />

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-teal-brand/18 bg-teal-brand/6 p-4">
                <Timer className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" />
                <p className="text-[13px] font-medium leading-relaxed text-ink-800">
                  {site.process.promise}
                </p>
              </div>

              <a
                href="#contact"
                className="btn-primary mt-6 inline-flex rounded-xl px-6 py-3 text-sm font-bold"
              >
                شروع مسیر با یک ویزیت
              </a>
            </div>
          </div>

          {/* مراحل */}
          <ol className="relative lg:col-span-8">
            <span
              className="absolute inset-y-2 start-[27px] hidden w-px bg-linear-to-b from-teal-brand/40 via-teal-brand/20 to-transparent sm:block"
              aria-hidden="true"
            />
            {site.process.steps.map((step, i) => (
              <li
                key={step.n}
                className="reveal reveal-native relative pb-5 last:pb-0 sm:ps-[76px]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span
                  className="absolute start-0 top-6 hidden h-14 w-14 place-items-center rounded-2xl border border-teal-brand/20 bg-white text-sm font-extrabold text-teal-deep shadow-sm sm:grid"
                  aria-hidden="true"
                >
                  {step.n}
                </span>

                <article className="card-hover rounded-3xl border border-ink-900/6 bg-white p-6 shadow-sm sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-extrabold text-ink-900">
                      <span className="me-2 text-teal-brand sm:hidden">{step.n}</span>
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-sand-200 px-2.5 py-1 text-[11px] font-bold text-ink-700">
                      {step.time}
                    </span>
                  </div>

                  <p className="text-[15px] leading-loose text-ink-700/90 mt-3">{step.desc}</p>

                  <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-ink-800">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
