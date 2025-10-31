export type AditionalInfoBullet = {
  text: string;
  level?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

export type AditionalInfoResponse = {
  id: string;
  aditionalInfo: string;
  bullets: AditionalInfoBullet[];
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateAditionalInfoRequest = {
  aditionalInfo: string;
  bullets: AditionalInfoBullet[];
};

export type UpdateAditionalInfoRequest = CreateAditionalInfoRequest;


