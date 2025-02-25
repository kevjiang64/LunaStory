import { Router } from "express";
import Post from "../models/posts";

const postRoutes = Router();

postRoutes.post("/", async (req, res) => {
  const testPost = new Post({
    title: "Test Post",
    image: "https://www.google.com",
    video: "https://www.youtube.com",
    caption: "This is a test post",
  });

  await testPost.save();
  res.send(testPost);
});

export default postRoutes;
