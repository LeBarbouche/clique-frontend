const LOCALE = 'fr-FR';

export interface FormattedDate {
  /** Jour sur deux chiffres, ex. « 20 ». */
  day: string;
  /** Mois abrégé, ex. « sept. ». */
  monthShort: string;
  /** Mois en toutes lettres, ex. « septembre ». */
  monthLong: string;
  year: string;
  /** Jour de la semaine, ex. « dimanche ». */
  weekday: string;
  /** Date complète, ex. « dimanche 20 septembre 2026 ». */
  full: string;
}

function parseIsoDate(iso: string): Date {
  // Sans l'heure, la chaîne serait interprétée en UTC et pourrait
  // décaler le jour d'une journée selon le fuseau du navigateur.
  return new Date(`${iso}T00:00:00`);
}

export function formatDate(iso: string): FormattedDate {
  const date = parseIsoDate(iso);

  return {
    day: new Intl.DateTimeFormat(LOCALE, { day: '2-digit' }).format(date),
    monthShort: new Intl.DateTimeFormat(LOCALE, { month: 'short' }).format(date),
    monthLong: new Intl.DateTimeFormat(LOCALE, { month: 'long' }).format(date),
    year: new Intl.DateTimeFormat(LOCALE, { year: 'numeric' }).format(date),
    weekday: new Intl.DateTimeFormat(LOCALE, { weekday: 'long' }).format(date),
    full: new Intl.DateTimeFormat(LOCALE, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date),
  };
}

export function sortByDateAsc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.date.localeCompare(b.date));
}
