import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { Hero } from '../components/hero/hero';
import { EventCard } from '../components/event-card/event-card';
import { SectionHeading } from '../components/section-heading/section-heading';
import { Button } from '../components/button/button';
import { site } from '../data/site';
import { sortByDateAsc } from '../utils/date';
import type { Event, GalleryPhoto, NewsArticle } from '../types/api';

export function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getEvents(), api.getGallery(), api.getNews()])
      .then(([nextEvents, nextGallery, nextNews]) => { setEvents(nextEvents); setGallery(nextGallery); setNews(nextNews); })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setIsLoading(false));
  }, []);

  const upcomingEvents = sortByDateAsc(events).slice(0, 3);
  const featuredGallery = gallery.slice(0, 3);
  const latestNews = news.slice(0, 2);

  return (
    <>
      <Hero />

      <main className="page-shell">
        <section className="page-section page-section--intro">
          <div className="container page-grid page-grid--split">
            <div>
              <SectionHeading
                eyebrow="La clique"
                title="Une musique de village, portée par le collectif"
                intro="Depuis plus d’un siècle, la clique de Doissin fait vivre les fêtes de village, les cérémonies et les rassemblements avec une énergie de terre et de tradition."
              />
            </div>

            <div className="story-card">
              <p>
                Nous sommes une association de musiciens amateurs, fiers de faire
                vivre la fanfare de Doissin dans la joie, la rigueur et la
                solidarité. Notre répertoire mêle marches, airs traditionnels,
                morceaux festifs et compositions de circonstance.
              </p>
              <ul className="bullet-list">
                <li>Fifres, tambours et clairons</li>
                <li>Animations de fêtes et de cérémonies</li>
                <li>Accueil des nouveaux musiciens</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section page-section--accent">
          <div className="container">
            <SectionHeading
              eyebrow="À venir"
              title="Les prochaines dates"
              intro="Défilés, concerts et rassemblements à retrouver sur notre agenda."
              align="center"
            />

            <div className="card-grid card-grid--events">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="cta-row center">
              <Button to="/agenda" icon="calendar">
                Voir tout l’agenda
              </Button>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <div className="section-header-row">
              <SectionHeading eyebrow="Les actus" title="La vie de la clique" intro="Les nouvelles du groupe et les rendez-vous à ne pas manquer." />
              <Link className="inline-link" to="/actus">Toutes les actus →</Link>
            </div>
            <div className="home-news-grid">
              {isLoading ? <p className="empty-state" role="status">Chargement des contenus…</p> : null}
              {error ? <p className="error-state" role="alert">{error}</p> : null}
              {!isLoading && !error && latestNews.length === 0 ? <p className="empty-state">Aucune actualité publiée.</p> : null}
              {!isLoading && !error ? latestNews.map((article) => (
                <Link className="home-news-card" to={`/actus/${article.id}`} key={article.id}>
                  {article.image_url ? <img src={article.image_url} alt="" /> : null}
                  <div><p className="eyebrow">Actualité</p><h3>{article.title}</h3><p>{article.content}</p></div>
                </Link>
              )) : null}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <SectionHeading
              eyebrow="L’ambiance"
              title="Le son de la clique"
              intro="Entre tradition dauphinoise et esprit de fête, notre musique accompagne les moments importants de la commune."
            />

            <div className="feature-band">
              <div className="feature-card">
                <span className="feature-card__label">D’entrain</span>
                <h3>Marches et aubades</h3>
                <p>Des sonneries qui font vibrer la place du village et les rues du bourg.</p>
              </div>
              <div className="feature-card feature-card--highlight">
                <span className="feature-card__label">De cœur</span>
                <h3>Fêtes et cérémonies</h3>
                <p>Un accompagnement chaleureux pour les moments symboliques et festifs.</p>
              </div>
              <div className="feature-card">
                <span className="feature-card__label">De partage</span>
                <h3>Répétitions ouvertes</h3>
                <p>La clique accueille les nouveaux musiciens et tous ceux qui veulent apprendre.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section page-section--muted">
          <div className="container">
            <div className="section-header-row">
              <SectionHeading
                eyebrow="Galerie"
                title="Quelques images de la clique"
                intro="Des moments de concert, de rues et de rassemblements."
              />
              <Link className="inline-link" to="/galerie">
                Voir toute la galerie →
              </Link>
            </div>

            <div className="gallery-grid home-gallery">
              {featuredGallery.map((photo) => (
                <figure key={photo.id} className="gallery-card">
                  <img src={photo.src} alt={photo.alt} />
                  <figcaption>
                    <strong>{photo.caption}</strong>
                    <span>{photo.place}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <div className="cta-panel">
              <div>
                <p className="eyebrow">Nous rejoindre</p>
                <h2>{site.name}</h2>
              </div>
              <p>
                Vous aimeriez jouer, participer aux répétitions ou simplement nous
                rencontrer ?
              </p>
              <Button to="/contact" variant="secondary" icon="arrow-right">
                Contactez-nous
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
