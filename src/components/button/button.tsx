import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { IconName } from '../../types/icon';
import { Icon } from '../icon/icon';
import './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  /** Route interne — rend un <Link> de React Router. */
  to?: string;
  /** Lien externe — rend une balise <a>. */
  href?: string;
  /** Action — rend un <button>. */
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

function buildClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
): string {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`];

  if (fullWidth) {
    classes.push('btn--full');
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}
export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  className,
  disabled = false,
}: ButtonProps) {
  const classNames = buildClassName(variant, size, fullWidth, className);

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon ? (
        <Icon
          name={icon}
          size={size === 'lg' ? 20 : 18}
          className="btn__icon"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classNames}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classNames} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classNames} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
