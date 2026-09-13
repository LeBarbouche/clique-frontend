import type { ReactNode } from 'react';
import type { IconName } from '../../types/icon';
import './icon.css';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
}

const ICON_PATHS: Record<IconName, ReactNode> = {
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h2.6l1.7-2.6h7.4L17.4 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.5" r="3.4" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  'external-link': (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
  ),
  instagram: (
    <>
      <path d="M8 2.6h8a5.4 5.4 0 0 1 5.4 5.4v8a5.4 5.4 0 0 1-5.4 5.4H8A5.4 5.4 0 0 1 2.6 16V8A5.4 5.4 0 0 1 8 2.6Zm0 2A3.4 3.4 0 0 0 4.6 8v8A3.4 3.4 0 0 0 8 19.4h8a3.4 3.4 0 0 0 3.4-3.4V8A3.4 3.4 0 0 0 16 4.6H8Z" />
      <path d="M12 7.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 2a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z" />
      <circle cx="17.2" cy="6.8" r="1.2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7.5 8.5 6 8.5-6" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21.5S5.5 15.9 5.5 11a6.5 6.5 0 1 1 13 0c0 4.9-6.5 10.5-6.5 10.5Z" />
      <circle cx="12" cy="11" r="2.4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  music: (
    <>
      <path d="M9.5 18V5.8l10-2v12" />
      <ellipse cx="6.8" cy="18" rx="2.7" ry="2.3" />
      <ellipse cx="16.8" cy="15.8" rx="2.7" ry="2.3" />
    </>
  ),
  phone: (
    <path d="M5.4 3.8h3.2l1.9 4.6-2.3 1.5a12.4 12.4 0 0 0 5.4 5.4l1.5-2.3 4.6 1.9v3.2a1.6 1.6 0 0 1-1.7 1.6A17.3 17.3 0 0 1 3.8 5.5a1.6 1.6 0 0 1 1.6-1.7Z" />
  ),
  sparkle: (
    <path d="M12 2.6c.7 4.6 2 5.9 6.6 6.6-4.6.7-5.9 2-6.6 6.6-.7-4.6-2-5.9-6.6-6.6 4.6-.7 5.9-2 6.6-6.6Zm5.4 12.2c.35 2.3 1 2.95 3.3 3.3-2.3.35-2.95 1-3.3 3.3-.35-2.3-1-2.95-3.3-3.3 2.3-.35 2.95-1 3.3-3.3Z" />
  ),
  users: (
    <>
      <path d="M16 20.2v-1.6a4.1 4.1 0 0 0-4.1-4.1H7a4.1 4.1 0 0 0-4.1 4.1v1.6" />
      <circle cx="9.4" cy="7.6" r="3.6" />
      <path d="M21.1 20.2v-1.6a4.1 4.1 0 0 0-3.1-3.96" />
      <path d="M15.6 4.2a4.1 4.1 0 0 1 0 7.9" />
    </>
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8ZM9.75 15.02V8.98L15 12l-5.25 3.02Z" />
  ),
};

const FILLED_ICONS: ReadonlySet<IconName> = new Set<IconName>([
  'facebook',
  'instagram',
  'youtube',
]);

export function Icon({ name, size = 20, className, title }: IconProps) {
  const isFilled = FILLED_ICONS.has(name);

  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={isFilled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {ICON_PATHS[name]}
    </svg>
  );
}
