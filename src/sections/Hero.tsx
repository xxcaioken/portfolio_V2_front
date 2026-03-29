import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAbout } from '../lib/useAbout';
import { resolveApiUrl } from '../lib/api';
import { useI18n } from '../i18n';

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function useTypewriter(text: string, startDelay = 1000, speed = 52) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!text) { setDisplayed(''); return; }
    let interval: ReturnType<typeof setInterval> | null = null;
    let i = 0;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, startDelay, speed]);
  return displayed;
}

const Hero = () => {
  const { about } = useAbout();
  const { t } = useI18n();
  const [avatarError, setAvatarError] = useState(false);
  const displayedTitle = useTypewriter(about?.title ?? '', 1000, 52);
  const isTyping = displayedTitle.length < (about?.title?.length ?? 0);
  const name = about?.name || '';

  return (
    <section id="home" className="container-page relative min-h-[88vh] flex flex-col justify-center overflow-hidden py-16 sm:py-20">

      {/* Blobs animados de fundo */}
      <div className="pointer-events-none absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-beige-200/55 blur-3xl animate-blob dark:bg-stone-800/30" />
      <div
        className="pointer-events-none absolute -bottom-36 -right-24 h-[420px] w-[420px] rounded-full bg-sand-300/45 blur-3xl animate-blob dark:bg-stone-700/20"
        style={{ animationDelay: '3.5s' }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 h-[280px] w-[280px] rounded-full bg-beige-300/25 blur-3xl animate-blob dark:bg-stone-800/15"
        style={{ animationDelay: '7s' }}
      />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div className="flex flex-col items-start gap-6 flex-1">

          {/* Badge localização */}
          <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <Badge tone="sand">{about?.location || '—'}</Badge>
          </div>

          {/* Nome — letra por letra */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
              {name ? (
                name.split('').map((char, i) => (
                  <span
                    key={i}
                    className="inline-block animate-char-reveal"
                    style={{ animationDelay: `${0.15 + i * 0.035}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))
              ) : (
                <span className="opacity-0">loading</span>
              )}
            </h1>

            {/* Cargo — efeito typewriter */}
            <p className="mt-3 text-lg sm:text-xl text-beige-700 dark:text-beige-400 font-medium min-h-[1.75rem] flex items-center gap-1">
              <span>{displayedTitle}</span>
              {isTyping && (
                <span className="inline-block w-0.5 h-[1.1em] bg-beige-500 dark:bg-beige-400 animate-pulse rounded-full align-middle" />
              )}
            </p>
          </div>

          {/* Resumo */}
          <p
            className="animate-fade-up max-w-2xl text-stone-600 dark:text-stone-400 leading-relaxed"
            style={{ animationDelay: '0.9s' }}
          >
            {about?.summary || ''}
          </p>

          {/* Botões */}
          <div
            className="animate-scale-up flex flex-wrap gap-3"
            style={{ animationDelay: '1.1s' }}
          >
            <a href={`mailto:${about?.email || ''}`}>
              <Button>{t('hero.contactEmail')}</Button>
            </a>
            {about?.linkedin ? (
              <a href={about.linkedin} target="_blank" rel="noreferrer">
                <Button variant="ghost">LinkedIn →</Button>
              </a>
            ) : null}
          </div>
        </div>

        {/* Avatar flutuante */}
        {about?.name ? (
          <div
            className="animate-fade-in shrink-0 relative"
            style={{ animationDelay: '0.3s' }}
          >
            {/* Glow atrás */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-beige-300/70 to-sand-300/50 blur-2xl scale-[1.15] dark:from-stone-700/35 dark:to-stone-600/25" />
            {about.avatarUrl && !avatarError ? (
              <img
                src={resolveApiUrl(about.avatarUrl)}
                alt="Avatar"
                onError={() => setAvatarError(true)}
                className="relative h-36 w-36 sm:h-48 sm:w-48 md:h-64 md:w-64 rounded-2xl object-cover ring-2 ring-beige-300/60 shadow-2xl animate-float dark:ring-stone-600/50"
              />
            ) : (
              <div className="relative h-36 w-36 sm:h-48 sm:w-48 md:h-64 md:w-64 rounded-2xl bg-beige-200 dark:bg-stone-800 flex items-center justify-center ring-2 ring-beige-300/60 shadow-2xl animate-float dark:ring-stone-600/50">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-beige-700 dark:text-beige-400 select-none">
                  {getInitials(about.name)}
                </span>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Indicador de scroll */}
      <div
        className="animate-fade-in absolute bottom-6 left-0 right-0 flex justify-center"
        style={{ animationDelay: '1.6s' }}
      >
        <div className="animate-bounce-down opacity-35 dark:opacity-20">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 9 11 15 17 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
