import { api } from './api';
import type { AditionalInfoResponse, CreateAditionalInfoRequest, UpdateAditionalInfoRequest } from '../types/aditionalInfo';

export const aditionalInfosApi = {
  list: (lang?: 'pt' | 'en') => api.get<AditionalInfoResponse[]>(`/AditionalInfos${lang ? `?lang=${lang}` : ''}`),
  get: (id: string, lang?: 'pt' | 'en') => api.get<AditionalInfoResponse>(`/AditionalInfos/${id}${lang ? `?lang=${lang}` : ''}`),
  create: (body: CreateAditionalInfoRequest) => api.post<AditionalInfoResponse>('/management/AditionalInfos', body),
  update: (id: string, body: UpdateAditionalInfoRequest, lang?: 'pt' | 'en') => api.put<void>(`/management/AditionalInfos/${id}${lang ? `?lang=${lang}` : ''}`, body),
  delete: (id: string) => api.delete<void>(`/management/AditionalInfos/${id}`),
};


