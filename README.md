# سایت دکتر محمدرضا هشترودی — طب سوزنی و لیزر درمانی

تک‌صفحه‌ایِ فارسی و راست‌به‌چپ، ساخته‌شده با **React 19 + TypeScript + Vite 8 + Tailwind CSS v4** (بدون بک‌اند؛ خروجی استاتیک روی GitHub Pages).

## اجرای محلی

```bash
npm ci
npm run dev        # http://localhost:5173/doctor/
npm run build      # خروجی در dist/
npm run preview
```

بررسی‌های کیفیت:

| دستور | کاری که می‌کند |
|---|---|
| `npm run typecheck` | TypeScript، بدون خطا |
| `npm run lint` | ESLint (react-hooks + react-refresh) |
| `npm run check:css` | بیلد + بررسی اینکه **همهٔ کلاس‌های به‌کاررفته در CSS بیلد‌شده وجود دارند** (شبیه‌ساز رگرسیون مهاجرت به Tailwind v4) |

## ویرایش محتوا — فقط یک فایل

تمام متن‌ها، شماره تماس‌ها، خدمات، بیماری‌ها، سؤالات متکرر، آمار و ویدیوها در
[`src/site.ts`](src/site.ts) هستند. کامپوننت‌ها هیچ متنی ندارند.

| می‌خواهید… | بروید به |
|---|---|
| شمارهٔ تلفن/واتساپ/ایمیل/آدرس/ساعات کاری | `site.contact` |
| شمارهٔ نظام پزشکی و پروانهٔ مطب | `site.brand.medicalCouncilNumber` · `clinicLicense` |
| عکس واقعی پزشک و مطب | `site.photos` (تا خالی باشد، چیدمان جایگزینِ تایپوگرافیک نشان می‌دهد — عکس استوکِ چهره هرگز) |
| افزودن ویدیوی واقعی | `site.videos` → `{ id, title, description, category }` |
| نتایج قبل/بعد | `site.results` (نیازمند رضایت‌نامهٔ کتبی بیمار) |
| نرخ ویزیت | `src/components/Faq.tsx` → کارت «هزینه و بیمه» |

دکمهٔ «نوبت واتساپی» خودکار بین واتساپ و تلفن سوییچ می‌کند: به‌محض اینکه
`site.contact.whatsapp` را پر کنید، همهٔ CTAها (و فرم تماس) به واتساپ می‌روند.
فرم تماس بدون بک‌اند کار می‌کند: پیام را در واتساپ/ایمیل آمادهٔ ارسال می‌کند.

## افزودن عکس واقعی

```bash
mkdir -p src/assets && cp ~/photos/doctor.jpg src/assets/
```
```tsx
// پیشنهاد: با vite-imagetools برای AVIF/WebP + srcset
import portrait from '@/assets/doctor.jpg?w=640;960;1280&format=avif,webp';
```
سپس `site.photos.heroPortrait = new URL(...)` یا مستقیم در کامپوننت مربوطه.

## ساختار صفحه

`Hero → Process → About → Services → Conditions → Results → Videos → Stats → Testimonials → Faq → Contact → Footer`
+ `MobileActionBar` (نوار شناور تماس/نوبت/مسیر روی موبایل) + `Seo` (JSON-LD از همان `site.ts`).

`base` در `vite.config.ts` برابر `/doctor/` است (مسیر GitHub Pages). با دامنهٔ اختصاصی، آن را به `/` تغییر دهید
و آدرس‌های `milanorezaee2.github.io/doctor` را در `index.html`، `src/components/Seo.tsx`، `public/sitemap.xml` و `public/robots.txt` جایگزین کنید.

> پیشنهاد کاملِ ارتقا محتوا/تصویر/ساختار و وضعیت اجرای آن: [`docs/content-ux-proposal.md`](docs/content-ux-proposal.md)
