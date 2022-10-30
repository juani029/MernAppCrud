import { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from "../controllers/posts.controllers.js";

const router = Router();

router.get("/posts", getPosts);

router.post("/posts", createPost);

router.delete("/posts/:id", deletePost);

router.put("/posts/:id", updatePost);

router.get("/posts/:id", getPostById);

export default router;
