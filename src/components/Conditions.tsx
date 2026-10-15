import { Brain, Activity, Zap, Heart, Shield, Waves, Network, Bone } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const conditions = [
  { icon: Brain, name: 'بیماری‌های مرگ مغزی', desc: 'درمان آسیب‌های مغزی و اختلالات آگاهی با تحریک نقاط عصبی' },
  { icon: Activity, name: 'بیماری‌های Vegetative', desc: 'بهبود عملکرد سیستم عصبی خودکار و vegetative' },
  { icon: Shield, name: 'ام‌اس (MS)', desc: 'کنترل پیشرفت بیماری و کاهش علائم با تنظیم سیستم ایمنی' },
  { icon: Zap, name: 'گیلن‌باره (GBS)', desc: 'تسریع ترمیم اعصاب محیطی و بهبود قدرت عضلانی' },
  { icon: Heart, name: 'بیماری‌های خودایمنی', desc: 'تنظیم سیستم ایمنی و کاهش التهاب مزمن' },
  { icon: Network, name: 'نوروپاتی (Neuropathy)', desc: 'درمان آسیب اعصاب محیطی و رفع سوزن‌سوزن شدن' },
  { icon: Bone, name: 'درد مزمن و مفصلی', desc: 'درمان دردهای مزمن، آرتروز و کمردرد با طب سوزنی' },
  { icon: Waves, name: 'سکته مغزی', desc: 'بازتوانی عصبی و بهبود عملکرد بعد از سکته' },
];

export default function Conditions() {
  const { ref, active } = useReveal<HTMLDivElement>();

  return (
    <section id="conditions" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`reveal ${active ? 'active' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium mb-4">
              بیماری‌های درمان‌شدنی
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              بیماری‌های <span className="gradient-text">درمان‌شدنی</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              بیماری‌هایی که با رویکرد ترکیبی طب سوزنی، لیزر درمانی و اکوپانکچر قابل درمان و کنترل هستند
            </p>
            <div className="section-divider w-32 mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {conditions.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-3xl glass-dark hover:bg-white/10 transition-all duration-400 card-hover"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-400">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{c.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-300 mb-4">برای مشاوره درباره بیماری خود با ما تماس بگیرید</p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary px-8 py-3 rounded-xl font-bold text-white"
            >
              مشاوره رایگان
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
