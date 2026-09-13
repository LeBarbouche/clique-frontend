import type { SiteInfo } from '../types/site';

export const site: SiteInfo = {
  name: 'La Clique de Doissin',
  shortName: 'La Clique',
  tagline: 'Fifres, tambours et clairons depuis 1911',
  town: 'Doissin',
  foundedYear: 1911,
  contact: {
    email: 'contact@cliquededoissin.fr',
    phone: '04 74 92 41 08',
    street: '12 place de la Mairie',
    postalCode: '38730',
    city: 'Doissin',
  },
  socials: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/',
      icon: 'facebook',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/',
      icon: 'instagram',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/',
      icon: 'youtube',
    },
  ],
};
