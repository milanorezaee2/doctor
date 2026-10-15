import { Users, Calendar, Award, Heart } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { icon: Users, target: 5000, suffix: '+', label: 'بیمار درمان‌شده', color: 'from-cyan-500 to-teal-400' },
  { icon: Calendar, target: 20, suffix: '+', label: 'سال تجربه بالینی', color: 'from-teal-500 to-emerald-400' },
  { icon: Award, target: 30, suffix: '+', label: 'مقاله علمی بین‌المللی', color: 'from-cyan-600 to-cyan-400' },
  { icon: Heart, target: 98, suffix: '%', label: 'رضایت بیماران', color: 'from-emerald-500 to-teal-400' },
];

function StatCard({ icon: Icon, target, suffix, label, color, start }: {
  icon: typeof Users;
  target: number;
  suffix: string;
  label: string;
  color: string;
  start: boolean;
}) {
  const count = useCountUp(target, 2000, start);

  return (
    <div className="text-center p-8 rounded-3xl glass card-hover">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <p className="text-4xl lg:text-5xl font-black gradient-text counter mb-2">
        {count.toLocaleString('fa-IR')}{suffix}
      </p>
      <p className="text-slate-600 font-medium text-sm">{label}</p>
    </div>
  );
}

export default function Stats() {
  const { ref, active } = useReveal<HTMLDivElement>();

  return (
    <section id="stats" className="py-24 bg-white/95 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 medical-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`reveal ${active ? 'active' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-4">
              آمار و دستاوردها
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              <span className="gradient-text">دستاوردهای</span> بالینی
            </h2>
            <div className="section-divider w-32 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} start={active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
