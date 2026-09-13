import type { ReactNode } from 'react';
import './section-heading.css';

export type SectionHeadingAlign = 'left' | 'center';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: SectionHeadingAlign;
  /** Niveau de titre HTML pour respecter la hiérarchie du document. */
  level?: 2 | 3;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 3 ? 'h3' : 'h2';

  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="section-heading__eyebrow eyebrow">{eyebrow}</p> : null}
      <Heading className="section-heading__title">{title}</Heading>
      {intro ? <p className="section-heading__intro">{intro}</p> : null}
    </header>
  );
}
