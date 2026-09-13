import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Member } from '../types/api';
import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getMembers().then(setMembers).catch((reason: Error) => setError(reason.message)).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="page-shell page-shell--narrow">
      <PageHeader
        eyebrow="Les musiciens"
        title="Membres de la clique"
        intro="Des profils variés, un même engagement pour la musique de village."
      />

      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="L’équipe"
            title="Chaque instrument porte la tradition"
            intro="Les membres de la Clique de Doissin animent les fêtes, les défilés et les cérémonies sur le territoire."
          />

          {isLoading ? <p className="empty-state" role="status">Chargement des membres…</p> : null}
          {error ? <p className="error-state" role="alert">{error}</p> : null}
          {!isLoading && !error && members.length === 0 ? <p className="empty-state">Aucun membre publié pour le moment.</p> : null}
          {!isLoading && !error && members.length > 0 ? <div className="member-grid">
            {members.map((member) => (
              <article key={member.id} className="member-card">
                <div className="member-card__top">
                  <span className="member-pill">{member.instrument}</span>
                  {member.role ? <span className="member-role">{member.role}</span> : null}
                </div>
                <h3>
                  {member.first_name} {member.last_name}
                </h3>
                <p>Depuis {member.joined_year}</p>
              </article>
            ))}
          </div> : null}
        </div>
      </section>
    </div>
  );
}
