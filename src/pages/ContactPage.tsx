import { useState, type FormEvent } from 'react';
import { api } from '../api/client';
import { Button } from '../components/button/button';
import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';
import { site } from '../data/site';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api.sendContact(form);
      setForm({ name: '', email: '', message: '' });
      setStatus('sent');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Le message n’a pas pu être envoyé.');
      setStatus('error');
    }
  }

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
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">
                Nom
                <input id="contact-name" type="text" placeholder="Votre nom" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required minLength={2} />
              </label>
              <label htmlFor="contact-email">
                Email
                <input id="contact-email" type="email" placeholder="votre@email.fr" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
              </label>
              <label htmlFor="contact-message">
                Message
                <textarea id="contact-message" rows={5} placeholder="Votre message..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required minLength={10} />
              </label>
              <Button type="submit" fullWidth disabled={status === 'sending'}>
                {status === 'sending' ? 'Envoi…' : 'Envoyer'}
              </Button>
              {status === 'sent' ? <p className="success-state" role="status">Votre message a bien été envoyé.</p> : null}
              {status === 'error' ? <p className="error-state" role="alert">{error}</p> : null}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
