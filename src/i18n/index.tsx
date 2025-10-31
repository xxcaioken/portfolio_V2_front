import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import pt from './locales/pt.json';
import en from './locales/en.json';

type Lang = 'pt' | 'en';
const DICTS: Record<Lang, Record<string, string>> = { pt, en };
const STORAGE_KEY = 'app_lang';

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const defaultLang = (localStorage.getItem(STORAGE_KEY) as Lang) || ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem(STORAGE_KEY, l); };
  const t = (key: string, vars?: Record<string, string | number>) => {
    let s = (DICTS[lang] && DICTS[lang][key]) ?? key;
    if (vars) {
      for (const [p, v] of Object.entries(vars)) {
        s = s.replace(new RegExp(`{${p}}`, 'g'), String(v));
      }
    }
    return s;
  };
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};


