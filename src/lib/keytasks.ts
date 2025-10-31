import { api } from './api';
import type { CreateKeyTaskRequest, KeyTaskResponse, UpdateKeyTaskRequest } from '../types/keytask';

export const keyTasksApi = {
  list: () => api.get<KeyTaskResponse[]>('/KeyTasks'),
  get: (id: string) => api.get<KeyTaskResponse>(`/KeyTasks/${id}`),
  create: (body: CreateKeyTaskRequest) => api.post<KeyTaskResponse>('/management/KeyTasks', body),
  update: (id: string, body: UpdateKeyTaskRequest) => api.put<void>(`/management/KeyTasks/${id}`, body),
  delete: (id: string) => api.delete<void>(`/management/KeyTasks/${id}`),
};


