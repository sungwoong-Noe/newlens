import Link from "next/link";

type Category = {
    name: string;
    slug: string;
    count: number;
}

const categories: Category[] = [
    {name: '개발', slug: 'dev', count: 5},
    {name: '일상', slug: 'daily', count: 5},
    {name: '리뷰', slug: 'review', count: 5},
]

export default function Sidebar() {
    return (
        <aside className="w-64 pr-8">
            <div className="sticky top-4">
                <h2 className="text-lg font-blod mb-4">카테고리</h2>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category.slug}>
                            <Link 
                            href={`/article/category/${category.slug}`} 
                            className="flex items-center justify-between text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <span>{category.name}</span>
                                <span className="text-sm text-gray-400">{category.count}</span>
                            </Link>
                        </li>    
                    ))}
                </ul>
            </div>
        </aside>
    )
}