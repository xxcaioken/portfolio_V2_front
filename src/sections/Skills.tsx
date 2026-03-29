import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import { habilitiesApi } from '../lib/habilities';
import type { HabilityResponse } from '../types/hability';
import { findTechKey } from '../icons/tech.data';
import { TechIcon } from '../icons/TechIcon';
import { loadSectionData } from '../lib/api';
import { useI18n } from '../i18n';
import { useInView } from '../lib/useInView';

const Skills = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<HabilityResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    const load = async () => {
      setItems(await loadSectionData(habilitiesApi, setLoading, setError) as HabilityResponse[]);
    };
    void load();
  }, []);

  return (
    <section ref={ref} id="skills" className="section">
      <SectionHeading title={t('nav.skills')} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">{t('common.loading')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((h, idx) => (
            <div
              key={h.id}
              className={`${items.length % 2 !== 0 && idx === items.length - 1 ? 'sm:col-span-2' : ''} ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 0.08}s` }}
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
