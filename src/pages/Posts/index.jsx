
import React, { useEffect, useState } from "react";
import { BsFillHeartFill, BsFillTrashFill, BsX } from "react-icons/bs"; 
import axios from "axios";
import Swal from "sweetalert2";
import userImage from "../../assets/user.png";
import { IoChatboxEllipsesOutline } from "react-icons/io5";


const Post = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:9000/posts");
        setPosts(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:'green',
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:9000/posts/${postId}`);
          if (response.status === 200) {
            setPosts(posts.filter((post) => post._id !== postId));
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          } else {
            throw new Error("Failed to delete post");
          }
        } catch (error) {
          setError(error);
          Swal.fire("Error", `Failed to delete post: ${error.message}`, "error");
        }
      }
    });
  };

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const handleDeleteComment = async (postId, commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:'green',
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:9000/comments/${commentId}`);
          if (response.status === 200) {
            const updatedPosts = posts.map((post) => {
              if (post._id === postId) {
                const updatedComments = post.comments.filter((comment) => comment._id !== commentId);
                return { ...post, comments: updatedComments };
              }
              return post;
            });
            setPosts(updatedPosts);
            setShowCommentModal(false);
            setSelectedPost(null);
            Swal.fire("Deleted!", "Your comment has been deleted.", "success");
          } else {
            throw new Error("Failed to delete comment");
          }
        } catch (error) {
          setError(error);
          Swal.fire("Error", `Failed to delete comment: ${error.message}`, "error");
        }
      }
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-11/12 lg:w-6/12 mx-auto pt-24">
      {currentPosts.map((post) => (
        <div
          key={post._id}
          className="relative rounded-xl bg-white p-4 shadow-md flex flex-col mb-4"
        >
          <button
            className="absolute top-2 right-2 text-red-600"
            onClick={() => handleDeletePost(post._id)}
          >
            <BsFillTrashFill className="h-6 w-6" />
          </button>
          <div className="flex items-center mb-2">
            <img
              src={post.userId?.photo || userImage}
              alt="Profile"
              className="h-14 w-14 rounded-full border-2 border-primary mr-4"
            />
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <h2 className="font-semibold mr-2">{post.userId?.name}</h2>
                <p className="text-xs text-gray-500">posted an update</p>
              </div>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex-grow">
            <div className="px-2">
              <p>{post.description}</p>
            </div>
            {post.imageURL && (
              <div className="h-[28rem] w-full">
                <img
                  src={`http://localhost:9000/postcard/${post.imageURL}`}
                  alt="Post"
                  className="object-contain rounded-2xl h-full w-full"
                />
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2 items-center">
                <button>
                  <BsFillHeartFill className="text-red-600 h-6 w-6" />
                </button>
                <p>{post.likes.length}</p>
              </div>
              <div
                className="cursor-pointer flex items-center justify-center gap-1"
                onClick={() => handleCommentClick(post)}
              >
                <span  className=" text-xl">{post.comments.length}</span>
                <IoChatboxEllipsesOutline className="font-bold text-2xl" />

              </div>
            </div>
          </div>
        </div>
      ))}

      {showCommentModal && selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-red-600"
                onClick={() => setShowCommentModal(false)}
              >
                <BsX className="h-6 w-6" />
              </button>
            </div>
            <h2 className="font-semibold text-lg mb-4">Comments</h2>
            {selectedPost.comments.map((comment) => (
              <div
                key={comment._id}
                className="border-b border-gray-300 mb-4 pb-4"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={comment.userId?.photo || userImage}
                    alt="Profile"
                    className="h-12 w-12 rounded-full border-2 border-primary mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{comment.userId?.name}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="flex-grow">{comment.description}</p>
                  <button
                    className="text-red-600 hover:text-red-800 mt-2 flex items-center"
                    onClick={() =>
                      handleDeleteComment(selectedPost._id, comment._id)
                    }
                  >
                    <BsFillTrashFill className="h-5 w-5 mr-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="mx-1 px-2 py-1 border rounded bg-green-700 hover:bg-green-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastPost >= posts.length}
          className="mx-1 px-2 py-1 border rounded bg-green-700 hover:bg-green-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Post;

