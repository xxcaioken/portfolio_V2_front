import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAbout } from '../lib/useAbout';
import { resolveApiUrl } from '../lib/api';
import { useI18n } from '../i18n';

const Hero = () => {
  const { about } = useAbout();
  const { t } = useI18n();
  return (
    <section id="home" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-beige-100/60 via-transparent to-transparent dark:from-stone-900/40" />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col items-start gap-5">
          <div className="animate-fade-up" style={{ animationDelay: '0s' }}>
            <Badge tone="sand">{about?.location || '—'}</Badge>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {about?.name || '—'}
            </h1>
            <p className="mt-2 text-lg text-beige-700 dark:text-beige-400 font-medium">{about?.title || ''}</p>
          </div>
          <p className="animate-fade-up max-w-2xl text-stone-600 dark:text-stone-400 leading-relaxed" style={{ animationDelay: '0.2s' }}>
            {about?.summary || ''}
          </p>
          <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: '0.3s' }}>
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
        {about?.avatarUrl ? (
          <div className="animate-fade-in shrink-0" style={{ animationDelay: '0.15s' }}>
            <img
              src={resolveApiUrl(about.avatarUrl)}
              alt="Avatar"
              className="h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 rounded-2xl object-cover ring-2 ring-beige-300/60 shadow-lg dark:ring-stone-700/60"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Hero;
