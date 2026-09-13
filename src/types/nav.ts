export interface NavItem {
  label: string;
  to: string;
  /** Correspondance exacte pour la route d'accueil. */
  end?: boolean;
}
