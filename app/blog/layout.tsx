import BlogSidebar from '@/components/BlogSidebar';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <BlogSidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
} 