import { collection, getDocs, addDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from './firebase';
import { Post, PostMetadata } from '@/types/post';

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const postsCol = collection(db, 'posts');
    const q = query(postsCol, orderBy('createdAt', 'desc'));
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
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const postsCol = collection(db, 'posts');
    const q = query(postsCol, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      throw new Error('Post not found');
    }

    const postData = snapshot.docs[0].data();
    return {
      slug,
      content: postData.content,
      title: postData.title,
      date: postData.createdAt.toDate().toISOString(),
      description: postData.description || '',
      thumbnail: postData.thumbnail || '',
      tags: postData.tags || [],
      category: postData.category
    };
  } catch (error) {
    throw new Error(`Failed to get post: ${error}`);
  }
}

export async function createPost(postData: {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  category: string;
  description?: string;
}): Promise<string> {
  try {
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');

    await addDoc(collection(db, 'posts'), {
      ...postData,
      slug,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return slug;
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`);
  }
}