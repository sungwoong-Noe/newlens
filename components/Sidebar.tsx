'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAllSidebarTags } from "@/lib/firebase-tags";
import { SidebarTag } from "@/types/tag";
import Link from "next/link";

export default function Sidebar() {
    const [tags, setTags] = useState<SidebarTag[]>([]);

    useEffect(() => {
        // 실시간 구독 설정
        const unsubscribe = onSnapshot(collection(db, 'articles'), async () => {
            // 태그 정보 새로 가져오기
            const updatedTags = await getAllSidebarTags();
            setTags(updatedTags);
        });

        // 컴포넌트 언마운트 시 구독 해제
        return () => unsubscribe();
    }, []);

    return (
        <aside className="w-64 pr-8">
            <div className="sticky top-4">
                <h2 className="text-lg font-blod mb-4">카테고리</h2>
                <ul className="space-y-2">
                    <li>
                            <Link 
                                href={`/article`} 
                                className="flex items-center justify-between text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <span>전체</span>
                                <span className="text-sm text-gray-400">{tags.map(tag => tag.count).reduce((a, b) => a + b, 0)}</span>
                            </Link>
                    </li>
                    {tags.map((category) => (
                        <li key={category.slug}>
                            <Link 
                                href={`/article?category=${category.name}`} 
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