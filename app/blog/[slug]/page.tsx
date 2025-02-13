import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost(props: Props) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

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