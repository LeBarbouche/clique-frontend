import { EventCard } from '../components/event-card/event-card';
import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';
import { events } from '../data/events';
import { sortByDateAsc } from '../utils/date';

export function AgendaPage() {
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

          <div className="card-grid card-grid--events">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
