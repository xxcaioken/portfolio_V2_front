import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }
>;

const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  const base = 'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-900';
  const styles =
    variant === 'primary'
      ? 'bg-beige-700 text-white hover:bg-beige-800 focus:ring-beige-400 dark:bg-beige-600 dark:hover:bg-beige-500 dark:focus:ring-beige-500'
      : 'text-stone-800 hover:bg-beige-200/60 focus:ring-beige-300 dark:text-stone-200 dark:hover:bg-stone-800/60 dark:focus:ring-stone-700';
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;


