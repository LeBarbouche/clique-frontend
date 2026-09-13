export type EventCategory =
  | 'passage'
  | 'concert'
  | 'ceremonie'
  | 'repetition';

export interface CliqueEvent {
  id: string;
  title: string;
  /** Date au format ISO (AAAA-MM-JJ). */
  date: string;
  startTime: string;
  endTime?: string;
  venue: string;
  city: string;
  description: string;
  category: EventCategory;
  isFree: boolean;
}
