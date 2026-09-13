import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../components/button/button';
import type { NewsArticle } from '../types/api';
import '../styles/admin-page.css';

interface NewsForm {
  title: string;
  slug: string;
  content: string;
  image_url: string;
  published: boolean;
}

const emptyForm: NewsForm = { title: '', slug: '', content: '', image_url: '', published: true };

export function AdminPage() {
  const { user, isLoading: isSessionLoading, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [form, setForm] = useState<NewsForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) return;
    api.getNews().then(setNews).catch((reason: Error) => setError(reason.message));
  }, [user]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError('');
    try {
      await login(email, password);
    } catch (reason) {
      setLoginError(reason instanceof Error ? reason.message : 'Connexion impossible.');
    }
  }

  async function handleNewsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');
    setError('');
    try {
      const payload = { ...form, image_url: form.image_url || null };
      const saved = editingId === null ? await api.createNews(payload) : await api.updateNews(editingId, payload);
      setNews((current) => editingId === null ? [saved, ...current] : current.map((item) => item.id === saved.id ? saved : item));
      setForm(emptyForm);
      setEditingId(null);
      setStatus('Actualité enregistrée.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Enregistrement impossible.');
    }
  }

  async function handleDelete(id: number) {
    setError('');
    try {
      await api.deleteNews(id);
      setNews((current) => current.filter((item) => item.id !== id));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Suppression impossible.');
    }
  }

  if (isSessionLoading) return <div className="page-shell page-shell--narrow admin-page"><p className="empty-state" role="status">Récupération de la session…</p></div>;

  if (!user) {
    return (
      <div className="page-shell page-shell--narrow admin-page">
        <div className="login-panel">
          <p className="eyebrow">Espace privé</p>
          <h1>Connexion</h1>
          <p>Connectez-vous pour gérer les contenus de La Clique de Doissin.</p>
          <form className="contact-form" onSubmit={handleLogin}>
            <label htmlFor="login-email">Email<input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
            <label htmlFor="login-password">Mot de passe<input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
            <Button type="submit" fullWidth icon="arrow-right">Accéder à l’espace de gestion</Button>
            {loginError ? <p className="error-state" role="alert">{loginError}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  if (user.role === 'utilisateur') {
    return <div className="page-shell page-shell--narrow admin-page"><div className="login-panel"><p className="eyebrow">Accès limité</p><h1>Espace de gestion réservé</h1><p>Votre compte peut commenter les contenus, mais ne peut pas administrer le site.</p><Button variant="secondary" onClick={logout}>Se déconnecter</Button></div></div>;
  }

  return (
    <div className="page-shell page-shell--narrow admin-page">
      <div className="admin-heading"><div><p className="eyebrow">Espace de gestion</p><h1>Bonjour, {user.display_name}</h1><p>{user.role === 'superadmin' ? 'Super administrateur' : 'Administrateur'}</p></div><Button variant="secondary" onClick={logout}>Se déconnecter</Button></div>
      <section className="admin-dashboard" aria-labelledby="news-management-title">
        <div className="dashboard-intro"><div><p className="eyebrow">Contenus</p><h2 id="news-management-title">Actualités</h2></div><span className="status-dot">API connectée</span></div>
        <form className="contact-form admin-news-form" onSubmit={handleNewsSubmit}>
          <label htmlFor="news-title">Titre<input id="news-title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required minLength={2} /></label>
          <label htmlFor="news-slug">Slug<input id="news-slug" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} pattern="[a-z0-9-]+" required /></label>
          <label htmlFor="news-image">Image URL<input id="news-image" type="url" value={form.image_url} onChange={(event) => setForm({ ...form, image_url: event.target.value })} /></label>
          <label htmlFor="news-content">Contenu<textarea id="news-content" rows={6} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} required minLength={2} /></label>
          <div className="cta-row"><Button type="submit">{editingId === null ? 'Créer l’actualité' : 'Enregistrer les modifications'}</Button>{editingId !== null ? <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Annuler</Button> : null}</div>
          {status ? <p className="success-state" role="status">{status}</p> : null}
          {error ? <p className="error-state" role="alert">{error}</p> : null}
        </form>
        <div className="admin-modules">
          {news.length === 0 ? <p className="empty-state">Aucune actualité publiée.</p> : news.map((article) => <div className="admin-module" key={article.id}><strong>{article.title}</strong><span>{article.published ? 'Publiée' : 'Brouillon'}</span><button type="button" onClick={() => { setEditingId(article.id); setForm({ title: article.title, slug: article.slug, content: article.content, image_url: article.image_url ?? '', published: article.published }); }}>Modifier</button><button type="button" onClick={() => void handleDelete(article.id)}>Supprimer</button></div>)}
        </div>
      </section>
    </div>
  );
}
