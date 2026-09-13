import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { GalleryPhoto } from '../types/api';
import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';

export function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getGallery().then(setGallery).catch((reason: Error) => setError(reason.message)).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="page-shell page-shell--narrow">
      <PageHeader
        eyebrow="Photos"
        title="Galerie"
        intro="Quelques instantanés des répétitions, défilés et concerts."
      />

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="L’album"
            title="Le village en musique"
            intro="Un aperçu des moments forts de la clique de Doissin."
          />

          {isLoading ? <p className="empty-state" role="status">Chargement des photos…</p> : null}
          {error ? <p className="error-state" role="alert">{error}</p> : null}
          {!isLoading && !error && gallery.length === 0 ? <p className="empty-state">Aucune photo publiée pour le moment.</p> : null}
          {!isLoading && !error && gallery.length > 0 ? <div className="gallery-grid">
            {gallery.map((photo) => (
              <figure key={photo.id} className="gallery-card gallery-card--large">
                <img src={photo.src} alt={photo.alt} />
                <figcaption>
                  <strong>{photo.caption}</strong>
                  <span>{photo.year} · {photo.place}</span>
                </figcaption>
              </figure>
            ))}
          </div> : null}
        </div>
      </section>
    </div>
  );
}
