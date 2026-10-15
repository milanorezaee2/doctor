import { useEffect, useState } from 'react';
import { Menu, X, Activity } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'خانه' },
  { id: 'about', label: 'درباره پزشک' },
  { id: 'services', label: 'خدمات' },
  { id: 'conditions', label: 'بیماری‌های درمان‌شدنی' },
  { id: 'videos', label: 'ویدیوها' },
  { id: 'stats', label: 'آمار و دستاوردها' },
  { id: 'testimonials', label: 'تجربه بیماران' },
  { id: 'contact', label: 'تماس و نوبت‌دهی' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.id);
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                scrolled ? 'bg-gradient-to-br from-cyan-700 to-teal-500' : 'bg-white/15 backdrop-blur-md border border-white/30'
              }`}>
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-base leading-tight transition-colors duration-500 ${
                  scrolled ? 'text-slate-900' : 'text-white'
                }`}>
                  دکتر محمد رضا هشترودی
                </span>
                <span className={`text-xs transition-colors duration-500 ${
                  scrolled ? 'text-cyan-700' : 'text-cyan-200'
                }`}>
                  متخصص طب سوزنی و لیزر درمانی
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? scrolled
                        ? 'bg-cyan-700/10 text-cyan-700'
                        : 'bg-white/15 text-white backdrop-blur-md'
                      : scrolled
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-cyan-700'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden lg:flex btn-primary px-6 py-2.5 rounded-xl text-sm font-bold"
            >
              نوبت‌دهی
            </button>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-400 overflow-y-auto ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-24">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-right px-4 py-3 rounded-xl font-medium transition-all ${
                    activeSection === link.id
                      ? 'bg-gradient-to-l from-cyan-700 to-teal-500 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-bold mt-4"
              >
                نوبت‌دهی
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
