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
  const [mobileOpen, setMobileOpen] = useState(false);
  const authed = isAuthenticated();
  const admin = isAdmin();
  const onLogout = () => { clearAuthenticated(); navigate('/', { replace: true }); };
  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { href: '#skills', label: t('nav.skills') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
    ...(authed && admin ? [{ href: '/management', label: t('nav.management') }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-beige-200/60 bg-beige-50/80 backdrop-blur dark:border-stone-800/60 dark:bg-stone-950/70">
      <nav className="container-page flex h-14 items-center justify-between" role="navigation" aria-label="Navegação principal">
        <a href="#home" className="font-semibold tracking-wide text-stone-900 dark:text-stone-100">{about?.name || '—'}</a>
        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <ul className="hidden sm:flex items-center gap-4 text-sm">
            {navLinks.map(l => (
              <li key={l.href}><a className="hover:text-beige-700 dark:hover:text-beige-400 transition-colors" href={l.href}>{l.label}</a></li>
            ))}
            <li>
              {!authed ? (
                <a href="/login" className="text-sm hover:text-beige-700 dark:hover:text-beige-400 transition-colors">{t('auth.login')}</a>
              ) : (
                <a className="cursor-pointer hover:text-beige-700 dark:hover:text-beige-400 transition-colors" onClick={onLogout}>{t('auth.logout')}</a>
              )}
            </li>
            <li className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openLang}
                className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-beige-200/60 dark:hover:bg-stone-800/60 transition-colors"
                onClick={() => setOpenLang(v => !v)}
              >
                <ReactCountryFlag countryCode={lang === 'pt' ? 'BR' : 'US'} svg style={{ width: 20, height: 20 }} />
                <span className="hidden lg:inline">{lang.toUpperCase()}</span>
              </button>
              {openLang ? (
                <div role="menu" className="animate-slide-down absolute right-0 mt-2 w-36 rounded-md border border-beige-200/70 bg-white p-1 shadow-lg dark:border-stone-800/60 dark:bg-stone-900/70">
                  <button type="button" className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-beige-200/60 dark:hover:bg-stone-800/60 ${lang === 'pt' ? 'font-medium' : 'opacity-70'}`} onClick={() => { setLang('pt'); setOpenLang(false); }}>
                    <ReactCountryFlag countryCode="BR" svg style={{ width: 18, height: 18 }} />
                    <span>Português</span>
                  </button>
                  <button type="button" className={`mt-1 flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm hover:bg-beige-200/60 dark:hover:bg-stone-800/60 ${lang === 'en' ? 'font-medium' : 'opacity-70'}`} onClick={() => { setLang('en'); setOpenLang(false); }}>
                    <ReactCountryFlag countryCode="US" svg style={{ width: 18, height: 18 }} />
                    <span>English</span>
                  </button>
                </div>
              ) : null}
            </li>
          </ul>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-beige-200/60 dark:hover:bg-stone-800/60 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="2" y1="4" x2="16" y2="4" /><line x1="2" y1="9" x2="16" y2="9" /><line x1="2" y1="14" x2="16" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="sm:hidden animate-slide-down border-t border-beige-200/60 bg-beige-50/95 backdrop-blur dark:border-stone-800/60 dark:bg-stone-950/95">
          <nav className="container-page py-4 flex flex-col gap-1 text-sm">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={closeMobile} className="rounded-md px-3 py-2 hover:bg-beige-200/60 dark:hover:bg-stone-800/60 transition-colors">
                {l.label}
              </a>
            ))}
            <div className="border-t border-beige-200/60 dark:border-stone-800/60 mt-2 pt-2 flex items-center justify-between">
              {!authed ? (
                <a href="/login" onClick={closeMobile} className="rounded-md px-3 py-2 hover:bg-beige-200/60 dark:hover:bg-stone-800/60 transition-colors">{t('auth.login')}</a>
              ) : (
                <a className="cursor-pointer rounded-md px-3 py-2 hover:bg-beige-200/60 dark:hover:bg-stone-800/60 transition-colors" onClick={() => { onLogout(); closeMobile(); }}>{t('auth.logout')}</a>
              )}
              <div className="flex gap-2">
                <button type="button" className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs hover:bg-beige-200/60 dark:hover:bg-stone-800/60 ${lang === 'pt' ? 'font-medium' : 'opacity-60'}`} onClick={() => { setLang('pt'); closeMobile(); }}>
                  <ReactCountryFlag countryCode="BR" svg style={{ width: 16, height: 16 }} /> PT
                </button>
                <button type="button" className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs hover:bg-beige-200/60 dark:hover:bg-stone-800/60 ${lang === 'en' ? 'font-medium' : 'opacity-60'}`} onClick={() => { setLang('en'); closeMobile(); }}>
                  <ReactCountryFlag countryCode="US" svg style={{ width: 16, height: 16 }} /> EN
                </button>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
