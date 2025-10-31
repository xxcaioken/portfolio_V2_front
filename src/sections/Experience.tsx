import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { experiencesApi } from '../lib/experiences';
import type { ExperienceResponse } from '../types/experience';
import { formatRange } from '../lib/date';

const Experience = () => {
  const [items, setItems] = useState<ExperienceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await experiencesApi.list();
        const arr = Array.isArray(data) ? data : [];
        setItems(arr.map(e => ({ ...e, bullets: e.bullets ?? [] })));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar experiências');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <section id="experience" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900">Experiência</h2>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">Carregando...</p>
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


