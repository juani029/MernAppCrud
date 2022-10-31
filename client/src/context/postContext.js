import { useState, createContext, useContext, useEffect } from "react";
import {
  getPostsRequests,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest,
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
    try {
      const res = await createPostRequest(post);
      setPosts([...posts, res.data.newPost]);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data;
  };

  const updatePost = async (id, post) => {
    const res = await updatePostRequest(id, post);
    setPosts(posts.map((post) => (post._id === id ? res.data : post)));
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
        getPost,
        updatePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
