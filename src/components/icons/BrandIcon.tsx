import { brandPaths, type BrandName } from './brandPaths';

type Props = {
  name: BrandName;
  className?: string;
  /** رنگ برند درست می‌شود اگر خالی باشد */
  color?: string;
};

/** lucide-react v1 آیکون برند ندارد → مسیرهای SVG وندور شده (Simple Icons، CC0) */
export default function BrandIcon({ name, className = 'w-5 h-5', color }: Props) {
  const brand = brandPaths[name];
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={brand.label}
      className={className}
      fill={color ?? 'currentColor'}
      focusable="false"
    >
      <path d={brand.path} />
    </svg>
  );
}
