export type AditionalInfoResponse = {
  id: string;
  aditionalInfo: string;
  bullets: string[];
  startDate?: string | null; // yyyy-MM-dd | null
  endDate?: string | null; // yyyy-MM-dd | null
  level?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateAditionalInfoRequest = {
  aditionalInfo: string;
  bullets: string[];
  startDate?: string | null; // yyyy-MM-dd | null
  endDate?: string | null; // yyyy-MM-dd | null
  level: string;
};

export type UpdateAditionalInfoRequest = CreateAditionalInfoRequest;


