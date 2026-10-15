import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// Tailwind v4 با پلاگین Vite کار می‌کند: بدون PostCSS، بدون tailwind.config.js
// https://vite.dev/config/
export default defineConfig({
  base: '/doctor/',
  plugins: [react(), tailwindcss()],
  server: {
    // پیش‌نمایش Arena از پروکسی با دامنهٔ e2b.app می‌آید؛ بدون این خط Vite 8 با 403 رد می‌کند
    allowedHosts: ['.e2b.app'],
  },
  preview: {
    allowedHosts: ['.e2b.app'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
