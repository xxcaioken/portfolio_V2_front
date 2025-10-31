export type HabilityBullet = { text: string; badge?: string | null };

export type HabilityResponse = {
  id: string;
  hability: string;
  bullets: HabilityBullet[];
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateHabilityRequest = {
  hability: string;
  bullets: HabilityBullet[];
};

export type UpdateHabilityRequest = CreateHabilityRequest;


