import { api } from './api';
import type { CreateTestimonialRequest, TestimonialResponse, UpdateTestimonialRequest } from '../types/testimonial';

export const testimonialsApi = {
  list: (lang?: string) => api.get<TestimonialResponse[]>(`/Testimonials${lang ? `?lang=${lang}` : ''}`),
  get: (id: string, lang?: string) => api.get<TestimonialResponse>(`/Testimonials/${id}${lang ? `?lang=${lang}` : ''}`),
  create: (body: CreateTestimonialRequest) => api.post<TestimonialResponse>('/management/Testimonials', body),
  update: (id: string, body: UpdateTestimonialRequest, lang?: string) => api.put<void>(`/management/Testimonials/${id}${lang ? `?lang=${lang}` : ''}`, body),
  delete: (id: string) => api.delete<void>(`/management/Testimonials/${id}`),
};


