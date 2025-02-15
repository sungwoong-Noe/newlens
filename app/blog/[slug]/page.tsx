import { getPostBySlug } from '@/lib/firebase-posts';

interface Props {
  params: { slug: string };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-8">{new Date(post.date).toLocaleDateString()}</div>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
} 