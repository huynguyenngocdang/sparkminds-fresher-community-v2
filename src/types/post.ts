export type TPost = {
    id: string;
    title: string;
    content: string | null;
    imageUrl: string | null;
    author: string;
    totalLikes: number;
    createdDate: string;
    postType: string;
    isDelete: boolean;
};

export type TCommentFormInput = {
    newcomment: string;
}