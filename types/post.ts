export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
  tags?: string[];
  category: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
} 