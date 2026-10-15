import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const contactInfo = [
  { icon: MapPin, label: 'آدرس', value: 'تهران، خیابان ولیعصر، بالاتر از پارک‌وی، کلینیک تخصصی طب سوزنی' },
  { icon: Phone, label: 'تلفن تماس', value: '۰۲۱-۲۲۳۴۵۶۷۸' },
  { icon: Mail, label: 'ایمیل', value: 'info@dr-hashtroodi.com' },
  { icon: Clock, label: 'ساعات کاری', value: 'شنبه تا چهارشنبه: ۹ تا ۱۸ | پنجشنبه: ۹ تا ۱۳' },
];

export default function Contact() {
  const { ref, active } = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    condition: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', condition: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`reveal ${active ? 'active' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium mb-4">
              تماس و نوبت‌دهی
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              <span className="gradient-text">رزرو نوبت</span> و مشاوره
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              برای رزرو نوبت یا مشاوره رایگان، فرم زیر را تکمیل کنید یا با ما تماس بگیرید
            </p>
            <div className="section-divider w-32 mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-2xl glass-dark card-hover"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-cyan-300 text-sm font-medium mb-1">{info.label}</p>
                      <p className="text-white text-sm leading-relaxed">{info.value}</p>
                    </div>
                  </div>
                );
              })}

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden h-48 glass-dark">
                <iframe
                  src="https://maps.google.com/maps?q=Tehran%20Valiasr&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-80"
                  loading="lazy"
                  title="موقعیت کلینیک"
                />
              </div>
            </div>

            {/* Form */}
            <div className="glass-dark rounded-3xl p-8">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-6 animate-scaleIn">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">درخواست شما ثبت شد!</h3>
                  <p className="text-slate-400 text-sm">به زودی با شما تماس خواهیم گرفت.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-cyan-300 text-sm font-medium mb-2">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>

                  <div>
                    <label className="block text-cyan-300 text-sm font-medium mb-2">شماره تماس</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    />
                  </div>

                  <div>
                    <label className="block text-cyan-300 text-sm font-medium mb-2">نوع بیماری</label>
                    <select
                      required
                      value={form.condition}
                      onChange={(e) => setForm({ ...form, condition: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    >
                      <option value="" className="bg-slate-800">انتخاب کنید</option>
                      <option value="ms" className="bg-slate-800">ام‌اس</option>
                      <option value="gbs" className="bg-slate-800">گیلن‌باره</option>
                      <option value="autoimmune" className="bg-slate-800">بیماری خودایمنی</option>
                      <option value="neuropathy" className="bg-slate-800">نوروپاتی</option>
                      <option value="vegetative" className="bg-slate-800">بیماری Vegetative</option>
                      <option value="other" className="bg-slate-800">سایر</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-cyan-300 text-sm font-medium mb-2">توضیحات</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                      placeholder="علائم و شرح حال خود را بنویسید..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    ثبت درخواست نوبت
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
