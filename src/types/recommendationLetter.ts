export type RecommendationLetterResponse = {
  id: string;
  imageUrlPt: string;
  imageUrlEn: string;
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateRecommendationLetterRequest = {
  imageUrlPt: string;
  imageUrlEn: string;
};

export type UpdateRecommendationLetterRequest = CreateRecommendationLetterRequest;


