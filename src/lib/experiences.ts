import { api } from './api';
import type { CreateExperienceRequest, ExperienceResponse, UpdateExperienceRequest } from '../types/experience';

export const experiencesApi = {
  list: () => api.get<ExperienceResponse[]>('/experiences'),
  get: (id: string) => api.get<ExperienceResponse>(`/experiences/${id}`),
  create: (body: CreateExperienceRequest) => api.post<ExperienceResponse>('/management/experiences', body),
  update: (id: string, body: UpdateExperienceRequest) => api.put<void>(`/management/experiences/${id}`, body),
  delete: (id: string) => api.delete<void>(`/management/experiences/${id}`),
};


