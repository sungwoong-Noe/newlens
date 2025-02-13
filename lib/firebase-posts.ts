import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Post } from '@/types/post';

export async function getAllPosts() {
  const postsCol = collection(db, 'posts');
  const postSnapshot = await getDocs(postsCol);
  return postSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getPostBySlug(slug: string) {
  const docRef = doc(db, 'posts', slug);
  const postDoc = await getDoc(docRef);
  
  if (!postDoc.exists()) {
    throw new Error('Post not found');
  }

  return {
    slug,
    ...postDoc.data()
  } as Post;
}