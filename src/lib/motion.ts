/**
 * GSAP فقط وقتی لازم است بارگذاری می‌شود (dynamic import) تا باندل اولیه سبک بماند.
 * - با prefers-reduced-motion هیچ‌چیز دانلود نمی‌شود
 * - useEffect‌ها با ctx.revert() تمیز بسته می‌شوند
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type GsapModule = {
  gsap: typeof import('gsap').default;
  SplitText: typeof import('gsap/SplitText').SplitText;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
};

let promise: Promise<GsapModule> | null = null;

export function loadMotion(): Promise<GsapModule> {
  if (!promise) {
    promise = Promise.all([import('gsap'), import('gsap/SplitText'), import('gsap/ScrollTrigger')]).then(
      ([core, split, trigger]) => {
        const gsap = core.default;
        gsap.registerPlugin(split.SplitText, trigger.ScrollTrigger);
        return {
          gsap,
          SplitText: split.SplitText,
          ScrollTrigger: trigger.ScrollTrigger,
        };
      }
    );
  }
  return promise;
}

/** انیمیشن حروف‌به‌حروفِ عنوان؛ برگشت توابع پاک‌سازی را به مسئول خود می‌سپارد */
export async function animateTitle(el: HTMLElement): Promise<() => void> {
  if (prefersReducedMotion()) return () => {};
  const { gsap, SplitText } = await loadMotion();
  const split = new SplitText(el, { type: 'lines,words' });
  const tween = gsap.from(split.words, {
    yPercent: 118,
    opacity: 0,
    rotate: 2.5,
    duration: 1.05,
    ease: 'expo.out',
    stagger: 0.05,
  });
  return () => {
    tween.kill();
    split.revert();
  };
}

/** پارالاکس آرام روی یک عنصر (scrub) */
export async function parallax(el: HTMLElement, amount = 8): Promise<() => void> {
  if (prefersReducedMotion()) return () => {};
  const { gsap } = await loadMotion();
  const ctx = gsap.context(() => {
    gsap.to(el, {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  return () => ctx.revert();
}
