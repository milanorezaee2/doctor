import { Activity, Calendar, ChevronLeft, Syringe, Zap, Waves, Award, Users, Stethoscope } from 'lucide-react';

const images = {
  main: 'https://images.pexels.com/photos/8312839/pexels-photo-8312839.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
  sub1: 'https://images.pexels.com/photos/7789613/pexels-photo-7789613.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
  sub2: 'https://images.pexels.com/photos/8313172/pexels-photo-8313172.jpeg?auto=compress&cs=tinysrgb&h=400&w=400',
};

const trustItems = [
  { icon: Stethoscope, text: 'بورد تخصصی طب سوزنی' },
  { icon: Award, text: 'فلوشیپ بین‌المللی' },
  { icon: Users, text: '۵۰۰۰+ بیمار درمان‌شده' },
];

const quickServices = [
  { icon: Syringe, label: 'طب سوزنی' },
  { icon: Zap, label: 'لیزر درمانی' },
  { icon: Waves, label: 'اکوپانکچر' },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center mesh-gradient overflow-hidden">
      {/* Animated decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-glowPulse" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-teal-400/15 rounded-full blur-[120px] animate-glowPulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-300/8 rounded-full blur-[100px]" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 medical-pattern opacity-30" />

      {/* Vertical accent line */}
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden lg:block" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-28">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text content — 7 cols */}
          <div className="lg:col-span-7 text-white">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-dark mb-8 animate-textReveal"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-teal-400" />
              </span>
              <span className="text-sm text-cyan-100 font-medium tracking-wide">پزشک متخصص طب سنتی و نوین</span>
            </div>

            {/* Name + accent line */}
            <div className="flex items-center gap-4 mb-3 animate-textReveal" style={{ animationDelay: '0.25s' }}>
              <div className="h-px bg-gradient-to-l from-cyan-400 to-transparent w-16 animate-lineGrow" />
              <span className="text-cyan-300 text-sm font-medium tracking-widest">DR. HASHTROODI</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-2 animate-textReveal"
              style={{ animationDelay: '0.35s' }}
            >
              دکتر محمد رضا
            </h1>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 animate-textReveal"
              style={{ animationDelay: '0.45s' }}
            >
              <span className="gradient-text">هشترودی</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl sm:text-2xl font-semibold text-slate-200 mb-6 animate-textReveal"
              style={{ animationDelay: '0.55s' }}
            >
              متخصص طب سوزنی، لیزر درمانی و اکوپانکچر
            </p>

            {/* Description */}
            <p
              className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl animate-textReveal"
              style={{ animationDelay: '0.65s' }}
            >
              درمان نوین بیماری‌های خودایمنی و عصبی با بهره‌گیری از جدیدترین روش‌های طب سوزنی،
              لیزر درمانی و اکوپانکچر. رویکردی جامع برای درمان ام‌اس، گیلن‌باره، بیماری‌های vegetative
              و اختلالات عصبی با تکنولوژی روز دنیا.
            </p>

            {/* Quick service pills */}
            <div className="flex flex-wrap gap-3 mb-8 animate-textReveal" style={{ animationDelay: '0.75s' }}>
              {quickServices.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-dark hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-cyan-50 font-medium">{s.label}</span>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-textReveal" style={{ animationDelay: '0.85s' }}>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-2.5 text-base"
              >
                <Calendar className="w-5 h-5" />
                رزرو نوبت
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-2xl font-bold glass-dark text-white hover:bg-white/15 transition-all duration-300 flex items-center gap-2.5 text-base border border-white/10 hover:border-cyan-400/30"
              >
                مشاهده خدمات
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-white/10 animate-textReveal" style={{ animationDelay: '0.95s' }}>
              {trustItems.map((t, i) => {
                const Icon = t.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-slate-300 font-medium">{t.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image composition — 5 cols */}
          <div className="lg:col-span-5 relative animate-scaleIn" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <div className="relative h-[560px] lg:h-[620px]">
              {/* Glow behind images */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-cyan-500/20 to-teal-400/10 rounded-full blur-[80px]" />

              {/* Main image — tall portrait */}
              <div className="absolute top-0 right-0 w-[78%] h-[85%] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img src={images.main} alt="طب سوزنی" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              </div>

              {/* Sub image 1 — bottom left, overlapping */}
              <div className="absolute bottom-0 left-0 w-[48%] h-[38%] rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 animate-floatY">
                <img src={images.sub2} alt="اکوپانکچر" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Sub image 2 — top left small, overlapping */}
              <div className="absolute top-6 left-0 w-[40%] h-[28%] rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 animate-floatY2">
                <img src={images.sub1} alt="لیزر درمانی" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Floating stat card — experience */}
              <div className="absolute -top-4 -left-6 glass rounded-2xl p-4 shadow-2xl animate-floatY z-20">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 counter">+۲۰</p>
                    <p className="text-[11px] text-slate-500 font-medium">سال تجربه</p>
                  </div>
                </div>
              </div>

              {/* Floating stat card — patients */}
              <div className="absolute -bottom-6 -right-4 glass rounded-2xl p-4 shadow-2xl animate-floatY z-20" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900 counter">+۵۰۰۰</p>
                    <p className="text-[11px] text-slate-500 font-medium">بیمار درمان‌شده</p>
                  </div>
                </div>
              </div>

              {/* Center badge — treatment tag */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 z-30 hidden lg:flex">
                <div className="conic-border rounded-2xl">
                  <div className="bg-slate-900 rounded-2xl px-5 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">درمان تخصصی</p>
                      <p className="text-cyan-300 text-[11px]">بیماری‌های عصبی و خودایمنی</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="w-full h-16 lg:h-24">
          <path d="M0,80 C240,120 480,20 720,50 C960,80 1200,100 1440,60 L1440,120 L0,120 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
