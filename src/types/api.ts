export type Role = 'superadmin' | 'admin' | 'utilisateur';

export interface User {
  id: number;
  email: string;
  display_name: string;
  role: Role;
  is_active: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}

export type EventCategory = 'passage' | 'concert' | 'ceremonie' | 'repetition' | string;

export interface Event {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string | null;
  venue: string;
  city: string;
  description: string;
  category: EventCategory;
  is_free: boolean;
  created_at: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string;
  year: number;
  place: string;
  created_at: string;
}

export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  instrument: string;
  section: string;
  joined_year: number;
  role: string | null;
  created_at: string;
}

export interface Comment {
  id: number;
  content_type: 'news' | 'photo' | 'event';
  content_id: number;
  author_id: number;
  body: string;
  created_at: string;
}
