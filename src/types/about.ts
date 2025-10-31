export type SocialLink = {
  label: string;
  url: string;
  iconKey?: string | null;
};

export type AboutResponse = {
  name: string;
  title: string;
  summary: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github?: string | null;
  avatarUrl: string;
  footerNote?: string | null;
  socials: SocialLink[];
};

export type UpdateAboutRequest = AboutResponse;


