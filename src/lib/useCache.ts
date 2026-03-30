import { useEffect, useRef, useState } from 'react';
import * as cache from './cache';

/**
 * Stale-While-Revalidate cache hook.
 *
 * Comportamento:
 * - Cache fresco  → retorna dado instantaneamente, sem fetch
 * - Cache stale   → retorna dado cacheado imediatamente + refetch silencioso em background
 * - Sem cache     → loading=true + fetch + armazena + retorna
 * - Erro c/ cache → silencioso, mantém dado velho
 * - Erro s/ cache → expõe error
 */
export function useCache<T>(cacheKey: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(() => cache.get<T>(cacheKey));
  const [loading, setLoading] = useState(() => cache.get<T>(cacheKey) === null);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    const cached = cache.get<T>(cacheKey);
    const stale = cache.isStale(cacheKey);

    // Sincroniza estado com nova cacheKey (ex: troca de idioma)
    if (cached) {
      setData(cached);
      setLoading(false);
      setError(null);
      if (!stale) return; // fresco — não precisa buscar
    } else {
      setLoading(true);
      setError(null);
    }

    // Fetch (cache miss ou stale revalidation)
    fetcherRef.current()
      .then(result => {
        cache.set(cacheKey, result);
        setData(result);
        setLoading(false);
      })
      .catch(e => {
        if (!cached) {
          setError(e instanceof Error ? e.message : 'Erro ao carregar');
          setLoading(false);
        }
        // Com cache stale: erro silencioso, mantém dado velho
      });
  }, [cacheKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}
