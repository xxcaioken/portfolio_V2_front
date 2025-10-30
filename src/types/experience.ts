export type ExperienceResponse = {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateExperienceRequest = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type UpdateExperienceRequest = CreateExperienceRequest;


