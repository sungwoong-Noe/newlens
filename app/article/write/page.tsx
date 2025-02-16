'use client';

import Image from "next/image"; 
import dynamic from "next/dynamic";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from "react";
import { createArticle } from "@/lib/firebase-article";

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
    ssr: false,
});

export default function WritePage(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(isSubmitting) return;

        try {
            setIsSubmitting(true);

            let thumbnailUrl = '';
            if(thumbnail) {
                const storage = getStorage();
                const storageRef = ref(storage, `thumbnails/${Date.now()}_${thumbnail.name}`);
                await uploadBytes(storageRef, thumbnail);
                thumbnailUrl = await getDownloadURL(storageRef);
            }

            const slug = await createArticle({
                title, 
                content, 
                thumbnail: thumbnailUrl,
                tags, 
                category, 
                description: content.substring(0, 150) + '...'
            });

            // 성공 후 리디렉션
            window.location.href = `/article/${slug}`
        } catch(error) {
            console.error('Error creating post: ', error);
            alert('포스팅 작성 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 제목 일력 */}
                <div>
                    <label className="block mb-2">제목</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* 썸네일 업로드 */}
                <div>
                    <label className="block mb-2">썸네일</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="mb-2"
                    />
                    {thumbnailPreview && (
                        <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            width={320}
                            height={160}
                            className="max-w-xs max-h-40 object-cover rounded"
                        />
                    )}
                </div>

                {/* 카테고리 선택 */}
                <div>
                    <label className="block mb-2">카테고리</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">카테고리 선택</option>
                        <option value="tech">기술</option>
                        <option value="life">일상</option>
                        <option value="dev">개발</option>
                    </select>
                </div>

                {/* 태그 입력 */}
                <div>
                    <label className="block mb-2">태그 (쉼표로 구분)</label>
                    <input 
                        type="text"
                        value={tags.join(',')}
                        onChange={(e) => 
                            setTags(
                                [...new Set(e.target.value.split(',').map(tag => tag.trim()))])
                        }
                    />
                </div>
                
                {/* 마크다운 에디터 */}
                <div data-color-mode="light">
                    <label className="block mb-2">내용</label>
                    <MDEditor
                        value={content}
                        onChange={(val?: string) => setContent(val || '')}
                        height={400}
                    />  
                </div>

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isSubmitting ? '저장 중...' : '글 발행하기'}
                </button>
            </form>
        </div>
    )
}