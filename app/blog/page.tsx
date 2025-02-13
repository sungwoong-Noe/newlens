import { getAllPosts } from '@/lib/posts';
import Image from 'next/image';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">블로그</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.slug} className="border rounded-lg overflow-hidden">
            {post.thumbnail && (
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <div className="text-sm text-gray-500">{post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 