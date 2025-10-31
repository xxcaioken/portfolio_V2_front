import { api } from './api';
import type { AboutResponse, UpdateAboutRequest } from '../types/about';

export const aboutApi = {
  get: () => api.get<AboutResponse>('/about'),
  update: (body: UpdateAboutRequest) => api.put<AboutResponse>('/management/about', body),
};


