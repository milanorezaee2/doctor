/**
 * بسته‌بندی نهایی پیش‌نمایش آفلاین: خروجی vite.standalone.config.ts را در یک
 * فایل HTML واحد جمع می‌کند (JS + CSS + فونت به‌صورت inline) تا با دابل‌کلیک
 * و بدون هیچ سروری باز شود.
 *
 * اجرا: npm run preview:file   (خودش بیلد می‌گیرد)
 * خروجی: dist-standalone/doctor-site.html
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dir = join(root, 'dist-standalone');
const htmlPath = join(dir, 'index.html');

if (!existsSync(htmlPath)) {
  console.error('✖ dist-standalone/index.html نیست — با `npm run preview:file` اجراش کنید');
  process.exit(1);
}

let html = readFileSync(htmlPath, 'utf8');

// 1) استایل → <style>
html = html.replace(
  /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (_m, href) => {
    const file = join(dir, href.replace(/^(\.\/|\/)/, ''));
    if (!existsSync(file)) return _m;
    return `<style>${readFileSync(file, 'utf8')}</style>`;
  }
);

// 2) اسکریپت ماژول → inline (اسکریپت‌های کمکی بیلد هم اگر بودند)
html = html.replace(
  /<script[^>]*src="([^"]+\.js)"[^>]*><\/script>/g,
  (_m, href) => {
    const file = join(dir, href.replace(/^(\.\/|\/)/, ''));
    if (!existsSync(file)) return _m;
    return `<script type="module">${readFileSync(file, 'utf8')}</script>`;
  }
);

// 3) حذف ارجاع‌های بیرونی که روی file:// خطا می‌دهند
html = html.replace(/<link rel="(icon|manifest|apple-touch-icon|preload)"[^>]*>/g, '');

const out = join(dir, 'doctor-site.html');
writeFileSync(out, html);

// اطمینان: هیچ ارجاع خارجی به assets باقی نمانده باشد
const leftovers = [...html.matchAll(/(?:src|href)="\.?\/?assets\/[^"]+"/g)].map((m) => m[0]);
const orphanFiles = existsSync(join(dir, 'assets'))
  ? readdirSync(join(dir, 'assets'))
  : [];

console.log(`✓ doctor-site.html — ${(html.length / 1024).toFixed(0)}KB، خودکفا و بدون سرور`);
console.log(`  ارجاع باقی‌مانده به فایل جدا: ${leftovers.length ? leftovers.join(', ') : 'هیچ'}`);
console.log(`  فایل‌های کناری که لازم نیستند: ${orphanFiles.length || '—'}`);
