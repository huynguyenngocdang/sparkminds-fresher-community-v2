import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for toasts
import {  getPostsByPage } from "../../api/postApi";
import { TPost } from "../../types/post";
import PostItems from "./PostItems";

const Posts = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 2;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsByPage(currentPage, postsPerPage);
        setPosts(response.data);
        setTotalPages(response.pages);
      } catch (error) {
        toast.error("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="pagination flex items-center gap-2 mb-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-primary text-white p-2 rounded-lg w-[75px]"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-primary text-white p-2 rounded-lg w-[75px]"
        >
          Next
        </button>
      </div>
      <div>
        {posts.map((post, index) => (
          <PostItems key={index} {...post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
