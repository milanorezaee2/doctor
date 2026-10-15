import { useEffect, useRef } from 'react';

/**
 * پس‌زمینهٔ ذرات — بازنویسی‌شده برای هزینهٔ پایین:
 * • به‌جای createRadialGradient برای هر ذره در هر فریم، یک اسپرایت پیش‌رندرشده drawImage می‌شود
 * • قفل ۲۴ فریم/ثانیه (ظاهر یکسان، مصرف باتری یک‌سوم)
 * • توقف کامل وقتی تب مخفی است
 * • با prefers-reduced-motion: فقط یک فریم ثابت
 * • DPR سقف‌دار و شمار ذره بر اساس مساحت
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
};

const CONNECT = 132;

function makeSprite(color: string, size = 24) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  if (!g) return c;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(1, 'rgba(14,116,144,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let running = true;

    const sprite = makeSprite('rgba(20,184,166,0.55)');
    let particles: Particle[] = [];

    const seed = () => {
      const count = Math.min(Math.floor((width * height) / 26000), 46);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.8 + 0.9,
        alpha: Math.random() * 0.3 + 0.12,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);

      // خطوط اتصال با فاصلهٔ مربّع (بدون sqrt)
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT * CONNECT) {
            const a = (1 - d2 / (CONNECT * CONNECT)) * 0.1;
            ctx.strokeStyle = `rgba(14,116,144,${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const s = p.r * 9;
        ctx.globalAlpha = p.alpha;
        ctx.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!running) return;
      if (now - last < 42) return; // ≈۲۴fps
      last = now;

      for (const p of particles) {
        p.x += p.vx * 1.8;
        p.y += p.vy * 1.8;
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        if (p.y > height + 12) p.y = -12;
      }
      paint();
    };

    resize();
    window.addEventListener('resize', resize);

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) {
      paint(); // یک فریم ثابت، بدون حلقه
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-45"
    />
  );
}
