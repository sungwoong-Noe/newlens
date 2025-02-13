import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { GetStaticProps } from 'next';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const { slug } = context.params as { slug: string };

  // 필요한 데이터 가져오기
  // const data = await fetchData(slug);

  return {
    props: {
      params: {
        slug,
      },
      // data,
    },
  };
};

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = params;
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
};

export default BlogPostPage; 