import ThemeToggle from '../ui/ThemeToggle';
import { useAbout } from '../../lib/useAbout';
import { isAuthenticated, clearAuthenticated } from '../../auth/storage';
import { isAdmin } from '../../auth/roles';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import ReactCountryFlag from 'react-country-flag';
import { useState } from 'react';

const Header = () => {
  const { about } = useAbout();
  const navigate = useNavigate();
  const { t, lang, setLang } = useI18n();
  const [openLang, setOpenLang] = useState(false);
  const authed = isAuthenticated();
  const admin = isAdmin();
  const onLogout = () => { clearAuthenticated(); navigate('/', { replace: true }); };
  return (
    <header className="sticky top-0 z-40 border-b border-beige-200/60 bg-beige-50/70 backdrop-blur dark:border-stone-800/60 dark:bg-stone-950/60">
      <nav className="container-page flex h-14 items-center justify-between" role="navigation" aria-label="Navegação principal">
        <a href="#home" className="font-semibold tracking-wide text-stone-900 dark:text-stone-100">{about?.name || '—'}</a>
        <div className="flex items-center gap-4">
          <ul className="hidden sm:flex items-center gap-4 text-sm">
            <li><a className="hover:underline" href="#skills">{t('nav.skills')}</a></li>
            <li><a className="hover:underline" href="#experience">{t('nav.experience')}</a></li>
            <li><a className="hover:underline" href="#projects">{t('nav.projects')}</a></li>
            <li><a className="hover:underline" href="#contact">{t('nav.contact')}</a></li>
            {authed && admin ? (
              <li><a className="hover:underline" href="/management">{t('nav.management')}</a></li>
            ) : null}
          <li>
          {!authed ? (
            <a href="/login" className="text-sm">{t('auth.login')}</a>
          ) : (
            <a className="hover:underline cursor-pointer" onClick={onLogout}>{t('auth.logout')}</a>
          )}
          </li>
          <li className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={openLang}
              className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-beige-200/60 dark:hover:bg-stone-800/60"
              onClick={() => setOpenLang(v => !v)}
            >
              <ReactCountryFlag countryCode={lang === 'pt' ? 'BR' : 'US'} svg style={{ width: 20, height: 20 }} />
              <span className="hidden lg:inline">{lang.toUpperCase()}</span>
            </button>
            {openLang ? (
              <div role="menu" className="absolute right-0 mt-2 w-36 rounded-md border border-beige-200/70 bg-white p-1 shadow-lg dark:border-stone-800/60 dark:bg-stone-900/70">
                <button
                  type="button"
                  className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-beige-200/60 dark:hover:bg-stone-800/60 ${lang === 'pt' ? 'opacity-100' : 'opacity-80'}`}
                  onClick={() => { setLang('pt'); setOpenLang(false); }}
                >
                  <ReactCountryFlag countryCode="BR" svg style={{ width: 18, height: 18 }} />
                  <span>Português</span>
                </button>
                <button
                  type="button"
                  className={`mt-1 flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-beige-200/60 dark:hover:bg-stone-800/60 ${lang === 'en' ? 'opacity-100' : 'opacity-80'}`}
                  onClick={() => { setLang('en'); setOpenLang(false); }}
                >
                  <ReactCountryFlag countryCode="US" svg style={{ width: 18, height: 18 }} />
                  <span>English</span>
                </button>
              </div>
            ) : null}
          </li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;


