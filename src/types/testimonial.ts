export type TestimonialResponse = {
  id: string;
  name: string;
  highlight: string;
  createdAt: string;
  updatedAt?: string | null;
};

export type CreateTestimonialRequest = {
  name: string;
  highlight: string;
};

export type UpdateTestimonialRequest = CreateTestimonialRequest;


