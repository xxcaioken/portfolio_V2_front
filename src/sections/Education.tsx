import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { aditionalInfosApi } from '../lib/aditionalInfos';
import type { AditionalInfoResponse } from '../types/aditionalInfo';
import { formatRange } from '../lib/date';
import { loadSectionData } from '../lib/api';

const Education = () => {
  const [items, setItems] = useState<AditionalInfoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const load = async () => {
      setItems(await loadSectionData(aditionalInfosApi,setLoading, setError) as AditionalInfoResponse[]);
      };
    void load();
  }, []);

  return (
    <section id="education" className="section">
      <h2 className="mb-8 text-2xl font-bold text-stone-900 dark:text-stone-100">Aditional Information</h2>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      {loading ? (
        <p className="text-sm">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((ai, idx) => (
            <div key={ai.id} className={(items.length % 2 !== 0 && idx === items.length - 1) ? 'sm:col-span-2' : ''}>
              <Card title={ai.aditionalInfo}>
                {(ai.bullets?.length ?? 0) > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {ai.bullets.map((b, i) => (
                      <li key={i}>
                        <span>{b.text}</span>
                        <span className="ml-2 text-xs text-stone-500">
                          {formatRange(b.startDate ?? '', b.endDate ?? '')}
                          {b.level ? ` · Nível: ${b.level}` : ''}
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


