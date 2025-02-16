export interface ArticleMetadata {
    title: string;
    date: string;
    description: string;
    thumbnail?: string;
    tags?: string[];
    category: string;
    slug: string;
}

export interface Article extends ArticleMetadata {
    content: string;
}