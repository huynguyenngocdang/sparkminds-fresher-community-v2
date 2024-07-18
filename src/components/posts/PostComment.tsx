import React from "react";
import { TComment } from "../../types/comment";
import { EditIcon, TrashIcon } from "../icons";
import formateDateFromString from "../utils/FormatDate";


interface PostCommentProps {
  comment: TComment;
}

const PostComment: React.FC<PostCommentProps> = ({ comment }) => {
  const formattedDate = formateDateFromString(comment.createdDate);
  return (
    <div className="p-5 mb-5 rounded-lg shadow-md border w-2/3 flex flex-col items-start">
      <p className="font-light text-secondary">{comment.comment}</p>
      <div className="flex items-center justify-between w-full mt-2">
        <div className="flex items-center gap-5">
          <h3 className="font-light text-secondary text-sm">
            By: {comment.author}
          </h3>
          <h3 className="font-light text-secondary text-sm">
            Date: {formattedDate}
          </h3>
        </div>
        {/* <div className="flex gap-2">
          <EditIcon className="size-5 cursor-pointer"></EditIcon>
          <TrashIcon className="size-5 cursor-pointer"></TrashIcon>
        </div> */}
      </div>
    </div>
  );
};

export default PostComment;
