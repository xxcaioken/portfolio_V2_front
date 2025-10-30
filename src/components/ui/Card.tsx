import type { PropsWithChildren, ReactNode } from 'react';

type CardProps = PropsWithChildren<{ title?: ReactNode; footer?: ReactNode; className?: string }>; 

const Card = ({ title, footer, className = '', children }: CardProps) => {
  return (
    <div className={`rounded-lg border border-beige-200/70 bg-white/80 p-5 shadow-sm dark:border-stone-800/70 dark:bg-stone-900/70 ${className}`}>
      {title ? <h3 className="mb-2 text-base font-semibold text-stone-900 dark:text-stone-100">{title}</h3> : null}
      <div className="text-sm text-stone-700 dark:text-stone-300">{children}</div>
      {footer ? <div className="mt-3 text-xs text-stone-500 dark:text-stone-400">{footer}</div> : null}
    </div>
  );
}

export default Card;


