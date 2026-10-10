import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  /** Size in px. */
  size?: number;
  /** Violet ring marking the signed-in user. */
  ring?: boolean;
  className?: string;
}

/** A round initial on sage, set in the display serif. */
export function UserAvatar({ name, size = 32, ring = false, className }: UserAvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-grid flex-none place-items-center rounded-full bg-sage font-display font-semibold leading-none text-[#26222E]',
        ring && 'ring-2 ring-secondary ring-offset-2 ring-offset-card',
        className
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.5) }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
