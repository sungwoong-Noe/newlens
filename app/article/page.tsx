import Link from "next/link";
import { getAllArticles } from "@/lib/firebase-articles";

export default async function ArticlePage() {
    const posts = await getAllArticles()
    console.log('articles', posts)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">블로그</h1>
                <Link href="/article/write" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    새 글 작성
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link href={`/article/${post.slug}`} key={`${post.slug}_${post.date}`}>
                        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            {/* {post.thumbnail && (
                                <Image 
                                    src={post.thumbnail}
                                    alt={post.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                            )} */}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {post.tags?.map((tag, index) => (
                                        <span key={`${post.slug}_${tag}_${index}`} className="px-2 py-1 bg-gray-100 text-sm rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-2 line-clamp-2">{post.description}</p>
                                <div className="text-sm text-gray-500">
                                    {new Date(post.date).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}