import { collection, query, orderBy, getDocs, where, addDoc } from "firebase/firestore";
import {db} from "./firebase";
import { Article, ArticleMetadata } from "@/types/article";

// 모든 게시글 조회
export async function getAllArticles(): Promise<ArticleMetadata[]> {
    try { 
        const articleCol = collection(db, 'articles');
        const q = query(articleCol, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            slug: doc.data().slug, 
            title: doc.data().title, 
            date: doc.data().createdAt.toDate().toISOString(),
            description: doc.data().description || '',
            thumbnail: doc.data().thumbnail || '',
            tags: doc.data().tags || [],
            category: doc.data().category
        }));
    } catch (error) { 
        console.error('Error fetching articles: ', error);
        return [];
    }
}


// 특정 게시글 조회
export async function getPostBySlug(slug: string): Promise<Article> {
    try { 
        const articlesCol = collection(db, 'articles');
        const q = query(articlesCol, where('slug', '==', slug))
        const snapshot = await getDocs(q);

        if(snapshot.empty) {
            throw new Error('Article not found');
        }

        const articleData = snapshot.docs[0].data();
        return {
            slug, 
            content: articleData.content,
            title: articleData.title, 
            date: articleData.createdAt.toDate().toISOString(),
            description: articleData.description || '',
            thumbnail: articleData.thumbnail || '',
            tags: articleData.tags || [],
            category: articleData.category
        }
    } catch (error) { 
        throw new Error(`Failed to get article: ${error}`)
    }
}

// 게시글 생성
export async function createArticle(articleData: {
    title: string;
    content: string;
    thumbnail?: string;
    tags: string[];
    category: string;
    description?: string;
}): Promise<string> {
    try {
        const slug = articleData.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');

        await addDoc(collection(db, 'articles'), {
            ...articleData, 
            slug, 
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return slug;
    } catch (error) { 
        throw new Error(`Failed to create article: ${error}`)
    }
}