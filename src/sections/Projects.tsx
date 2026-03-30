import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SectionHeading from '../components/ui/SectionHeading';
import Skeleton from '../components/ui/Skeleton';
import { keyTasksApi } from '../lib/keytasks';
import type { KeyTaskResponse } from '../types/keytask';
import { findTechKey } from '../icons/tech.data';
import { TechIcon } from '../icons/TechIcon';
import { useI18n } from '../i18n';
import { useInView } from '../lib/useInView';
import { useCache } from '../lib/useCache';

const Projects = () => {
  const { t, lang } = useI18n();
  const { data, loading, error } = useCache<KeyTaskResponse[]>(`projects_${lang}`, () => keyTasksApi.list(lang));
  const items = data ?? [];
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} id="projects" className="section">
      <SectionHeading title={t('nav.projects')} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="rounded-lg border border-beige-200/70 bg-white/80 p-5 shadow-sm dark:border-stone-800/70 dark:bg-stone-900/70">
              <Skeleton className="h-4 w-36 mb-3" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
              <div className="flex gap-2 pt-2 border-t border-beige-100 dark:border-stone-800">
                {[0, 1, 2].map(j => <Skeleton key={j} className="h-5 w-14 rounded-md" />)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((kt, idx) => (
            <div
              key={kt.id}
              className={`transition-[opacity,transform] duration-500 ease-out${items.length % 2 !== 0 && idx === items.length - 1 ? ' sm:col-span-2' : ''}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: inView ? `${idx * 0.1}s` : '0s',
              }}
            >
              <Card
                title={kt.keyTask}
                footer={(kt.technologies?.length ?? 0) > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {kt.technologies.map((tech, i) => {
                      const k = tech.technologyBadge ? findTechKey(tech.technologyBadge) : null;
                      return (
                        <Badge key={i} tone="beige" className="inline-flex items-center gap-1">
                          {k ? <TechIcon name={k} className="text-stone-700 dark:text-stone-300" /> : null}
                          {tech.technology}
                        </Badge>
                      );
                    })}
                  </div>
                ) : undefined}
              >
                <p>{kt.description}</p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;
