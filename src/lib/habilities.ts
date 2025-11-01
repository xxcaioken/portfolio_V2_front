import { api } from './api';
import type { CreateHabilityRequest, HabilityResponse, UpdateHabilityRequest } from '../types/hability';

export const habilitiesApi = {
  list: (lang: 'pt' | 'en' = 'pt') => api.get<HabilityResponse[]>(`/Habilities?lang=${lang}`),
  get: (id: string, lang: 'pt' | 'en' = 'pt') => api.get<HabilityResponse>(`/Habilities/${id}?lang=${lang}`),
  create: (body: CreateHabilityRequest) => api.post<HabilityResponse>('/management/Habilities', body),
  update: (id: string, body: UpdateHabilityRequest, lang: 'pt' | 'en' = 'pt') => api.put<void>(`/management/Habilities/${id}?lang=${lang}`, body),
  delete: (id: string) => api.delete<void>(`/management/Habilities/${id}`),
};


