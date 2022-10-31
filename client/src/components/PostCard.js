import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white mb-2">
            Do yo want to delete? <strong>{id}</strong>
          </p>
          <div>
            <button
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
              }}
              className="bg-red-400 hover:bg-red-500 px-3 py-2 text-white text-sm mx-2 rounded-sm"
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm text-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: "400",
        style: {
          background: "#27272A",
        },
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/posts/${post._id}`);
      }}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <button
            className="bg-red-600 text-sm hover:bg-red-500 px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-400">{post.description}</p>
      </div>
      {post.image && <img alt={post.title} src={post.image.url} />}
    </div>
  );
}
