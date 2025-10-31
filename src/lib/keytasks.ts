import { api } from './api';
import type { CreateKeyTaskRequest, KeyTaskResponse, UpdateKeyTaskRequest } from '../types/keytask';

export const keyTasksApi = {
  list: (lang?: 'pt' | 'en') => api.get<KeyTaskResponse[]>(`/KeyTasks${lang ? `?lang=${lang}` : ''}`),
  get: (id: string, lang?: 'pt' | 'en') => api.get<KeyTaskResponse>(`/KeyTasks/${id}${lang ? `?lang=${lang}` : ''}`),
  create: (body: CreateKeyTaskRequest) => api.post<KeyTaskResponse>('/management/KeyTasks', body),
  update: (id: string, body: UpdateKeyTaskRequest, lang?: 'pt' | 'en') => api.put<void>(`/management/KeyTasks/${id}${lang ? `?lang=${lang}` : ''}`, body),
  delete: (id: string) => api.delete<void>(`/management/KeyTasks/${id}`),
};


