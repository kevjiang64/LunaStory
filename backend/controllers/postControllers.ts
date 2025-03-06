import { Response, Request } from "express";
import PostModel from "../models/posts";
import { AuthenticatedRequest, Post } from "../models/interfaces";

export const sendPost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  try {
    const { title, imageOrVideo, caption, rating, comments } = req.body as Post;
    const creatorId = req.user._id;
    const newPost = new PostModel({
      title,
      imageOrVideo,
      caption,
      rating,
      comments,
      creatorId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Error in Send Post: " } + error.message);
  }
};
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error in Get Posts" });
  }
};
export const getPostByCreatorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.find({ creatorId: id });
    res.status(200).json(post);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Error in Get Post" } + error.message);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, imageOrVideo, caption, rating, comments } = req.body;
    const { id } = req.params;
    const updatedPost = await PostModel.findByIdAndUpdate(
      { _id: id },
      { title, imageOrVideo, caption, rating, comments },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Error in Update Post" } + error.message);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.findByIdAndDelete({ _id: id });
    res.status(200).json(deletedPost);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Error in Delete Post" } + error.message);
  }
};
