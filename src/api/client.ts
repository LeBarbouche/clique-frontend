import type { Comment, Event, GalleryPhoto, Member, NewsArticle, TokenResponse, User } from '../types/api';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8000/api/v1';
const TOKEN_KEY = 'clique-doissin-token';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    let message = `La requête a échoué (${response.status}).`;
    try {
      const body = (await response.json()) as { detail?: string };
      if (body.detail) message = body.detail;
    } catch {
      // Keep the HTTP fallback when the server does not return JSON.
    }
    throw new ApiError(response.status, message);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const api = {
  getNews: () => request<NewsArticle[]>('/news'),
  getEvents: () => request<Event[]>('/events'),
  getGallery: () => request<GalleryPhoto[]>('/gallery'),
  getMembers: () => request<Member[]>('/members'),
  getComments: (contentType: 'news' | 'photo' | 'event', contentId: number) =>
    request<Comment[]>(`/comments/${contentType}/${contentId}`),
  createComment: (payload: Pick<Comment, 'content_type' | 'content_id' | 'body'>) =>
    request<Comment>('/comments', { method: 'POST', body: JSON.stringify(payload) }),
  sendContact: (payload: { name: string; email: string; message: string }) =>
    request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  login: (email: string, password: string) =>
    request<TokenResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => request<User>('/auth/me'),
  createNews: (payload: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) =>
    request<NewsArticle>('/news', { method: 'POST', body: JSON.stringify(payload) }),
  updateNews: (id: number, payload: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) =>
    request<NewsArticle>(`/news/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteNews: (id: number) => request<void>(`/news/${id}`, { method: 'DELETE' }),
  createEvent: (payload: Omit<Event, 'id' | 'created_at'>) =>
    request<Event>('/events', { method: 'POST', body: JSON.stringify(payload) }),
  updateEvent: (id: number, payload: Omit<Event, 'id' | 'created_at'>) =>
    request<Event>(`/events/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteEvent: (id: number) => request<void>(`/events/${id}`, { method: 'DELETE' }),
  createGalleryPhoto: (payload: Omit<GalleryPhoto, 'id' | 'created_at'>) =>
    request<GalleryPhoto>('/gallery', { method: 'POST', body: JSON.stringify(payload) }),
  updateGalleryPhoto: (id: number, payload: Omit<GalleryPhoto, 'id' | 'created_at'>) =>
    request<GalleryPhoto>(`/gallery/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteGalleryPhoto: (id: number) => request<void>(`/gallery/${id}`, { method: 'DELETE' }),
  createMember: (payload: Omit<Member, 'id' | 'created_at'>) =>
    request<Member>('/members', { method: 'POST', body: JSON.stringify(payload) }),
  updateMember: (id: number, payload: Omit<Member, 'id' | 'created_at'>) =>
    request<Member>(`/members/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteMember: (id: number) => request<void>(`/members/${id}`, { method: 'DELETE' }),
};

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};
