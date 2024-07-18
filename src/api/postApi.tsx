import { toast } from "react-toastify";
import { SERVER_POSTS_PATH } from "../constants/ServerPath";
import axios from "axios";
import { NOTIFCATION_GET_POST_ERROR } from "../constants/Notification";

export async function getPosts() {
  try {
    const response = await fetch(SERVER_POSTS_PATH);
    if (!response.ok) {
      throw new Error(NOTIFCATION_GET_POST_ERROR);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    toast.error(NOTIFCATION_GET_POST_ERROR);
  }
}

export async function getPostsByPage(page: number, limit: number) {
  try {
    const response = await fetch(`${SERVER_POSTS_PATH}?_page=${page}&_per_page=${limit}`);
    if(!response) {
      throw new Error(NOTIFCATION_GET_POST_ERROR);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    toast.error(NOTIFCATION_GET_POST_ERROR);
  }
}
export async function getPost(id: string) {
  try {
    const response = await fetch(`${SERVER_POSTS_PATH}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const post = await response.json();
    return post;
  } catch (error) {
    toast.error("Failed to fetch post");
    throw error;
  }
}

export async function likePost(id: string) {
  try {
    const postResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`);
    if (!postResponse.ok) {
      throw new Error("Failed to fetch post");
    }
    const post = await postResponse.json();
    post.totalLikes += 1;

    const updateResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update post likes");
    }

    const updatedPost = await updateResponse.json();
    return updatedPost;
  } catch (error) {
    toast.error("Failed to like post");
  }
}

export async function dislikePost(id: string) {
  try {
    const postResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`);
    if (!postResponse.ok) {
      throw new Error("Failed to fetch post");
    }
    const post = await postResponse.json();
    post.totalLikes -= 1;

    const updateResponse = await fetch(`${SERVER_POSTS_PATH}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update post likes");
    }

    const updatedPost = await updateResponse.json();
    return updatedPost;
  } catch (error) {
    toast.error("Failed to like post");
  }
}

export async function createPost(postData: any) {
  try {
    const response = await axios.post(SERVER_POSTS_PATH, postData);
    if (!response) {
      throw new Error("Failed to create post");
    }
    return response;
  } catch (error) {
    toast.error("Failed to create post");
    throw error;
  }
}

export async function updatePost(id: string, postData: any) {
  try {
    const response = await axios.put(`${SERVER_POSTS_PATH}/${id}`, postData);
    if (!response) {
      throw new Error("Failed to update post");
    }
    return response;
  } catch (error) {
    toast.error("Failed to update post");
    throw error;
  }
}

export async function deletePost(id: string) {
  try {
    const response = await axios.delete(`${SERVER_POSTS_PATH}/${id}`);
    if (!response) {
      throw new Error("Failed to delete post");
    }
    return response;
  } catch (error) {
    toast.error("Failed to delete post");
    throw error;
  }
}