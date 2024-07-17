import { toast } from "react-toastify";
import { SERVER_POSTS_PATH } from "../constants/ServerPath";
import axios from "axios";


export async function getPosts() {
    try {
      const response = await fetch(SERVER_POSTS_PATH);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const posts = await response.json();
      return posts;
    } catch (error) {
      toast.error('Failed to login');
    }
  }
  export async function getPost(id: string) {
    try {
      const response = await fetch(`${SERVER_POSTS_PATH}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const post = await response.json();
      return post;
    } catch (error) {
      toast.error('Failed to fetch post');
      throw error;
    }
  }

  export async function likePost(id: string) {
    try {
      const postResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`);
      if (!postResponse.ok) {
        throw new Error('Failed to fetch post');
      }
      const post = await postResponse.json();
      post.totalLikes += 1;
  
      const updateResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Failed to update post likes');
      }
  
      const updatedPost = await updateResponse.json();
      return updatedPost;
    } catch (error) {
      toast.error('Failed to like post');
    }
  }

  export async function dislikePost(id: string) {
    try {
      const postResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`);
      if (!postResponse.ok) {
        throw new Error('Failed to fetch post');
      }
      const post = await postResponse.json();
      post.totalLikes -= 1;
  
      const updateResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Failed to update post likes');
      }
  
      const updatedPost = await updateResponse.json();
      return updatedPost;
    } catch (error) {
      toast.error('Failed to like post');
    }
  }

  export async function createPost(postData: any) {
    try {
    //   const response = await fetch(SERVER_POSTS_PATH, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(postData),
    //   });
    const response = await axios.post(SERVER_POSTS_PATH, postData);
      if (!response) {
        throw new Error('Failed to create post');
      }
      return response;
    } catch (error) {
      toast.error('Failed to create post');
      throw error;
    }
  }