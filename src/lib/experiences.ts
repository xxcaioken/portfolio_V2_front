import { api } from './api';
import type { CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest } from '../types/experience';

export const experiencesApi = {
  list: (lang?: 'pt' | 'en') => api.get<ExperienceResponse[]>(`/experiences${lang ? `?lang=${lang}` : ''}`),
  get: (id: string, lang?: 'pt' | 'en') => api.get<ExperienceResponse>(`/experiences/${id}${lang ? `?lang=${lang}` : ''}`),
  create: (body: CreateExperienceRequest) => api.post<ExperienceResponse>('/management/experiences', body),
  update: (id: string, body: UpdateExperienceRequest, lang?: 'pt' | 'en') => api.put<void>(`/management/experiences/${id}${lang ? `?lang=${lang}` : ''}`, body),
  delete: (id: string) => api.delete<void>(`/management/experiences/${id}`),
};


