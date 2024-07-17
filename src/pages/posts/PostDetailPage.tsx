import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TPost } from "../../types/post";
import { getPost } from "../../api/postApi";
import MainLayout from "../../layout/MainLayout";
import PostDetailsItem from "../../components/posts/PostDetailsItem";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [post, setPost] = useState<TPost>();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const response = await getPost(id);
        console.log("🚀 ~ fetchPost ~ response:", response)
        if (response) {
          setPost(response);
        }
      }
    };
    fetchPost();
  }, [id]); 
  return (
    <MainLayout>
      {post ? (
        <div>
          <PostDetailsItem 
            key={post.id}
            {...post}
                    />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </MainLayout>
  );
};

export default PostDetailPage;
