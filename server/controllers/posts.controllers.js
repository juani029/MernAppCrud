import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, description, image });
    // console.log("soy post", newPost);
    await newPost.save();
    return res.json({ created: true, newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await Post.findById(id);
    let imageBody = null;
    // valido el req.files antes de hace el update para saber si quieren editar la imagen
    if (req.files?.image) {
      // Si el post contiene imagen la elimino de cloudinary
      !Object.entries(post.image).length &&
        (await deleteImage(post.image.public_id));
      // subo la imagen a cloudinary y me guardo la respuesta
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      // agrego la nueva imagen a el req.body
      imageBody = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      post.image = imageBody;
      post.title = title;
      post.description = description;
      await post.save();
      return res.json({ msg: "post updated", post });
    }
    post.title = title;
    post.description = description;
    await post.save();
    return res.json({ msg: "post updated", post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.sendStatus(404);
    }
    if (deletedPost.image.public_id) {
      await deleteImage(deletedPost.image.public_id);
      // console.log("Image from db deleted");
    }
    return res.status(204).json({ deleted: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.sendStatus(404);
    }
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
