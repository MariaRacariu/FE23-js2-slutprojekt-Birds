import { Post, Comment } from "./db.types.js";

export type ResponseDataType =
  | LoginResponse
  | CategoryListResponse
  | CategoryResponse
  | PostListResponse
  | PostResponse
  | DeleteResponse
  | CommentListResponse
  | ErrorResponse;

export type DBResponse = {
  status: number;
  data: ResponseDataType;
};

export type LoginResponse = {
  username: string;
  profile_pic: string;
};

export type CategoryListResponse = {
  count: number;
  categories: { id: string; name: string }[];
};

export type CategoryResponse = {
  id: string;
  name: string;
  description: string;
};

export type PostListResponse = {
  posts: Post[];
};

export type CommentListResponse = {
  count: number;
  comments: Comment[];
};

export type PostResponse = Post;

export type DeleteResponse = { id: string };

export type ErrorResponse = {
  error: string;
};
