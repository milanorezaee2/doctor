import { Activity, Phone, Mail, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950/95 text-slate-400 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">دکتر محمد رضا هشترودی</p>
                <p className="text-cyan-400 text-xs">متخصص طب سوزنی و لیزر درمانی</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              درمان نوین بیماری‌های عصبی و خودایمنی با ترکیب طب سنتی و تکنولوژی روز پزشکی
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-cyan-600 flex items-center justify-center transition-all duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.youtube.com/@dr.hashtroodi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              {[
                { label: 'خانه', id: 'home' },
                { label: 'درباره پزشک', id: 'about' },
                { label: 'خدمات', id: 'services' },
                { label: 'بیماری‌های درمان‌شدنی', id: 'conditions' },
                { label: 'ویدیوها', id: 'videos' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">خدمات</h4>
            <ul className="space-y-2">
              {['طب سوزنی', 'لیزر درمانی', 'اکوپانکچر', 'درمان ام‌اس', 'درمان گیلن‌باره'].map((s) => (
                <li key={s}>
                  <span className="text-sm hover:text-cyan-400 transition-colors cursor-pointer">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">تماس</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، کلینیک تخصصی طب سوزنی</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>۰۲۱-۲۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>info@dr-hashtroodi.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © ۱۴۰۴ - تمامی حقوق برای دکتر محمد رضا هشترودی محفوظ است
          </p>
          <p className="text-xs text-slate-500">
            طراحی و توسعه با عشق برای سلامتی شما
          </p>
        </div>
      </div>
    </footer>
  );
}
