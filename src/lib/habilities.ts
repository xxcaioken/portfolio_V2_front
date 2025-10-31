import { api } from './api';
import type { CreateHabilityRequest, HabilityResponse, UpdateHabilityRequest } from '../types/hability';

export const habilitiesApi = {
  list: (lang?: 'pt' | 'en') => api.get<HabilityResponse[]>(`/Habilitys${lang ? `?lang=${lang}` : ''}`),
  get: (id: string, lang?: 'pt' | 'en') => api.get<HabilityResponse>(`/Habilitys/${id}${lang ? `?lang=${lang}` : ''}`),
  create: (body: CreateHabilityRequest) => api.post<HabilityResponse>('/management/Habilitys', body),
  update: (id: string, body: UpdateHabilityRequest, lang?: 'pt' | 'en') => api.put<void>(`/management/Habilitys/${id}${lang ? `?lang=${lang}` : ''}`, body),
  delete: (id: string) => api.delete<void>(`/management/Habilitys/${id}`),
};


