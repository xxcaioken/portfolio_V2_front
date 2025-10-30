import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const getStoredTheme = (): Theme | null => {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') return t;
    return null;
  } catch {
    return null;
  }
}

const applyTheme = (t: Theme) => {
  const root = document.documentElement;
  if (t === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme());

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (!getStoredTheme()) setTheme(getSystemTheme());
    };
    mql.addEventListener?.('change', listener);
    return () => mql.removeEventListener?.('change', listener);
  }, []);

  const isDark = theme === 'dark';
  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-beige-200/60 bg-white/80 text-stone-700 shadow-sm transition hover:bg-beige-100 focus:outline-none focus:ring-2 focus:ring-beige-400 dark:border-stone-800/60 dark:bg-stone-900/70 dark:text-stone-100 dark:hover:bg-stone-800/70 dark:focus:ring-stone-700"
    >
      {isDark ? (
        // Sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;


