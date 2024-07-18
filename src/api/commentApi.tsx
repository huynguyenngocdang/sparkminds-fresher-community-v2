import { toast } from "react-toastify";
import { SERVER_COMMENTS_PATH, SERVER_PATH } from "../constants/ServerPath";
import axios from "axios";

export async function getCommentByPostId(postId: string) {
    try {
      const response = await fetch(`${SERVER_PATH}/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments = await response.json();
      return comments;
    } catch (error) {
      toast.error('Failed to fetch comments');
      throw error;
    }
  }

  export async function createComment(data: any) {
    try {

    const response = await axios.post(SERVER_COMMENTS_PATH, data);
      if (!response) {
        throw new Error('Failed to create comment');
      }
      return response;
    } catch (error) {
      toast.error('Failed to create comment');
      throw error;
    }
  }