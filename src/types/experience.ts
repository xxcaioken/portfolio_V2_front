export type ExperienceResponse = {
  id: string;
  company: string;
  role: string;
  startDate: string; // yyyy-MM-dd
  endDate?: string | null; // yyyy-MM-dd | null
  bullets: string[];
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateExperienceRequest = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  bullets: string[];
};

export type UpdateExperienceRequest = CreateExperienceRequest;


