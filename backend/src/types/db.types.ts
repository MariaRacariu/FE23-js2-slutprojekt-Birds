// all types for database

export type Database = {
  users: { [key: string]: User };
  posts: Post[];
  categories: { [key: string]: Category };
  comments: { [key: string]: Comment[] };
};
export type User = {
  password: string;
  profile_pic: string;
};
export type Post = {
  title: string;
  author: string;
  id: string;
  body: string;
  category: string;
  created_at: number;
  likes?: string[];
};
export type Category = { name: string; description: string };
export type Comment = {
  id: string;
  body: string;
  author: string;
  created_at: number;
  likes?: string[];
};


