import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Event } from '../types/api';
import { EventCard } from '../components/event-card/event-card';
import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';
import { sortByDateAsc } from '../utils/date';

export function AgendaPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getEvents().then(setEvents).catch((reason: Error) => setError(reason.message)).finally(() => setIsLoading(false));
  }, []);

  const upcomingEvents = sortByDateAsc(events);

  return (
    <div className="page-shell page-shell--narrow">
      <PageHeader
        eyebrow="Agenda"
        title="Les prochaines dates"
        intro="Concerts, passages et reprises, au rythme des saisons."
      />

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="À suivre"
            title="Le calendrier de la clique"
            intro="Retrouvez les dates clés de la saison et les manifestations où nous rendons visite aux habitants de Doissin."
          />

          {isLoading ? <p className="empty-state" role="status">Chargement de l’agenda…</p> : null}
          {error ? <p className="error-state" role="alert">{error}</p> : null}
          {!isLoading && !error && upcomingEvents.length === 0 ? <p className="empty-state">Aucune date annoncée pour le moment.</p> : null}
          {!isLoading && !error && upcomingEvents.length > 0 ? <div className="card-grid card-grid--events">{upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}</div> : null}
        </div>
      </section>
    </div>
  );
}
