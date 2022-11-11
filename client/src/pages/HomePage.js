/* eslint-disable react-hooks/exhaustive-deps */
import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";

export function HomePage() {
  const { posts } = usePosts();
  // funcion para renderizar los posts, primero me fijo si no tengo posts, si es asi, renderizo un not found, y si tengo, mapeo el arreglo y renderizo cada card utilizando grid
  const renderPost = () => {
    if (posts.length === 0)
      return (
        <div className="flex flex-col  justify-center items-center text-white">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-2xl text-white">The are not posts</h1>
        </div>
      );

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  };

  return (
    // renderizo el main donde esta la cantidad de post creados y el boton para crear, abajo ejecuto la funcion que renderiza el notFound o los posts
    <main>
      <header className="flex justify-between items-center my-4">
        <h1 className="text-2xl text-gray-300 font-bold">
          Posts ({posts.length})
        </h1>
        <Link
          to="/new"
          className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Create Post
        </Link>
      </header>

      {renderPost()}
    </main>
  );
}
