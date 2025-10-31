export type KeyTaskTechnology = { technology: string; technologyBadge?: string | null };

export type KeyTaskResponse = {
  id: string;
  keyTask: string;
  description: string;
  technologies: KeyTaskTechnology[];
};

export type CreateKeyTaskRequest = {
  keyTask: string;
  description: string;
  technologies: KeyTaskTechnology[];
};

export type UpdateKeyTaskRequest = CreateKeyTaskRequest;


