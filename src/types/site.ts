import type { IconName } from './icon';

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface SiteContact {
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
}

export interface SiteInfo {
  name: string;
  shortName: string;
  tagline: string;
  town: string;
  foundedYear: number;
  contact: SiteContact;
  socials: SocialLink[];
}
