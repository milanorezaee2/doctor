import { Quote, Star } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const testimonials = [
  {
    name: 'مریم احمدی',
    condition: 'بیماری ام‌اس',
    text: 'بعد از سال‌ها دست و پنجه نرم کردن با ام‌اس، با درمان طب سوزنی و لیزر توسط دکتر هشترودی، علائمم به شدت کاهش پیدا کرد. واقعاً زندگی‌ام تغییر کرد.',
    rating: 5,
  },
  {
    name: 'علی رضایی',
    condition: 'گیلن‌باره',
    text: 'دکتر هشترودی با روش ترکیبی اکوپانکچر و لیزر، به من کمک کرد تا دوباره بتوانم راه بروم. تجربه‌ای فوق‌العاده بود.',
    rating: 5,
  },
  {
    name: 'زهرا کریمی',
    condition: 'نوروپاتی محیطی',
    text: 'سوزن‌سوزن شدن دست و پاها آزارم می‌داد. بعد از چند جلسه درمان، علائمم کاملاً برطرف شد. ممنونم از دکتر هشترودی.',
    rating: 5,
  },
  {
    name: 'حسین موسوی',
    condition: 'درد مزمن کمر',
    text: 'سال‌ها با کمردرد زندگی می‌کردم. طب سوزنی نتیجه‌ای داد که هیچ دارویی نتوانسته بود. واقعاً حرفه‌ای.',
    rating: 5,
  },
  {
    name: 'فاطمه نوری',
    condition: 'بیماری خودایمنی',
    text: 'تنظیم سیستم ایمنی‌ام با طب سوزنی باعث شد داروهای شیمیایی‌ام را کاهش دهم. دکتر هشترودی واقعاً متخصص هستند.',
    rating: 5,
  },
  {
    name: 'محمد تقی‌پور',
    condition: 'سکته مغزی',
    text: 'بعد از سکته مغزی، بازتوانی با لیزر و طب سوزنی سرعت بهبودی‌ام را بالا برد. از دکتر هشترودی بسیار سپاسگزارم.',
    rating: 5,
  },
];

export default function Testimonials() {
  const { ref, active } = useReveal<HTMLDivElement>();

  return (
    <section id="testimonials" className="py-24 bg-slate-50/95 relative overflow-hidden">
      <div className="absolute inset-0 medical-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`reveal ${active ? 'active' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
              تجربه بیماران
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              <span className="gradient-text">تجربه</span> بیماران
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              داستان واقعی بیمارانی که با درمان‌های تخصصی دکتر هشترودی به بهبودی رسیدند
            </p>
            <div className="section-divider w-32 mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative p-6 rounded-3xl bg-white shadow-md border border-slate-100 card-hover"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Quote className="absolute top-6 left-6 w-10 h-10 text-cyan-100" />

                {/* Rating */}
                <div className="flex gap-1 mb-4 relative">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 relative">{t.text}</p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-cyan-600">{t.condition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
