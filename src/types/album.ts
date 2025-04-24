export interface Album {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  coverImageUrl: string;
  pages: AlbumPage[];
}

export interface AlbumPage {
  id: string;
  imageUrl: string;
  alt?: string;
}