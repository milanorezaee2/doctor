import {
  Activity,
  Award,
  BookOpen,
  Bone,
  Brain,
  Calendar,
  GraduationCap,
  HandHeart,
  Heart,
  MapPin,
  Network,
  Phone,
  Quote,
  Shield,
  Sparkles,
  Stethoscope,
  Users,
  Waves,
  Zap,
} from 'lucide-react';
import type { ComponentType } from 'react';

const registry = {
  activity: Activity,
  award: Award,
  book: BookOpen,
  bone: Bone,
  brain: Brain,
  calendar: Calendar,
  care: HandHeart,
  grad: GraduationCap,
  graduation: GraduationCap,
  heart: Heart,
  map: MapPin,
  network: Network,
  phone: Phone,
  quote: Quote,
  shield: Shield,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  users: Users,
  waves: Waves,
  zap: Zap,
} as const;

export type IconName = keyof typeof registry;

export function Icon({
  name,
  className = 'w-5 h-5',
}: {
  name: string;
  className?: string;
}): React.ReactElement {
  const lookup = registry as Record<string, ComponentType<{ className?: string }>>;
  const Cmp = lookup[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
