import type { ReactNode } from 'react';
import './page-header.css';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__inner container">
        {eyebrow ? (
          <p className="page-header__eyebrow eyebrow">{eyebrow}</p>
        ) : null}
        <h1 className="page-header__title">{title}</h1>
        {intro ? <p className="page-header__intro">{intro}</p> : null}
      </div>
    </header>
  );
}
