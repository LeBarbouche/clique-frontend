export type Section = 'fifres' | 'tambours' | 'clairons' | 'direction';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  instrument: string;
  section: Section;
  /** Année d'arrivée dans la clique. */
  joinedYear: number;
  role?: string;
}
