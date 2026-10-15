import { ChevronDown, FileText, Wallet } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { inquiryHref, site, telHref } from '@/site';

export default function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="سؤالات متکرر"
          title={
            <>
              چیزهایی که <span className="gradient-text">قبل از ویزیت</span> باید بدانید
            </>
          }
          lead="اگر پاسختان اینجا نبود، در یک پیام کوتاه بپرسید — قبل از هر هزینه‌ای صادقانه می‌گوییم که کاندیدا هستید یا نه."
        />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* آکاردئون */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-ink-900/8 overflow-hidden rounded-[1.5rem] border border-ink-900/8 bg-sand-50">
              {site.faq.map((item, i) => (
                <li key={item.q}>
                  <details open={i === 0} className="group/faq">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-ink-900 transition-colors hover:bg-sand-100 sm:px-6 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start gap-3">
                        <span className="tabular mt-0.5 text-[12px] font-extrabold text-teal-brand">
                          {(i + 1).toLocaleString('fa-IR')}
                        </span>
                        {item.q}
                      </span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-ink-500 transition-transform duration-300 group-open/faq:rotate-180" />
                    </summary>
                    <p className="px-5 pb-5 text-[14px] leading-loose text-ink-700/90 sm:px-6 sm:ps-12">
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

          {/* هزینه و بیمه */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="reveal reveal-native overflow-hidden rounded-[1.6rem] border border-ink-900/8 bg-sand-100">
              <div className="bg-ink-950 p-6 text-white">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-linear-to-br from-teal-brand to-teal-soft">
                  <Wallet className="h-5 w-5 text-white" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold">هزینه و بیمه</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-300">
                  شفافیت این است که بدانید کل دوره چقدر می‌شود، نه فقط جلسهٔ اول.
                </p>
              </div>

              <ul className="space-y-3 p-6">
                {[
                  { t: 'جلسهٔ ارزیابی', d: '۶۰ تا ۹۰ دقیقه · نرخ ویزیت تخصصی' },
                  { t: 'جلسات درمان', d: 'نرخ جلسه‌ای، با کسر پلکانی برای دورهٔ کامل' },
                  { t: 'بیمهٔ مکمل', d: 'با فاکتور و تجویز پزشک قابل پیگیری' },
                  { t: 'پرداخت', d: 'آنلاین یا در محل مطب · امکان تقسیط دوره' },
                ].map((row) => (
                  <li
                    key={row.t}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-900/5"
                  >
                    <FileText className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal-brand" />
                    <span>
                      <span className="block text-[14px] font-bold text-ink-900">{row.t}</span>
                      <span className="mt-0.5 block text-[12.5px] text-ink-700/80">{row.d}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 px-6 pb-6">
                <a
                  href={inquiryHref('هزینه و بیمه')}
                  className="btn-primary flex-1 rounded-xl px-5 py-3 text-center text-sm font-bold"
                >
                  گرفتن برآورد هزینه
                </a>
                <a
                  href={telHref}
                  className="rounded-xl border border-ink-900/10 bg-white px-5 py-3 text-sm font-bold text-ink-800 transition-colors hover:border-teal-brand/40 hover:text-teal-deep"
                >
                  تماس
                </a>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-ink-500">
              به همین دلیل در وب‌سایت نرخ ثابتی درج نشده: برآورد مکتوبِ کل دوره (تعداد جلسه × نرخ)
              در پایان جلسهٔ اول به شما تحویل می‌شود، پیش از اینکه هزینه‌ای بپردازید.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
