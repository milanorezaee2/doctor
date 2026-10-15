import { useState } from 'react';
import { ArrowLeft, Clapperboard, Play } from 'lucide-react';
import BrandIcon from '@/components/icons/BrandIcon';
import SectionHeader from '@/components/SectionHeader';
import { site } from '@/site';

type VideoItem = (typeof site.videos)[number];

/** تامبنیل با حالت خطا — بدون iframe تا وقتی کاربر کلیک نکرده (facade = LCP سالم) */
function Thumb({ id, title }: { id: string; title: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="grid h-full w-full place-items-center bg-linear-to-br from-ink-800 to-ink-950">
        <Clapperboard className="h-8 w-8 text-white/25" />
      </div>
    );
  }
  return (
    <img
      src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
      alt={`کاور ویدیو: ${title}`}
      width={480}
      height={360}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

export default function Videos() {
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const [filter, setFilter] = useState('همه');
  const hasVideos = site.videos.length > 0;

  const filtered = !hasVideos
    ? []
    : filter === 'همه'
      ? site.videos
      : site.videos.filter((v) => v.category === filter);

  return (
    <section id="videos" className="relative overflow-hidden bg-sand-50 py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 medical-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="ویدیوها"
          title={
            <>
              خودِ من توضیح می‌دهم — <span className="gradient-text">بدون تبلیغ</span>
            </>
          }
          lead="پاسخ پرتکرارترین سؤال‌ها، در ویدیوهای کوتاه و بدون ادعا — همان چیزی که در اتاق ویزیت می‌گویم."
        />

        {/* حالت خالی: آیدی واقعیِ ویدیوها هنوز در src/site.ts وارد نشده */}
        {!hasVideos ? (
          <div className="reveal reveal-native mt-12 overflow-hidden rounded-[1.8rem] border border-ink-900/8 bg-white shadow-lg">
            <div className="grid items-center gap-8 p-7 lg:grid-cols-[1.2fr_1fr] lg:p-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold text-rose-600 ring-1 ring-rose-100">
                  <BrandIcon name="youtube" className="h-3.5 w-3.5" />
                  {site.social.youtube.split('/').pop()}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-ink-900">
                  مجموعه ویدیوهای کانال، همه در یوتیوب
                </h3>
                <p className="text-[15px] leading-loose text-ink-700/85 mt-4">
                  برای دیدن مجموعهٔ کامل به کانال بروید. برای افزودن ویدیوی منتخب به همین صفحه، کافی است آیدی یوتیوب را در فایل{' '}
                  <code className="rounded bg-sand-200 px-1.5 py-0.5 text-[13px] font-bold text-ink-900">
                    src/site.ts
                  </code>{' '}
                  بگذارید، همین‌جا پخش‌کنندهٔ داخلی با کاور و فیلتر دسته‌ای ساخته می‌شود — بدون
                  سنگین‌کردن صفحه.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {site.videoCategories.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg bg-sand-100 px-2.5 py-1 text-[12px] font-semibold text-ink-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex aspect-video items-end justify-between overflow-hidden rounded-2xl bg-ink-950 p-6 text-white shadow-xl"
              >
                <span className="pointer-events-none absolute -end-8 -top-10 h-40 w-40 rounded-full bg-rose-600/25 blur-2xl transition-transform duration-700 group-hover:scale-125" />
                <span>
                  <span className="block text-[12px] font-semibold text-teal-soft/90">کانال رسمی</span>
                  <span className="mt-1 block text-lg font-extrabold">
                    {site.brand.nameFa}
                  </span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-rose-600 transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-5 w-5 fill-white text-white" />
                </span>
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {['همه', ...site.videoCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                  className={`rounded-xl px-4 py-2 text-[13px] font-bold transition-all duration-300 ${
                    filter === cat
                      ? 'bg-linear-to-l from-teal-deep to-teal-brand text-white shadow'
                      : 'border border-ink-900/8 bg-white text-ink-700 hover:border-teal-brand/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((video, i) => (
                <button
                  key={video.id + i}
                  onClick={() => setSelected(video)}
                  className="reveal reveal-native card-hover group overflow-hidden rounded-2xl border border-ink-900/6 bg-white text-start shadow-sm"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="video-thumbnail relative block h-48 overflow-hidden">
                    <Thumb id={video.id} title={video.title} />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-rose-600/92 shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-6 w-6 fill-white text-white" />
                      </span>
                    </span>
                    <span className="absolute top-3 end-3 rounded-lg bg-ink-950/72 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {video.category}
                    </span>
                  </span>
                  <span className="block p-5">
                    <span className="block text-[15px] font-bold text-ink-900 line-clamp-2">
                      {video.title}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-700/80 line-clamp-2">
                      {video.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 text-center">
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-700"
          >
            <BrandIcon name="youtube" className="h-4.5 w-4.5" />
            دیدن کانال در یوتیوب
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* پخش‌کننده — فقط وقتی یک ویدیوی واقعی انتخاب شده iframe ساخته می‌شود */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/85 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-ink-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&rel=0`}
                title={selected.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
              />
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h3 className="font-bold text-white">{selected.title}</h3>
                <p className="mt-1 text-[13px] text-ink-300">{selected.description}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-white/12 px-3 py-1.5 text-[13px] font-bold text-white hover:bg-white/10"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
