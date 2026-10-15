import { GraduationCap, Award, Stethoscope, BookOpen } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const aboutImage = 'https://images.pexels.com/photos/8313210/pexels-photo-8313210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const credentials = [
  { icon: GraduationCap, title: 'تحصیلات', desc: 'دکترای تخصصی پزشکی - دانشگاه تهران' },
  { icon: Award, title: 'تخصص', desc: 'فلوشیپ طب سوزنی از چین' },
  { icon: Stethoscope, title: 'بورد تخصصی', desc: 'بورد لیزر درمانی پزشکی' },
  { icon: BookOpen, title: 'پژوهش', desc: 'بیش از ۳۰ مقاله علمی بین‌المللی' },
];

export default function About() {
  const { ref, active } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 bg-slate-50/95 relative overflow-hidden">
      <div className="absolute inset-0 medical-pattern opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`reveal ${active ? 'active' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-4">
              درباره پزشک
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              آشنایی با <span className="gradient-text">دکتر محمد رضا هشترودی</span>
            </h2>
            <div className="section-divider w-32 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-teal-500/20 rounded-3xl rotate-3 transition-transform duration-500" />
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src={aboutImage} alt="دکتر هشترودی" className="w-full h-[450px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 glass rounded-2xl p-5 shadow-lg">
                <p className="text-slate-700 text-sm leading-relaxed text-center font-medium">
                  «هدف من ترکیب خرد طب سنتی با دستاوردهای روز پزشکی نوین برای درمان ریشه‌ای بیماری‌های صعب‌العلاج است.»
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                دکتر محمد رضا هشترودی، پزشک متخصص و پژوهشگر برجسته در حوزه طب سوزنی، لیزر درمانی و اکوپانکچر،
                با بیش از دو دهه تجربه بالینی در درمان بیماری‌های عصبی و خودایمنی. ایشان با ترکیب روش‌های نوین
                لیزر درمانی و اکوپانکچر با دانش طب سنتی، رویکردی منحصر به فرد برای درمان بیماری‌هایی چون ام‌اس،
                گیلن‌باره و بیماری‌های vegetative ارائه می‌دهند.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                دکتر هشترودی فلوشیپ طب سوزنی را در چین گذرانده و بورد تخصصی لیزر درمانی پزشکی را دریافت کرده‌اند.
                ایشان با ارائه بیش از ۳۰ مقاله علمی در ژورنال‌های معتبر بین‌المللی، از پیشگامان درمان نوین
                بیماری‌های خودایمنی در ایران به شمار می‌روند.
              </p>

              {/* Credentials grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {credentials.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white shadow-sm border border-slate-100 card-hover"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{c.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{c.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
