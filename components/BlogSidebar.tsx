import Link from 'next/link';

type Category = {
  name: string;
  slug: string;
  count: number;
};

// 임시 카테고리 데이터 (나중에 실제 데이터로 교체)
const categories: Category[] = [
  { name: '개발', slug: 'dev', count: 5 },
  { name: '일상', slug: 'daily', count: 3 },
  { name: '리뷰', slug: 'review', count: 2 },
];

export default function BlogSidebar() {
  return (
    <aside className="w-64 pr-8">
      <div className="sticky top-4">
        <h2 className="text-lg font-bold mb-4">카테고리</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
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
  );
} 