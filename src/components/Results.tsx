import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, Ruler } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { inquiryHref, site } from '@/site';

/**
 * اسلایدر «قبل/بعد» — بدون کتابخانه، با pointer events + کیبورد.
 * ⚠️ نتایج واقعی فقط با رضایت‌نامهٔ کتبی بیمار منتشر می‌شود؛ تا آن موقع
 * جای خالی با توضیحِ پروتکل سنجش پر شده است (نه تصویر ساختگی).
 */
function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && update(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [update]);

  return (
    <div
      ref={frameRef}
      className="ba-frame relative aspect-[4/3] w-full rounded-[1.6rem] border border-ink-900/8 bg-sand-200"
      onPointerDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
    >
      <img
        src={before}
        alt={beforeLabel}
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={after}
        alt={afterLabel}
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true" />

      <span className="absolute top-3 start-3 rounded-full bg-ink-950/72 px-2.5 py-1 text-[11px] font-bold text-white">
        {beforeLabel}
      </span>
      <span className="absolute top-3 end-3 rounded-full bg-teal-brand/90 px-2.5 py-1 text-[11px] font-bold text-white">
        {afterLabel}
      </span>

      <input
        type="range"
        min={2}
        max={98}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="جابه‌جایی خط مقایسهٔ قبل و بعد"
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export default function Results() {
  const has = site.results.length > 0;

  return (
    <section id="results" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="start"
          accent="gold"
          eyebrow="نتایج درمان"
          title={
            <>
              آنچه اندازه می‌گیریم،{' '}
              <span className="gradient-text">همین اعداد</span> هستند
            </>
          }
          lead="نمونه‌ها فقط با رضایت‌نامهٔ کتبی بیمار و با ذکر تعداد جلسه و معیار سنجش منتشر می‌شوند — نه قبل از آن."
        />

        {has ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {site.results.map((r) => (
              <figure key={r.id} className="reveal reveal-native">
                <BeforeAfter
                  before={r.before}
                  after={r.after}
                  beforeLabel="قبل"
                  afterLabel="بعد"
                />
                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[15px] font-bold text-ink-900">{r.label}</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-sand-100 px-3 py-1 text-[12px] font-semibold text-ink-700">
                    <Ruler className="h-3.5 w-3.5 text-teal-deep" />
                    {r.metric} · {r.program} · {r.sessions}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="reveal reveal-native mt-12 grid gap-6 rounded-[1.8rem] border border-dashed border-ink-900/14 bg-sand-50 p-7 lg:grid-cols-[1.15fr_1fr] lg:p-9">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-ink-900/5 px-3 py-1 text-[11px] font-bold text-ink-700">
                <ImageOff className="h-3.5 w-3.5" />
                این قاب هنوز پر نشده است
              </p>
              <p className="text-lead mt-5 text-ink-800/90">
                برای ما «قبل/بعد» یعنی عدد، نه نور و زاویهٔ دوربین. تصاویر و نمره‌های واقعی بیماران،
                پس از گرفتن رضایت‌نامه و امضای فرم انتشار، همین‌جا با تاریخ جلسات منتشر می‌شود.
              </p>
              <ul className="mt-6 grid gap-2.5 text-[14px] text-ink-700 sm:grid-cols-2">
                {[
                  'ثبت ویدیوی استاندارد ۳۰ ثانیه‌ای از الگوی راه رفتن',
                  'نمرهٔ EDSS / NRS در روز اول و هر ۴ جلسه',
                  'زاویه، فاصله و نور یکسان در عکاسی',
                  'ذکر تعداد جلسه و نوع پروتکل زیر هر نمونه',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-5 rounded-2xl bg-ink-950 p-6 text-white">
              <div className="flex items-center gap-3">
                <ChevronRight className="h-5 w-5 text-teal-soft" />
                <p className="text-[15px] font-bold leading-relaxed">
                  نمونه‌های بالینی را در کانال یوتیوب می‌توانید ببینید — آن‌جا خودِ بیماران صحبت می‌کنند.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-[13px] font-bold transition-colors hover:bg-white/20"
                >
                  ویدیوهای بیماران
                  <ChevronLeft className="h-4 w-4" />
                </a>
                <a
                  href={inquiryHref('نمونه نتایج درمان')}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-[13px] font-bold transition-colors hover:border-teal-soft/50"
                >
                  پرسش دربارهٔ نتایج
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
