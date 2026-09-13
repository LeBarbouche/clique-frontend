import { members } from '../../data/members';
import { site } from '../../data/site';
import { Button } from '../button/button';
import './hero.css';

interface HeroStat {
  value: string;
  label: string;
}

const stats: HeroStat[] = [
  { value: String(site.foundedYear), label: 'Année de fondation' },
  { value: String(members.length), label: 'Musiciens' },
  { value: '30+', label: 'Sorties par an' },
];

const heroImage =
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner container">
        <div className="hero__content">
          <p className="hero__eyebrow eyebrow">
            {site.town} · Isère · {site.foundedYear}
          </p>

          <h1 className="hero__title">{site.name}</h1>

          <p className="hero__lead">
            Une clique de fifres, tambours et clairons qui anime les fêtes du
            village depuis plus d’un siècle. Nous jouons pour les cérémonies,
            les aubades et les défilés, et nous accueillons tous ceux qui
            veulent apprendre.
          </p>

          <div className="hero__actions">
            <Button to="/agenda" size="lg" icon="calendar">
              Voir l’agenda
            </Button>
            <Button to="/contact" size="lg" variant="secondary">
              Nous rejoindre
            </Button>
          </div>
        </div>

        <figure className="hero__figure">
          <img
            className="hero__image"
            src={heroImage}
            alt="La clique de Doissin en uniforme, fifres et tambours réunis sur la place du village"
            width="880"
            height="660"
          />
          <figcaption className="hero__caption">
            Prochaine sortie : voir l’agenda
          </figcaption>
        </figure>
      </div>

      <ul className="hero__stats container">
        {stats.map((stat) => (
          <li className="hero__stat" key={stat.label}>
            <span className="hero__stat-value">{stat.value}</span>
            <span className="hero__stat-label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
