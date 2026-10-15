import { useState } from 'react';
import { Play, X, Youtube } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

const videos: VideoItem[] = [
  { id: 'dQw4w9WgXcQ', title: 'آشنایی با طب سوزنی و کاربردهای آن', description: 'معرفی کامل روش طب سوزنی و نحوه درمان بیماری‌ها', category: 'معرفی' },
  { id: 'dQw4w9WgXcQ', title: 'لیزر درمانی در درمان ام‌اس', description: 'نحوه استفاده از لیزر درمانی برای کنترل بیماری ام‌اس', category: 'درمان' },
  { id: 'dQw4w9WgXcQ', title: 'اکوپانکچر؛ نوین‌ترین روش درمان', description: 'آشنایی با تکنولوژی اکوپانکچر و مزایای آن', category: 'تکنولوژی' },
  { id: 'dQw4w9WgXcQ', title: 'درمان بیماری گیلن‌باره', description: 'روش درمان ترکیبی برای بیماری گیلن‌باره', category: 'درمان' },
  { id: 'dQw4w9WgXcQ', title: 'بیماری‌های خودایمنی و طب سنتی', description: 'نقش طب سوزنی در تنظیم سیستم ایمنی بدن', category: 'آموزشی' },
  { id: 'dQw4w9WgXcQ', title: 'تجربه بیماران؛ از درد تا درمان', description: 'داستان واقعی بیماران درمان‌شده توسط دکتر هشترودی', category: 'تجربه' },
];

const categories = ['همه', 'معرفی', 'درمان', 'تکنولوژی', 'آموزشی', 'تجربه'];

// YouTube thumbnail URL
const getThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

export default function Videos() {
  const { ref, active } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const [filter, setFilter] = useState('همه');

  const filtered = filter === 'همه' ? videos : videos.filter((v) => v.category === filter);

  return (
    <section id="videos" className="py-24 bg-slate-50/95 relative overflow-hidden">
      <div className="absolute inset-0 medical-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`reveal ${active ? 'active' : ''}`}>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-medium mb-4">
              ویدیوهای آموزشی
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              <span className="gradient-text">ویدیوهای</span> یوتیوب
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              مجموعه‌ای از ویدیوهای آموزشی و درمانی دکتر هشترودی در یوتیوب
            </p>
            <div className="section-divider w-32 mx-auto mt-4" />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-l from-cyan-700 to-teal-500 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md card-hover"
                onClick={() => setSelected(video)}
              >
                <div className="video-thumbnail h-52">
                  <img
                    src={getThumbnail(video.id)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    }}
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 shadow-lg">
                      <Play className="w-7 h-7 text-white fill-white" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-lg bg-slate-900/70 backdrop-blur-sm text-white text-xs font-medium">
                    {video.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube channel link */}
          <div className="mt-10 text-center">
            <a
              href="https://www.youtube.com/@dr.hashtroodi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Youtube className="w-5 h-5" />
              کانال یوتیوب دکتر هشترودی
            </a>
          </div>
        </div>
      </div>

      {/* Modal player */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selected.id}?autoplay=1`}
                title={selected.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-white font-bold text-lg mb-2">{selected.title}</h3>
              <p className="text-slate-400 text-sm">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
