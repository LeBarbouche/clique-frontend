import type { Event } from '../../types/api';
import { formatDate } from '../../utils/date';
import { getCategoryLabel } from '../../utils/event-category';
import { Icon } from '../icon/icon';
import './event-card.css';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const date = formatDate(event.date);
  const timeRange = event.end_time
    ? `${event.start_time} – ${event.end_time}`
    : event.start_time;

  return (
    <article className="event-card">
      <div className="event-card__date">
        <span className="event-card__day">{date.day}</span>
        <span className="event-card__month">{date.monthShort}</span>
        <span className="event-card__year">{date.year}</span>
      </div>

      <div className="event-card__body">
        <p className="event-card__meta">
          <span className="event-card__category">
            {getCategoryLabel(event.category)}
          </span>
          <span className="event-card__weekday">{date.weekday}</span>
        </p>

        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__description">{event.description}</p>

        <ul className="event-card__details">
          <li className="event-card__detail">
            <Icon name="calendar" size={16} />
            <span>{timeRange}</span>
          </li>
          <li className="event-card__detail">
            <Icon name="map-pin" size={16} />
            <span>
              {event.venue}, {event.city}
            </span>
          </li>
          <li className="event-card__detail">
            <Icon name="sparkle" size={16} />
            <span>{event.isFree ? 'Entrée libre' : 'Entrée payante'}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}
