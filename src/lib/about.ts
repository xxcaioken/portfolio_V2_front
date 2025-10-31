import { api } from './api';
import type { AboutResponse, UpdateAboutRequest } from '../types/about';

export const aboutApi = {
  get: () => api.get<AboutResponse>('/about'),
  update: (body: UpdateAboutRequest) => api.put<AboutResponse>('/management/about', body),
  uploadAvatar: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return api.upload<AboutResponse>('/management/about/avatar', fd);
  },
};


