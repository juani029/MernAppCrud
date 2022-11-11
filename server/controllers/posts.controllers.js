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
    // valido el req.files antes de hace el update para saber si quieren editar la imagen
    if (req.files?.image) {
      // console.log("soy req.files:", req.files.image.tempFilePath);
      // let image = null;
      // Encuentro al post, si tiene imagen la elimino de cloudinary
      const post = await Post.findById(id);
      !Object.entries(post.image).length &&
        (await deleteImage(post.image.public_id));
      // subo la imagen a cloudinary y me guardo la respuesta
      const result = await uploadImage(req.files.image.tempFilePath);
      // console.log("soy result:", result);
      await fs.remove(req.files.image.tempFilePath);
      // agrego la nueva imagen a el req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.send(updatedPost);
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
