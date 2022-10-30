import { useState, createContext, useContext, useEffect } from "react";
import {
  getPostsRequests,
  createPostRequest,
  deletePostRequest,
} from "../api/posts";
//creo el contexto
const postContext = createContext();

// creo un hook que ejecute el useContext el cual devuelve el state posts y la funcion setPosts y lo exporto para que pueda ser utilizado en cualquier componente
export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequests();
    setPosts(res.data);
  };

  const createPost = async (post) => {
    const res = await createPostRequest(post);
    setPosts([...posts, res.data.newPost]);
  };

  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    // le paso las funciones o valores que quiero compartir a los hijos mediante el context
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
