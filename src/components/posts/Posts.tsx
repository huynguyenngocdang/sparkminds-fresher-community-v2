import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for toasts
import { getPosts } from '../../api/postApi';
import { TPost } from '../../types/post';
import PostItems from './PostItems';


const Posts = () => {
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        toast.error('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, []); 

  return (
    <div>
      {posts.map((post, index) => (
        <PostItems key={index} {...post} />
      ))}
    </div>
  );
};

export default Posts;