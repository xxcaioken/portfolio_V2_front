import type { PropsWithChildren } from 'react';

type BadgeProps = PropsWithChildren<{ tone?: 'beige' | 'sand' } & { className?: string }>; 

export default function Badge({ tone = 'beige', className = '', children }: BadgeProps) {
  const tones = {
    beige: 'bg-beige-200 text-stone-800 ring-beige-300 dark:bg-stone-800 dark:text-stone-100 dark:ring-stone-700',
    sand: 'bg-sand-300 text-stone-900 ring-sand-500/50 dark:bg-stone-800 dark:text-stone-100 dark:ring-stone-700',
  } as const;
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}


