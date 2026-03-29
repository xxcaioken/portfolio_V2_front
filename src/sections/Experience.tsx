import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import { experiencesApi } from '../lib/experiences';
import type { ExperienceResponse } from '../types/experience';
import { formatRange } from '../lib/date';
import { loadSectionData } from '../lib/api';
import { useI18n } from '../i18n';
import { useInView } from '../lib/useInView';

const Experience = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<ExperienceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    const load = async () => {
      setItems(await loadSectionData(experiencesApi, setLoading, setError) as ExperienceResponse[]);
    };
    void load();
  }, []);

  return (
    <section ref={ref} id="experience" className="section">
      <SectionHeading title={t('nav.experience')} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">{t('common.loading')}</p>
      ) : (
        <div className="space-y-4">
          {items.map((exp, i) => (
            <div
              key={exp.id}
              className={inView ? 'animate-fade-up' : 'opacity-0'}
              style={{ animationDelay: `${i * 0.1}s` }}
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
