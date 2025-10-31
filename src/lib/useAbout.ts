import { useEffect, useState } from 'react';
import { aboutApi } from './about';
import type { AboutResponse } from '../types/about';

let cache: AboutResponse | null = null;
let inflight: Promise<AboutResponse> | null = null;

export const useAbout = () => {
  const [about, setAbout] = useState<AboutResponse | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return; 
    if (!inflight) inflight = aboutApi.get();
    setLoading(true);
    inflight
      .then((data) => { cache = data; setAbout(data); })
      .catch((e) => setError(e instanceof Error ? e.message : 'Erro ao carregar'))
      .finally(() => setLoading(false));
  }, []);

  return { about, loading, error } as const;
};


