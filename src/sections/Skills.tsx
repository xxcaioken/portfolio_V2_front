import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { habilitiesApi } from '../lib/habilities';
import type { HabilityResponse } from '../types/hability';
import { findTechKey } from '../icons/tech.data';
import { TechIcon } from '../icons/TechIcon';
import { loadSectionData } from '../lib/api';
import { useI18n } from '../i18n';

const Skills = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<HabilityResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
    setItems(await loadSectionData(habilitiesApi,setLoading, setError) as HabilityResponse[]);
    };
    void load();
  }, []);

  return (
    <section id="skills" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900">{t('nav.skills')}</h2>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">{t('common.loading')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((h, idx) => (
            <div key={h.id} className={(items.length % 2 !== 0 && idx === items.length - 1) ? 'sm:col-span-2' : ''}>
              <Card title={h.hability}>
              {(h.bullets?.length ?? 0) > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {h.bullets.map((b, idx) => {
                    const k = b.badge ? findTechKey(b.badge) : null;
                    return (
                      <li key={idx} className="flex items-center gap-2">
                        <span>{b.text}</span>
                        {k ? <TechIcon name={k} className="text-stone-700 dark:text-stone-300" /> : null}
                      </li>
                    );
                  })}
                </ul>
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


