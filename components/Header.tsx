import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 왼쪽: 로고와 네비게이션 메뉴 그룹 */}
        <div className="flex items-center gap-8">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="NewsLens Logo"
              width={32}
              height={32}
            />
            <span className="font-bold text-xl">NewsLens</span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <nav className="flex gap-6">
            <Link 
              href="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              블로그
            </Link>
            <Link 
              href="/news"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              뉴스
            </Link>
          </nav>
        </div>

        {/* 오른쪽: 유저 정보 */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/avatar.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm">사용자님</span>
        </div>
      </div>
    </header>
  );
} 