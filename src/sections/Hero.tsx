import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAbout } from '../lib/useAbout';
import { resolveApiUrl } from '../lib/api';
import { useI18n } from '../i18n';

const Hero = () => {
  const { about } = useAbout();
  const { t } = useI18n();
  return (
    <section id="home" className="section">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col items-start gap-6">
          <Badge tone="sand">{about?.location || '—'}</Badge>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              {about?.name || '—'}
            </h1>
            <p className="mt-2 text-lg text-stone-700">{about?.title || ''}</p>
          </div>
          <p className="max-w-3xl text-stone-700">
            {about?.summary || ''}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${about?.email || ''}`}>
              <Button>{t('hero.contactEmail')}</Button>
            </a>
            {about?.linkedin ? (
              <a href={about.linkedin} target="_blank" rel="noreferrer">
                <Button variant="ghost">LinkedIn</Button>
              </a>
            ) : null}
          </div>
        </div>
        {about?.avatarUrl ? (
          <img
            src={resolveApiUrl(about.avatarUrl)}
            alt="Avatar"
            className="h-28 w-28 sm:h-32 sm:w-32 md:h-full md:w-70 rounded-full object-cover ring-1 ring-beige-200/60 dark:ring-stone-800/60"
          />
        ) : null}
      </div>
    </section>
  );
}

export default Hero;


