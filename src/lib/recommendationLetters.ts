import { api } from './api';
import type { CreateRecommendationLetterRequest, RecommendationLetterResponse, UpdateRecommendationLetterRequest } from '../types/recommendationLetter';

export const recommendationLettersApi = {
  list: () => api.get<RecommendationLetterResponse[]>('/RecommendationLetters'),
  get: (id: string) => api.get<RecommendationLetterResponse>(`/RecommendationLetters/${id}`),
  create: (body: CreateRecommendationLetterRequest) => api.post<RecommendationLetterResponse>('/management/RecommendationLetters', body),
  update: (id: string, body: UpdateRecommendationLetterRequest) => api.put<void>(`/management/RecommendationLetters/${id}`, body),
  delete: (id: string) => api.delete<void>(`/management/RecommendationLetters/${id}`),
  uploadImage: async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await api.upload<{ url: string }>('/management/uploads/image', fd);
    return res.url;
  },
};


