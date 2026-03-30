import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import Skeleton from '../components/ui/Skeleton';
import { habilitiesApi } from '../lib/habilities';
import type { HabilityResponse } from '../types/hability';
import { findTechKey } from '../icons/tech.data';
import { TechIcon } from '../icons/TechIcon';
import { useI18n } from '../i18n';
import { useInView } from '../lib/useInView';
import { useCache } from '../lib/useCache';

const Skills = () => {
  const { t, lang } = useI18n();
  const { data, loading, error } = useCache<HabilityResponse[]>(`skills_${lang}`, () => habilitiesApi.list(lang));
  const items = data ?? [];
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} id="skills" className="section">
      <SectionHeading title={t('nav.skills')} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-lg border border-beige-200/70 bg-white/80 p-5 shadow-sm dark:border-stone-800/70 dark:bg-stone-900/70">
              <Skeleton className="h-4 w-28 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3].map(j => <Skeleton key={j} className="h-6 w-16 rounded-full" />)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((h, idx) => (
            <div
              key={h.id}
              className={`transition-[opacity,transform] duration-500 ease-out${items.length % 2 !== 0 && idx === items.length - 1 ? ' sm:col-span-2' : ''}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: inView ? `${idx * 0.08}s` : '0s',
              }}
            >
              <Card title={h.hability}>
                {(h.bullets?.length ?? 0) > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {h.bullets.map((b, i) => {
                      const k = b.badge ? findTechKey(b.badge) : null;
                      return (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-full border border-beige-200 bg-beige-50 px-3 py-1 text-xs font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-300"
                        >
                          {k ? <TechIcon name={k} className="shrink-0" /> : null}
                          {b.text}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-sm text-stone-600">Sem itens</span>
                )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Skills;
