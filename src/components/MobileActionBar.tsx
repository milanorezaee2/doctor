import { useEffect, useState } from 'react';
import { CalendarPlus, Navigation, Phone } from 'lucide-react';
import { bookingHref, hasWhatsapp, mapHref, site, telHref } from '@/site';

/**
 * نوار شناور پایین صفحه فقط روی موبایل — جایی که بیشترِ نوبت‌ها گرفته می‌شود.
 * بعد از عبور از Hero ظاهر می‌شود تا صفحهٔ اول را نگیرد.
 */
export default function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-ink-900/8 bg-sand-50/95 px-3 pt-2 shadow-[0_-8px_28px_-14px_rgba(15,23,42,0.28)] backdrop-blur-lg transition-transform duration-400 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!show}
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={telHref}
          className="flex flex-col items-center gap-1 rounded-xl bg-white px-2 py-2 text-[11px] font-bold text-ink-800 ring-1 ring-ink-900/6"
          tabIndex={show ? 0 : -1}
        >
          <Phone className="h-4.5 w-4.5 text-teal-deep" />
          تماس
        </a>
        <a
          href={bookingHref}
          className="btn-primary flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-bold"
          tabIndex={show ? 0 : -1}
        >
          <CalendarPlus className="h-4.5 w-4.5" />
          {hasWhatsapp ? 'نوبت واتساپی' : 'نوبت تلفنی'}
        </a>
        <a
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-xl bg-white px-2 py-2 text-[11px] font-bold text-ink-800 ring-1 ring-ink-900/6"
          tabIndex={show ? 0 : -1}
        >
          <Navigation className="h-4.5 w-4.5 text-teal-deep" />
          مسیر
          <span className="sr-only">{site.contact.addressShort}</span>
        </a>
      </div>
    </div>
  );
}
