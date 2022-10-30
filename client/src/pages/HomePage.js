/* eslint-disable react-hooks/exhaustive-deps */
import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";

export function HomePage() {
  const { posts } = usePosts();
  // si no tengo posts en mi arreglo retorno lo siguiente
  if (posts.length === 0) {
    return (
      <div className="flex flex-col  justify-center items-center text-white">
        <VscEmptyWindow className="w-48 h-48" />
        <h1 className="text-2xl">The are not posts</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center text-white">
      <Link to="/new">Crear Post</Link>
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostCard post={post} key={post._id}></PostCard>
        ))}
      </div>
    </div>
  );
}
