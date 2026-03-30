import { aboutApi } from './about';
import type { AboutResponse } from '../types/about';
import { useCache } from './useCache';

export const useAbout = () => {
  const { data: about, loading, error } = useCache<AboutResponse>('about', () => aboutApi.get());
  return { about, loading, error } as const;
};
