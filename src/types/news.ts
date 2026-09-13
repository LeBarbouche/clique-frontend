export interface NewsComment {
  id: string;
  author: string;
  message: string;
  date: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  comments: NewsComment[];
}