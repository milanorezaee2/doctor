import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** center برای سکشن‌های روایتی، start برای شکستن ریتم یکنواخت */
  align?: 'center' | 'start';
  tone?: 'light' | 'dark';
  /** رنگ بُرجک بالای عنوان */
  accent?: 'teal' | 'gold' | 'rose';
  className?: string;
};

const accents = {
  teal: {
    light: 'bg-teal-brand/10 text-teal-deep ring-teal-brand/15',
    dark: 'bg-teal-soft/12 text-teal-soft ring-white/10',
  },
  gold: {
    light: 'bg-gold/12 text-[oklch(0.52_0.1_80)] ring-gold/25',
    dark: 'bg-gold/15 text-gold ring-white/10',
  },
  rose: {
    light: 'bg-rose-100 text-rose-700 ring-rose-200',
    dark: 'bg-rose-500/15 text-rose-200 ring-white/10',
  },
};

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'light',
  accent = 'teal',
  className = '',
}: Props) {
  const dark = tone === 'dark';
  const centered = align === 'center';

  return (
    <header className={`${centered ? 'mx-auto text-center' : 'text-start max-w-2xl'} ${className}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ring-1 ${
          accents[accent][tone]
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-teal-soft' : 'bg-teal-brand'}`} />
        {eyebrow}
      </span>

      <h2
        className={`text-h2 mt-4 font-extrabold ${dark ? 'text-white' : 'text-ink-900'}`}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`text-lead mt-4 ${centered ? 'mx-auto max-w-2xl' : 'max-w-xl'} ${
            dark ? 'text-ink-300' : 'text-ink-700/85'
          }`}
        >
          {lead}
        </p>
      )}

      <div className={`section-divider mt-6 ${centered ? 'mx-auto w-28' : 'w-24'}`} />
    </header>
  );
}
