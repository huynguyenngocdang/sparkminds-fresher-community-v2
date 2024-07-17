
import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { TCommentFormInput, TPost } from "../../types/post";
import useToggleValues from "../../hooks/useToggleValues";
import ThumbUpIcon from "../icons/ThumbUpIcon";
import ThumbDownIcon from "../icons/ThumbDownIcon";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { dislikePost, getPost, likePost } from "../../api/postApi";
import { TComment } from "../../types/comment";
import PostComment from "./PostComment";
import { createComment, getCommentByPostId } from "../../api/commentApi";
import { v4 as uuidv4 } from 'uuid';


const PostDetailsItem: React.FC<TPost> = ({
  id,
  title,
  content,
  totalLikes,
  imageUrl,
  author,
  createdDate,

}) => {
  const [likes, setLikes] = useState(totalLikes);
  const [commentList, setCommentList] = useState<TComment[]>([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(id);
        setLikes(post.totalLikes);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    fetchPost();

    const fetchComments = async () => {
      try {
        const comments = await getCommentByPostId(id);
        setCommentList(comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  const { value: isThumbsUp, handleToggleValue: toggleIsLiked } =
    useToggleValues();

  const { value: isThumbDown, handleToggleValue: toggleIsDisliked } =
    useToggleValues();

  const schema = yup
    .object({
      newcomment: yup.string().required("Comment is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCommentFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<TCommentFormInput> = async (data) => {
    const username = sessionStorage.getItem("username");
    const uniqueId = uuidv4();
    const newComment: TComment = {
      id: uniqueId,
      author: username || "",
      comment: data.newcomment,
      createdDate: new Date().toISOString(),
      postId: id,
      isDelete: false,
    };
    const response = await createComment(newComment);

    
    setCommentList([...commentList, newComment]);

    reset();
  };

  const handleIsLiked = async () => {
    try {

      if (!isThumbsUp) {
        const updatedPost = await likePost(id);
        setLikes(updatedPost.totalLikes);
        if (isThumbDown) {
          toggleIsDisliked();
        }
      } else {
        const updatedPost = await dislikePost(id);
        setLikes(updatedPost.totalLikes);
      }
      toggleIsLiked();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleIsDisliked = async () => {
    try {
      if (!isThumbDown) {
        if (isThumbsUp) {
          await dislikePost(id);
          toggleIsLiked();
        }
        const updatedPost = await dislikePost(id);
        setLikes(updatedPost.totalLikes);
      } else {
        const updatedPost = await likePost(id);
        setLikes(updatedPost.totalLikes);
      }
      toggleIsDisliked();
    } catch (error) {
      console.error("Failed to dislike post:", error);
    }
  };
  return (
    <>
      <div className="p-5 mb-5 rounded-lg shadow-md border w-2/3 flex flex-col">
        <h2 className="font-bold text-2xl mb-1">{title}</h2>
        <div className="flex items-center justify-between">
          <h3 className="font-light text-secondary mb-3 text-sm">
            By: {author}
          </h3>
          <h3 className="font-light text-secondary mb-3 text-sm">
            Date: {createdDate}
          </h3>
        </div>
        {content ? (
          <p className="font-light text-secondary">{content}</p>
        ) : imageUrl ? (
          <img src={imageUrl} alt={imageUrl} className="w-fit" />
        ) : null}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-2 py-2">
            <button>
              <span>
                <ThumbUpIcon
                  isLiked={isThumbsUp}
                  onClick={handleIsLiked}
                  className="size-5 text-primary"
                />
              </span>
            </button>
            <span>{likes}</span>
            <button>
              <span>
                <ThumbDownIcon
                  isDisliked={isThumbDown}
                  onClick={handleIsDisliked}
                  className="size-5 text-orange-500"
                />
              </span>
            </button>
            <button className="bg-primary text-white rounded-lg px-2 py-1">
              Add comment
            </button>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 mb-5 p-5 border rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="newcomment"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="newcomment"
            {...register("newcomment")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
          {errors.newcomment && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newcomment.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded-lg px-4 py-2"
        >
          Submit
        </button>
      </form>
      
      <div>
        {commentList.map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default PostDetailsItem;
