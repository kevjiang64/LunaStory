import { Router } from "express";
import {
  sendPost,
  getPosts,
  getPostByCreatorId,
  updatePost,
  deletePost,
} from "../controllers/postControllers";
import { checkAuthenticated } from "../middleware/authMiddleware";

const postRoutes = Router();

postRoutes.post("/", checkAuthenticated, sendPost);
postRoutes.get("/", checkAuthenticated, getPosts);
postRoutes.get("/:id", checkAuthenticated, getPostByCreatorId);
postRoutes.put("/:id", checkAuthenticated, updatePost);
postRoutes.delete("/:id", checkAuthenticated, deletePost);

export default postRoutes;
