import { PageHeader } from '../components/page-header/page-header';
import { SectionHeading } from '../components/section-heading/section-heading';
import { members } from '../data/members';
import { site } from '../data/site';

const sections = [
  { key: 'direction', label: 'Direction' },
  { key: 'fifres', label: 'Fifres' },
  { key: 'tambours', label: 'Tambours' },
  { key: 'clairons', label: 'Clairons' },
] as const;

export function GroupPage() {
  return (
    <div className="page-shell page-shell--narrow">
      <PageHeader
        eyebrow="Historique"
        title="Le groupe"
        intro="Une clique de village, une tradition vivante, une énergie collective."
      />

      <section className="page-section">
        <div className="container page-grid page-grid--split">
          <div>
            <SectionHeading
              eyebrow="Depuis 1911"
              title="Voix, rythme et esprit de village"
            />
          </div>

          <div className="story-card">
            <p>
              La clique de Doissin est née de la volonté de faire vivre la musique
              dans les rues, les places et les cérémonies de la commune. Au fil des
              générations, elle a gardé son identité : rigueur, authenticité et goût
              du partage.
            </p>
            <p>
              Aujourd’hui, la musique de la clique accompagne les fêtes des voisins,
              les manifestations locales et les grands moments de la commune, tout en
              accueillant les nouveaux talents à chaque saison.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section page-section--accent">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-card__value">{site.foundedYear}</span>
              <span className="stat-card__label">Année de fondation</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{members.length}</span>
              <span className="stat-card__label">Musiciens</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">3</span>
              <span className="stat-card__label">Parties instrumentales</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          {sections.map((section) => {
            const sectionMembers = members.filter((member) => member.section === section.key);

            if (!sectionMembers.length) {
              return null;
            }

            return (
              <div key={section.key} className="section-stack">
                <SectionHeading
                  eyebrow={section.label}
                  title={section.label}
                  level={3}
                />

                <div className="member-grid">
                  {sectionMembers.map((member) => (
                    <article key={member.id} className="member-card">
                      <div className="member-card__top">
                        <span className="member-pill">{member.instrument}</span>
                        {member.role ? <span className="member-role">{member.role}</span> : null}
                      </div>
                      <h3>
                        {member.firstName} {member.lastName}
                      </h3>
                      <p>Adhérent depuis {member.joinedYear}</p>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
