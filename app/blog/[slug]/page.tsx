import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}) {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostBySlug(resolvedParams.slug);

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-8">{post.date}</div>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
} 