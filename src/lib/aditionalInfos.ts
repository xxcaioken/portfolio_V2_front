import { api } from './api';
import type { AditionalInfoResponse, CreateAditionalInfoRequest, UpdateAditionalInfoRequest } from '../types/aditionalInfo';

export const aditionalInfosApi = {
  list: () => api.get<AditionalInfoResponse[]>('/AditionalInfos'),
  get: (id: string) => api.get<AditionalInfoResponse>(`/AditionalInfos/${id}`),
  create: (body: CreateAditionalInfoRequest) => api.post<AditionalInfoResponse>('/management/AditionalInfos', body),
  update: (id: string, body: UpdateAditionalInfoRequest) => api.put<void>(`/management/AditionalInfos/${id}`, body),
  delete: (id: string) => api.delete<void>(`/management/AditionalInfos/${id}`),
};


