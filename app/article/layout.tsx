import Sidebar from "@/components/Sidebar";
import "../globals.css";

export default function ArticleLayout(
    {children}: {children: React.ReactNode;}
) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}