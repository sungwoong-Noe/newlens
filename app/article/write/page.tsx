'use client';

import dynamic from "next/dynamic";
import { useState } from "react";
import { createArticle } from "@/lib/firebase-articles";
import { registTag} from "@/lib/firebase-tags";
import { Tag } from "@/types/tag";



const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
    ssr: false,
});

export default function WritePage(){
    
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // 태그 목록 
    const [tags, setTags] = useState<Tag[]>([]); 
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    // 태그 input 창
    const [inputTag, setInputTag] = useState('');
    
    // useEffect(() => {
    //     getAllTags().then(tags => setAllTags(tags));
    // }, []);
    // const [allTags, setAllTags] = useState<TagMetadata[]>([]);
    // const [thumbnail, setThumbnail] = useState<File | null>(null);
    // const [thumbnailPreview, setThumbnailPreview] = useState('');
    // const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if(file) {
            
    //         setThumbnail(file);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setThumbnailPreview(reader.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };


    const handleTagInput = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' || e.key === ','){
            e.preventDefault();

            const newTag = inputTag.trim();
            const reqTag = await registTag({name: inputTag});

            if(newTag && !tags.find(tag => tag.name.toLowerCase() === newTag.toLowerCase())){ 
                setTags([...tags, reqTag])
            }

            setInputTag('');
        }
    }




    const removeTag = (name: string) => {
        setTags(tags.filter(t => t.name !== name));
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(isSubmitting) return;

        try {
            setIsSubmitting(true);


            /* 썸네일 업로드 기능 추가 예정 */
            // let thumbnailUrl = '';
            // if(thumbnail) {
            //     const storage = getStorage();
            //     const storageRef = ref(storage, `thumbnails/${Date.now()}_${thumbnail.name}`);
            //     await uploadBytes(storageRef, thumbnail);
            //     thumbnailUrl = await getDownloadURL(storageRef);
            // }

            const slug = await createArticle({
                title, 
                content, 
                // thumbnail: thumbnailUrl,
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
        <div className="max-w-6xl mx-auto p-6">
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
                {/* <div>
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
                </div> */}

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

                <div>
        <label className="block mb-2">태그</label>
        <div className="flex flex-wrap gap-2 p-2 border rounded focus-within:border-blue-500">
            {tags.map((tag, index) => (
                <span 
                    key={index} 
                    // className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                    className={`${tag.color} px-2 py-1 rounded-full text-sm flex items-center`}
                >
                    {tag.name}
                    <button 
                        onClick={() => removeTag(tag.name)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                        ×
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleTagInput}
                className="flex-grow outline-none min-w-[120px]"
                placeholder="태그 입력 후 Enter"
            />
        </div>
        </div>
            {/* 마크다운 에디터 */}
            <div data-color-mode="light">
                <label className="block mb-2">내용</label>
                <MDEditor
                    value={content}
                    onChange={(val?: string) => setContent(val || '')}
                    height={800}
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