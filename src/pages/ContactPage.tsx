import { Button } from '../components/button/button';
import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';
import { site } from '../data/site';

export function ContactPage() {
  return (
    <div className="page-shell page-shell--narrow">
      <PageHeader
        eyebrow="Contact"
        title="Nous contacter"
        intro="Une question, une envie de participer ou un projet à proposer ?"
      />

      <section className="page-section">
        <div className="container page-grid page-grid--split page-grid--contact">
          <div className="contact-panel">
            <SectionHeading
              eyebrow="Écrire"
              title="Parlons musique"
              intro="Nous sommes disponibles pour répondre à toutes vos questions."
            />

            <div className="contact-list">
              <a href={`mailto:${site.contact.email}`} className="contact-item">
                <span className="contact-item__label">Email</span>
                <strong>{site.contact.email}</strong>
              </a>
              <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="contact-item">
                <span className="contact-item__label">Téléphone</span>
                <strong>{site.contact.phone}</strong>
              </a>
              <div className="contact-item">
                <span className="contact-item__label">Adresse</span>
                <strong>
                  {site.contact.street}
                  <br />
                  {site.contact.postalCode} {site.contact.city}
                </strong>
              </div>
            </div>

            <div className="cta-row">
              <Button href={`mailto:${site.contact.email}`} icon="mail">
                Envoyer un mail
              </Button>
              <Button href={`tel:${site.contact.phone.replace(/\s/g, '')}`} variant="secondary" icon="phone">
                Appeler
              </Button>
            </div>
          </div>

          <div className="form-card">
            <h3>Formulaire de contact</h3>
            <form className="contact-form">
              <label>
                Nom
                <input type="text" placeholder="Votre nom" />
              </label>
              <label>
                Email
                <input type="email" placeholder="votre@email.fr" />
              </label>
              <label>
                Message
                <textarea rows={5} placeholder="Votre message..." />
              </label>
              <Button type="submit" fullWidth>
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
