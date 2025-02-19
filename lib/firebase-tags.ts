import { collection, query, orderBy, getDocs, where, addDoc } from "firebase/firestore";
import { Tag, TagMetadata } from "@/types/tag";
import { db } from "./firebase";

const getRandomTailwindColor = () => {
    const colors = [
        'bg-blue-100 text-blue-800',
        // 'bg-red-100 text-red-800',
        // 'bg-green-100 text-green-800',
        // 'bg-yellow-100 text-yellow-800',
        // 'bg-purple-100 text-purple-800',
        // 'bg-pink-100 text-pink-800',
        // 'bg-indigo-100 text-indigo-800',
        // 'bg-teal-100 text-teal-800'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};


export async function getAllTags(): Promise<TagMetadata[]> { 
    try { 
        const tagsCol = collection(db, `tags`);
        const q = query(tagsCol, orderBy('name', 'asc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            name: doc.data().name, 
            color: doc.data().color,
            slug: doc.data().slug,
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate()
        }))

    } catch (error) { 
        console.error(`Error fetching tags: ${error}`);
        return [];
    }
}



export async function registTag(tagData: {
    name: string;
}): Promise<Tag> {
    try { 
        const slug = tagData.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');

        const tagForm = {
            name: tagData.name,
            slug: slug, 
            color: getRandomTailwindColor(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        console.log(tagData.name);
        console.log(tagForm);
        const allTags = await getAllTags()
        console.log(allTags);
        const existingTag = allTags.find(tag => tag.name.toLowerCase() === tagData.name.toLowerCase());

        if(!existingTag) {
            await addDoc(collection(db, 'tags'), tagForm);
        }

        const res = {
            name: tagData.name,
            color: tagForm.color, 
            slug: tagForm.slug,
            createdAt: tagForm.createdAt,
            updatedAt: tagForm.updatedAt
        }

        return res;

    } catch (error) { 
        console.error(`Error registering tag: ${error}`);
        throw new Error(`Failed to register tag: ${error}`);
    }
}