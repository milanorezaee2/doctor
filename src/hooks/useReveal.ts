import { useEffect, useRef, useState } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * یک‌بار ظاهر شدن و سپس unobserve — بر خلاف نسخهٔ قبلی که ناظر را رها می‌کرد.
 * در مرورگرهای دارای `animation-timeline` فقط برای `prefers-reduced-motion` اهمیت دارد،
 * چون آنجا انیمیشن reveal با CSS انجام می‌شود.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReduced()) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}
