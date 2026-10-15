import { Syringe, Zap, Waves, HeartPulse, Brain, Shield } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const services = [
  {
    icon: Syringe,
    title: 'طب سوزنی (Acupuncture)',
    desc: 'درمان با تحریک نقاط خاص بدن توسط سوزن‌های ظریف برای تنظیم جریان انرژی و درمان درد و بیماری‌های مزمن.',
    image: 'https://images.pexels.com/photos/8312859/pexels-photo-8312859.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    features: ['بدون دارو', 'بدون عوارض جانبی', 'درمان ریشه‌ای'],
  },
  {
    icon: Zap,
    title: 'لیزر درمانی (Laser Therapy)',
    desc: 'استفاده از لیزر کم‌توان برای تحریک ترمیم بافت، کاهش التهاب و درمان دردهای عصبی و مفصلی.',
    image: 'https://images.pexels.com/photos/5069508/pexels-photo-5069508.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    features: ['غیرتهاجمی', 'ترمیم سریع بافت', 'کاهش التهاب'],
  },
  {
    icon: Waves,
    title: 'اکوپانکچر (Acu-Puncture Pro)',
    desc: 'نوین‌ترین روش ترکیب امواج صوتی با طب سوزنی برای تحریک عمیق‌تر نقاط درمانی و نتایج سریع‌تر.',
    image: 'https://images.pexels.com/photos/8313172/pexels-photo-8313172.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    features: ['تکنولوژی پیشرفته', 'تحریک عمیق', 'نتایج سریع'],
  },
  {
    icon: Brain,
    title: 'درمان بیماری‌های عصبی',
    desc: 'درمان تخصصی بیماری‌های مغزی و عصبی شامل ام‌اس، گیلن‌باره و بیماری‌های vegetative با رویکرد چندجانبه.',
    image: 'https://images.pexels.com/photos/6010927/pexels-photo-6010927.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    features: ['درمان ام‌اس', 'درمان گیلن‌باره', 'بیماری‌های vegetative'],
  },
  {
    icon: Shield,
    title: 'درمان بیماری‌های خودایمنی',
    desc: 'تنظیم سیستم ایمنی بدن با ترکیب طب سوزنی و لیزر درمانی برای کنترل و درمان بیماری‌های خودایمنی.',
    image: 'https://images.pexels.com/photos/8313427/pexels-photo-8313427.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    features: ['تنظیم ایمنی', 'درمان ریشه‌ای', 'بدون داروشیمیایی'],
  },
  {
    icon: HeartPulse,
    title: 'مشاوره و برنامه درمانی اختصاصی',
    desc: 'طراحی برنامه درمانی شخصی‌سازی‌شده بر اساس نوع بیماری، شدت علائم و شرایط فیزیکی هر بیمار.',
    image: 'https://images.pexels.com/photos/38407788/pexels-photo-38407788.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    features: ['برنامه اختصاصی', 'پیگیری مستمر', 'نتیجه‌محور'],
  },
];

export default function Services() {
  const { ref, active } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="py-24 bg-white/95 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`reveal ${active ? 'active' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
              خدمات تخصصی
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              <span className="gradient-text">خدمات درمانی</span> کلینیک
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              ارائه طیف کامل خدمات درمانی با بهره‌گیری از جدیدترین تکنولوژی‌های روز دنیا در حوزه طب سوزنی، لیزر درمانی و اکوپانکچر
            </p>
            <div className="section-divider w-32 mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md card-hover"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute top-4 right-4 icon-circle bg-gradient-to-br from-cyan-600 to-teal-500 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.features.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1 rounded-lg bg-cyan-50 text-cyan-700 text-xs font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
