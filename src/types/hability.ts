export type HabilityResponse = {
  id: string;
  hability: string;
  bullets: string[];
  badge: string;
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateHabilityRequest = {
  hability: string;
  bullets: string[];
  badge: string;
};

export type UpdateHabilityRequest = CreateHabilityRequest;


