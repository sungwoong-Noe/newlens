import { Tag } from "./tag";

export interface ArticleMetadata {
    title: string;
    date: string;
    description: string;
    thumbnail?: string;
    tags?: Tag[];
    category: string;
    slug: string;
}

export interface Article extends ArticleMetadata {
    content: string;
}