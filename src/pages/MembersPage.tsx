import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';
import { members } from '../data/members';

export function MembersPage() {
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

          <div className="member-grid">
            {members.map((member) => (
              <article key={member.id} className="member-card">
                <div className="member-card__top">
                  <span className="member-pill">{member.instrument}</span>
                  {member.role ? <span className="member-role">{member.role}</span> : null}
                </div>
                <h3>
                  {member.firstName} {member.lastName}
                </h3>
                <p>Depuis {member.joinedYear}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
