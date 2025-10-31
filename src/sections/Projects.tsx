import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { keyTasksApi } from '../lib/keytasks';
import type { KeyTaskResponse } from '../types/keytask';
import { findTechKey } from '../icons/tech.data';
import { TechIcon } from '../icons/TechIcon';
import { loadSectionData } from '../lib/api';
import { useI18n } from '../i18n';

const Projects = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<KeyTaskResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setItems(await loadSectionData(keyTasksApi,setLoading, setError) as KeyTaskResponse[]);
    };
    void load();
  }, []);

  return (
    <section id="projects" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900">{t('nav.projects')}</h2>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">{t('common.loading')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((kt, idx) => (
            <div key={kt.id} className={(items.length % 2 !== 0 && idx === items.length - 1) ? 'sm:col-span-2' : ''}>
              <Card
                title={kt.keyTask}
                footer={(kt.technologies?.length ?? 0) > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {kt.technologies.map((t, i) => {
                      const k = t.technologyBadge ? findTechKey(t.technologyBadge) : null;
                      return (
                        <Badge key={i} tone="beige" className="inline-flex items-center gap-1">
                          {k ? <TechIcon name={k} className="text-stone-700 dark:text-stone-300" /> : null}
                          {t.technology}
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


