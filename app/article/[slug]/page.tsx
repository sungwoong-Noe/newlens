import { getArticleBySlug } from "@/lib/firebase-articles";
import { remark } from "remark";
import html from "remark-html";

type PageProps = {
    params: Promise<{slug: string}>
}


export default async function ArticlePage({params}: PageProps) { 
    try {
        const resolvedParams = await params
        
        const article = await getArticleBySlug(resolvedParams.slug);

        const processedContent = await remark()
            .use(html)
            .process(article.content);
        
        const contentHtml = processedContent.toString();

        return (
            <article className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                <div className="text-gray-500 mb-8">{new Date(article.date).toLocaleDateString()}</div>
                <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{__html: contentHtml}}
                />
            </article>
        );
    } catch (error) {
        console.error('Error loading article:', error);
        return <div>Error loading article</div>;
    }

}