import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";

export function PostCard({ post }) {
  const { deletePost } = usePosts();
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
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-white text-sm mx-2"
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
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer ">
      <div className="px-6 py-7">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <button
            onClick={() => handleDelete(post._id)}
            className="bg-red-600 text-sm px-2 py-1 rounded-sm"
          >
            Delete
          </button>
        </div>
        <p className="">{post.description}</p>
      </div>
    </div>
  );
}
