import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

/**
 * بیلد «تک‌فایلی» برای پیش‌نمایش آفلاین: بدون base، بدون code-splitting،
 * و با سقفِ بی‌نهایت برای inline کردن asset ها (فونت‌ها data-URI می‌شوند).
 * اجرا: npm run preview:file
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    outDir: 'dist-standalone',
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
