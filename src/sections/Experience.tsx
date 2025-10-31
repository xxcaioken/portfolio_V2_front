import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { experiencesApi } from '../lib/experiences';
import type { ExperienceResponse } from '../types/experience';
import { formatRange } from '../lib/date';
import { loadSectionData } from '../lib/api';
import { useI18n } from '../i18n';

const Experience = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<ExperienceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
    setItems(await loadSectionData(experiencesApi,setLoading, setError) as ExperienceResponse[]);
    };
    void load();
  }, []);

  return (
    <section id="experience" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900">{t('nav.experience')}</h2>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">{t('common.loading')}</p>
      ) : (
        <div className="space-y-4">
          {items.map((exp) => (
            <Card
              key={exp.id}
              title={
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <span>{exp.role} · {exp.company}</span>
                  <span className="text-xs font-normal text-stone-500">{formatRange(exp.startDate, exp.endDate)}</span>
                </div>
              }
            >
              {(exp.bullets?.length ?? 0) > 0 && (
                <ul className="list-disc pl-5 space-y-1">
                  {(exp.bullets ?? []).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default Experience;


