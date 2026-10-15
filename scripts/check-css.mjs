/**
 * بررسی پوشش کلاس‌ها بعد از مهاجرت به Tailwind v4:
 * هر توکنی که در JSX استفاده شده ولی در CSS بیلد‌شده تولید نشده = کلاس مردد/اشتباه.
 * اجرا: npm run check:css
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx|ts|html|css)$/.test(p)) files.push(p);
  }
};
walk(join(root, 'src'));
files.push(join(root, 'index.html'));

const cssFiles = readdirSync(join(root, 'dist', 'assets')).filter((f) => f.endsWith('.css'));
const css = cssFiles.map((f) => readFileSync(join(root, 'dist', 'assets', f), 'utf8')).join('\n');

const tokens = new Set();
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(/className=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g)) {
    const raw = (m[1] ?? m[2] ?? m[3] ?? '').replace(/\$\{[^}]*\}/g, ' ');
    for (const c of raw.split(/\s+/)) if (c) tokens.add(c);
  }
}

const escape = (s) => s.replace(/[[\]()./:,%*#'"\\]/g, (ch) => '\\' + ch);

const isTemplateNoise = (t) => /[${}|&?<>=]/.test(t);

const missing = [];
for (const t of tokens) {
  if (isTemplateNoise(t)) continue;
  const base = t.split(':').at(-1);
  if (/^\[.*\]$/.test(base)) continue; // arbitrary value
  if (/^(group|peer)(\/|$)/.test(t)) continue;
  const sel = '.' + escape(t);
  if (!css.includes(sel)) missing.push(t);
}

if (missing.length) {
  console.log(`✖ ${missing.length} توکن در CSS بیلد‌شده پیدا نشد:\n  ` + missing.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${tokens.size} توکن کلاس — همه در CSS بیلد‌شده وجود دارند`);
