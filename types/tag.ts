export interface TagMetadata {
    name: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tag extends TagMetadata {
    slug: string;
}

export interface SidebarTag extends Tag {
    count: number;
}