import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../../data/nav';
import { site } from '../../data/site';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import './navbar.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const menuClassName = isMenuOpen
    ? 'navbar__menu navbar__menu--open'
    : 'navbar__menu';

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__brand" end>
          <span className="navbar__mark">
            <Icon name="music" size={22} />
          </span>
          <span className="navbar__brand-text">
            <span className="navbar__brand-name">{site.name}</span>
            <span className="navbar__brand-tagline">{site.tagline}</span>
          </span>
        </NavLink>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={22} />
        </button>

        <nav
          id="navbar-menu"
          className={menuClassName}
          aria-label="Navigation principale"
        >
          <ul className="navbar__list">
            {navItems.map((item) => (
              <li key={item.to} className="navbar__item">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive
                      ? 'navbar__link navbar__link--active'
                      : 'navbar__link'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button to="/contact" className="navbar__cta">
            Nous rejoindre
          </Button>
        </nav>
      </div>
    </header>
  );
}
