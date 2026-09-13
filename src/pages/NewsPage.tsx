import { useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../components/button/button';
import { PageHeader } from '../components/page-header/page-header';
import type { Comment, NewsArticle } from '../types/api';
import '../styles/news-page.css';

function excerpt(content: string) {
  return content.length > 150 ? `${content.slice(0, 147)}…` : content;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('fr-FR');
}

export function NewsPage() {
  const { articleId } = useParams();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getNews().then(setNews).catch((reason: Error) => setError(reason.message)).finally(() => setIsLoading(false));
  }, []);

  if (articleId && !isLoading && !error) {
    const article = news.find((item) => item.id === Number(articleId));
    if (!article) return <div className="page-shell page-shell--narrow"><p className="error-state">Cette actualité est introuvable.</p></div>;
    return <ArticleDetail article={article} />;
  }

  return (
    <div className="page-shell page-shell--narrow">
      <PageHeader eyebrow="Les actus" title="La vie de la clique" intro="Les nouvelles du groupe, les rendez-vous et les moments partagés." />
      <section className="page-section">
        <div className="container news-list">
          {isLoading ? <p className="empty-state" role="status">Chargement des actualités…</p> : null}
          {error ? <p className="error-state" role="alert">{error}</p> : null}
          {!isLoading && !error && news.length === 0 ? <p className="empty-state">Aucune actualité publiée pour le moment.</p> : null}
          {!isLoading && !error ? news.map((item, index) => (
            <article className={`news-card ${index === 0 ? 'news-card--featured' : ''}`} key={item.id}>
              {item.image_url ? <img src={item.image_url} alt="" /> : null}
              <div className="news-card__body">
                <p className="eyebrow">Actualité · {formatDate(item.created_at)}</p>
                <h2>{item.title}</h2>
                <p>{excerpt(item.content)}</p>
                <Link className="inline-link" to={`/actus/${item.id}`}>Lire l’actualité →</Link>
              </div>
            </article>
          )) : null}
        </div>
      </section>
    </div>
  );
}

function ArticleDetail({ article }: { article: NewsArticle }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    api.getComments('news', article.id).then(setComments).catch((reason: Error) => setError(reason.message)).finally(() => setIsLoading(false));
  }, [article.id]);

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim() || !user) return;
    setIsSending(true);
    setError('');
    try {
      const comment = await api.createComment({ content_type: 'news', content_id: article.id, body: message.trim() });
      setComments((current) => [...current, comment]);
      setMessage('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Le commentaire n’a pas pu être publié.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="page-shell page-shell--narrow">
      <article className="article-detail container">
        <Link className="back-link" to="/actus">← Toutes les actus</Link>
        <p className="eyebrow">Actualité · {formatDate(article.created_at)}</p>
        <h1>{article.title}</h1>
        {article.image_url ? <img className="article-detail__image" src={article.image_url} alt="" /> : null}
        <p className="article-detail__lead">{excerpt(article.content)}</p>
        <p>{article.content}</p>
      </article>
      <section className="comments container" aria-labelledby="comments-title">
        <div><p className="eyebrow">Échanges</p><h2 id="comments-title">Commentaires <span>{comments.length}</span></h2></div>
        <div className="comments__list">
          {isLoading ? <p className="empty-state" role="status">Chargement des commentaires…</p> : null}
          {error ? <p className="error-state" role="alert">{error}</p> : null}
          {!isLoading && !error && comments.length === 0 ? <p className="empty-state">Soyez la première personne à réagir à cette actualité.</p> : null}
          {!isLoading && !error ? comments.map((comment) => <div className="comment" key={comment.id}><strong>Membre de la clique</strong><time>{formatDate(comment.created_at)}</time><p>{comment.body}</p></div>) : null}
        </div>
        {user ? (
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <label htmlFor="comment">Votre commentaire</label>
            <textarea id="comment" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Partager un mot avec la clique..." rows={3} required />
            <Button type="submit" disabled={isSending}>{isSending ? 'Publication…' : 'Publier'}</Button>
          </form>
        ) : <p className="empty-state">Connectez-vous pour publier un commentaire. <Link to="/gestion">Se connecter</Link></p>}
      </section>
    </div>
  );
}
