import { api } from './api';
import type { CreateHabilityRequest, HabilityResponse, UpdateHabilityRequest } from '../types/hability';

export const habilitiesApi = {
  list: () => api.get<HabilityResponse[]>('/Habilitys'),
  get: (id: string) => api.get<HabilityResponse>(`/Habilitys/${id}`),
  create: (body: CreateHabilityRequest) => api.post<HabilityResponse>('/management/Habilitys', body),
  update: (id: string, body: UpdateHabilityRequest) => api.put<void>(`/management/Habilitys/${id}`, body),
  delete: (id: string) => api.delete<void>(`/management/Habilitys/${id}`),
};


