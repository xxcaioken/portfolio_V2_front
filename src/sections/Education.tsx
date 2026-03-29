import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import { aditionalInfosApi } from '../lib/aditionalInfos';
import type { AditionalInfoResponse } from '../types/aditionalInfo';
import { formatRange } from '../lib/date';
import { loadSectionData } from '../lib/api';
import { useI18n } from '../i18n';
import { useInView } from '../lib/useInView';

const Education = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<AditionalInfoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    const load = async () => {
      setItems(await loadSectionData(aditionalInfosApi, setLoading, setError) as AditionalInfoResponse[]);
    };
    void load();
  }, []);

  return (
    <section ref={ref} id="education" className="section">
      <SectionHeading title={t('nav.aditional') || 'Informações Adicionais'} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">{t('common.loading')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((ai, idx) => (
            <div
              key={ai.id}
              className={`${items.length % 2 !== 0 && idx === items.length - 1 ? 'sm:col-span-2' : ''} ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <Card title={ai.aditionalInfo}>
                {(ai.bullets?.length ?? 0) > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {ai.bullets.map((b, i) => (
                      <li key={i}>
                        <span>{b.text}</span>
                        <span className="ml-2 text-xs text-stone-500">
                          {formatRange(b.startDate ?? '', b.endDate ?? '')}
                          {b.level ? ` · ${b.level}` : ''}
                        </span>
                      </li>
                    ))}
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

export default Education;
