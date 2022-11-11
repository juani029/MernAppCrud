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
  if (!context) throw new Error("Post Provider is missing");
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // genero un efecto para cargar los posts y que funcione como un proveedor para todos los los componentes hijos, asi cualquier pagina que este envuelta por el provider podra acceder a estos
  useEffect(() => {
    (async () => {
      const res = await getPostsRequests();
      setPosts(res.data);
    })();
  }, []);

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
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {}
  };

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post);
      // console.log(res);
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // le paso las funciones o valores que quiero compartir a los hijos mediante el context
    <postContext.Provider
      value={{
        posts,
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
