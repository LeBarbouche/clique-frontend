export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  year: number;
  /** Lieu ou événement où la photo a été prise. */
  place: string;
}
