import React, { useEffect, useState } from "react";
import { TPost } from "../../types/post";
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTE_POST_DETAILS } from "../../constants/WebPath";
import useToggleValues from "../../hooks/useToggleValues";
import { dislikePost, getPost, likePost } from "../../api/postApi";
import { useAuth } from "../../context/AuthProvider";
import { ChatBubbleIcon, ThumbDownIcon, ThumbUpIcon } from "../icons";
import formateDateFromString from "../utils/FormatDate";

const PostItems: React.FC<TPost> = ({
  id,
  title,
  content,
  imageUrl,
  author,
  totalLikes,
  postType,
  createdDate,
  isDelete,
}) => {
  const { user } = useAuth() as any;
  const navigate = useNavigate();
  const [likes, setLikes] = useState(totalLikes);
  const { value: isThumbsUp, handleToggleValue: toggleIsLiked } =
    useToggleValues();
  const { value: isThumbDown, handleToggleValue: toggleIsDisliked } =
    useToggleValues();


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
    }, [id]);

  const handleIsLiked = async () => {
    try {
      if(!user) {
        navigate('/login');
        return;
      }
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
      if(!user) {
        navigate('/login');
        return;
      }
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

  const formattedDate = formateDateFromString(createdDate);

  return (
    <div className="p-5 mb-5 rounded-lg shadow-md border w-2/3 flex flex-col">
      <h2 className="font-bold text-2xl mb-1">{title}</h2>

      <div className="flex items-center justify-between font-light text-secondary mb-3 text-sm">
        <h3>By: {author}</h3>
        <span>Date: {formattedDate}</span>
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
        </div>
        <div className="px-2 py-[10px] bg-slate-100 rounded-lg flex items-center">
          <NavLink to={ROUTE_POST_DETAILS.replace(":id", id.toString())}>
            <span>
              <ChatBubbleIcon className="size-5" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PostItems;
