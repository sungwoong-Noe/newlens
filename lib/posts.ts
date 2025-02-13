import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostMetadata } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => ({
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      }));
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      title: data.title,
      date: data.date,
      description: data.description,
      thumbnail: data.thumbnail,
      tags: data.tags,
      category: data.category,
    };
  } catch (error) {
    throw new Error(`Failed to load post: ${error}`);
  }
}

export function getAllPosts(): PostMetadata[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
    
    const allPostsData = mdFiles.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        thumbnail: data.thumbnail,
        tags: data.tags,
        category: data.category,
      };
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
} 