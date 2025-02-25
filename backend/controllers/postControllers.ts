import { Request, Response } from "express";
import PostModel from "../models/posts";

interface Post {
  creatorId: string;
  title: string;
  image: string;
  video: string;
  caption: string;
  rating: number;
  comments: string[];
}

const sendPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { creatorId, title, image, video, caption, rating, comments } =
      req.body as Post;
    const newPost = new PostModel({
      creatorId,
      title,
      image,
      video,
      caption,
      rating,
      comments,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error in Send Post" });
  }
};
const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error in Get Posts" });
  }
};
const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const post = await PostModel.find((post: Post) => post.creatorId === id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error in Get Post" });
  }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const { creatorId, title, image, video, caption, rating, comments } = req.body as Post;
        const post = await PostModel.findById(creatorId);
        if (post) {
            post.title = title;
            post.image = image;
            post.video = video;
            post.caption = caption;
            post.rating = rating;
            post.comments = comments;
            const updatedPost = await post.save();
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }
};

const deletePost = async (req: Request, res: Response) => {};
