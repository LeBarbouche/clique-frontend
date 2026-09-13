import type { EventCategory } from '../types/event';

const CATEGORY_LABELS: Record<EventCategory, string> = {
  passage: 'Passage',
  concert: 'Concert',
  ceremonie: 'Cérémonie',
  repetition: 'Répétition',
};

export function getCategoryLabel(category: EventCategory): string {
  return CATEGORY_LABELS[category];
}
