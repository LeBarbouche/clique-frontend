import { Link } from 'react-router-dom';
import { navItems } from '../../data/nav';
import { site } from '../../data/site';
import { Icon } from '../icon/icon';
import './footer.css';

const currentYear = new Date().getFullYear();

export function Footer() {
  const { contact, socials } = site;

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__column footer__column--brand">
            <p className="footer__brand">{site.name}</p>
            <p className="footer__tagline">{site.tagline}</p>
            <p className="footer__since">
              Association fondée en {site.foundedYear} à {site.town}
            </p>
            <ul className="footer__socials">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    className="footer__social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name={social.icon} size={18} />
                    <span className="visually-hidden">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__column" aria-label="Navigation de pied de page">
            <h2 className="footer__title">Navigation</h2>
            <ul className="footer__list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link className="footer__link" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__column">
            <h2 className="footer__title">Nous contacter</h2>
            <ul className="footer__list">
              <li>
                <a className="footer__link" href={`mailto:${contact.email}`}>
                  <Icon name="mail" size={16} />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                >
                  <Icon name="phone" size={16} />
                  {contact.phone}
                </a>
              </li>
              <li className="footer__address">
                <Icon name="map-pin" size={16} />
                <span>
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {site.name} — Tous droits réservés
          </p>
          <p className="footer__credit">
            Site réalisé avec React et Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
