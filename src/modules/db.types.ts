export type Database = {
  users: { [key: string]: User };
};

export type User = {
  name: string;
  password: string;
  profile_pic: string;
};

export type Post = {
  title: string;
  author: string;
  id: string;
  body: string;
  category: string;
};

export type Category = { name: string; description: string };

export type Comment = {
  id: string;
  body: string;
  author: string;
};
