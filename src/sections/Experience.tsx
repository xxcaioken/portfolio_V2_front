import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import Skeleton from '../components/ui/Skeleton';
import { experiencesApi } from '../lib/experiences';
import type { ExperienceResponse } from '../types/experience';
import { formatRange } from '../lib/date';
import { useI18n } from '../i18n';
import { useInView } from '../lib/useInView';
import { useCache } from '../lib/useCache';

const Experience = () => {
  const { t, lang } = useI18n();
  const { data, loading, error } = useCache<ExperienceResponse[]>(`experiences_${lang}`, () => experiencesApi.list(lang));
  const items = data ?? [];
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} id="experience" className="section">
      <SectionHeading title={t('nav.experience')} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <div className="space-y-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-lg border border-beige-200/70 bg-white/80 p-5 shadow-sm dark:border-stone-800/70 dark:bg-stone-900/70">
              <div className="flex justify-between items-center mb-3 gap-4">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-3 w-24 shrink-0" />
              </div>
              <div className="space-y-2 pl-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((exp, i) => (
            <div
              key={exp.id}
              className="transition-[opacity,transform] duration-500 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: inView ? `${i * 0.1}s` : '0s',
              }}
            >
              <Card
                title={
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <span>{exp.role} · {exp.company}</span>
                    <span className="text-xs font-normal text-stone-500">{formatRange(exp.startDate, exp.endDate)}</span>
                  </div>
                }
              >
                {(exp.bullets?.length ?? 0) > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {(exp.bullets ?? []).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Experience;
