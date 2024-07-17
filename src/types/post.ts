export type TPost = {
    id: number;
    title: string;
    content: string | null;
    imageUrl: string | null;
    author: string;
    totalLikes: number;
    createdDate: string;
    postType: string;
    isDelete: boolean;
};
