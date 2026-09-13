import type { NewsArticle } from '../types/news';

export const news: NewsArticle[] = [
  {
    id: 'saison-2026',
    title: 'La nouvelle saison est lancée',
    excerpt: 'Répétitions, cérémonies et rendez-vous de village : voici les premières dates à noter.',
    content: 'Les pupitres se retrouvent chaque semaine pour préparer une saison pleine de musique et de rencontres. La clique sera présente aux rendez-vous traditionnels de Doissin et dans les communes voisines.',
    date: '2026-03-08',
    category: 'Vie de la clique',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85',
    comments: [
      { id: 'comment-1', author: 'Marie', message: 'Bravo à toute la clique, on a hâte de vous retrouver !', date: '2026-03-09' },
    ],
  },
  {
    id: 'portes-ouvertes',
    title: 'Une répétition ouverte à toutes et tous',
    excerpt: 'Vous aimez les cuivres, les percussions ou simplement l’ambiance ? Venez nous rencontrer.',
    content: 'Une répétition ouverte est organisée à la salle des associations. Aucun niveau musical n’est requis pour venir écouter, discuter ou découvrir nos instruments.',
    date: '2026-02-18',
    category: 'Nous rejoindre',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=85',
    comments: [],
  },
  {
    id: 'sainte-cecile',
    title: 'Retour en images sur la Sainte-Cécile',
    excerpt: 'Une journée de musique, de transmission et de convivialité au cœur du village.',
    content: 'Merci à toutes les personnes venues partager ce moment avec nous. Retrouvez les photos de cette journée dans la galerie du site.',
    date: '2025-11-24',
    category: 'Retour en images',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=85',
    comments: [],
  },
];