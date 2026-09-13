import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';
import { gallery } from '../data/gallery';

export function GalleryPage() {
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

          <div className="gallery-grid">
            {gallery.map((photo) => (
              <figure key={photo.id} className="gallery-card gallery-card--large">
                <img src={photo.src} alt={photo.alt} />
                <figcaption>
                  <strong>{photo.caption}</strong>
                  <span>{photo.year} · {photo.place}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
