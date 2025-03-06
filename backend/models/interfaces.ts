import { Request } from "express";

export interface Post {
  title: string;
  imageOrVideo: string;
  caption: string;
  rating: number;
  comments: string[];
  creatorId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: any;
  cookies: {
    jwt: string;
  };
}
