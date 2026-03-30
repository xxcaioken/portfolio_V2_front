import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import SectionHeading from '../components/ui/SectionHeading';
import Skeleton from '../components/ui/Skeleton';
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1].map(i => (
            <div key={i} className="rounded-lg border border-beige-200/70 bg-white/80 p-5 shadow-sm dark:border-stone-800/70 dark:bg-stone-900/70">
              <Skeleton className="h-4 w-40 mb-4" />
              <div className="space-y-3">
                {[0, 1].map(j => (
                  <div key={j} className="flex justify-between gap-4">
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-3 w-16 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((ai, idx) => (
            <div
              key={ai.id}
              className={`transition-[opacity,transform] duration-500 ease-out${items.length % 2 !== 0 && idx === items.length - 1 ? ' sm:col-span-2' : ''}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: inView ? `${idx * 0.1}s` : '0s',
              }}
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
