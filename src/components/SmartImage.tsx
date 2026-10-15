import { useState } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  /** ابعاد ذاتی فایل — برای رزرو فضا و CLS = 0 */
  width: number;
  height: number;
  /** تصویرِ داخل viewport اول: eager + fetchpriority=high */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** متن جایگزینِ تایپوگرافیک وقتی عکس واقعی هنوز آماده نشده */
  fallbackLabel?: string;
};

/**
 * تمام تصاویر سایت از همین‌جا می‌روند تا هیچ‌وقت `width/height/loading` جا نیفتد.
 * با `vite-imagetools` و فایل‌های محلی، `src` می‌تواند `?w=640;1280&format=avif,webp` بگیرد.
 */
export default function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  imgClassName = '',
  fallbackLabel,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div
        className={`flex items-end justify-start bg-linear-to-br from-ink-800 to-ink-950 p-5 ${className}`}
        aria-hidden="true"
      >
        <p className="text-xs text-teal-soft/70 font-medium">
          {fallbackLabel ?? 'این قاب برای عکس واقعی مطب رزرو شده است'}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-sand-200 ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!loaded && <div className="absolute inset-0 shimmer" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
