import { NextFunction, Request, Response } from "express";
import { DBResponse } from "../types/res.types.js";
import { readJsonFile, writeJsonFile } from "../util/db.util.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../util/response.util.js";

type CreatePostArgs = {
  author: string;
  title: string;
  body: string;
  category: string;
};

// Handle POSTS in database
export async function getAllPosts(): Promise<DBResponse> {
  const db = await readJsonFile();
  const posts = db.posts;
  return createSuccessResponse({
    posts,
  });
}

export async function getPostsByCategory(
  category: string
): Promise<DBResponse> {
  const db = await readJsonFile();
  const categories = db.categories;
  if (!categories[category])
    return createErrorResponse(404, "Category Not Found");

  const posts = db.posts.filter((post) => post.category === category);
  return createSuccessResponse({
    posts,
  });
}

export async function getPostsByUser(author: string): Promise<DBResponse> {
  const db = await readJsonFile();
  const users = db.users;
  if (!users[author]) return createErrorResponse(404, "User Not Found");

  const posts = db.posts.filter((post) => post.author === author);
  return createSuccessResponse({
    posts,
  });
}

export async function getPost(id: string): Promise<DBResponse> {
  const db = await readJsonFile();
  const posts = db.posts;
  const post = posts.find((post) => post.id === id);
  if (!post) return createErrorResponse(404, "Post Not Found");

  return createSuccessResponse({
    ...post,
  });
}

export async function deletePost(id: string): Promise<DBResponse> {
  const db = await readJsonFile();
  const posts = db.posts;
  const comments = db.comments;
  //Find all the posts that doesn't have the given id and put it back in the database
  db.posts = posts.filter((post) => post.id !== id);
  if (comments[id]) delete comments[id];

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      id,
    })
  );
}

export async function createPost(data: CreatePostArgs): Promise<DBResponse> {
  //if any of the below doesn't exists send error
  if (!data.author || !data.title || !data.body || !data.category)
    return createErrorResponse(404, "Missing post information");
  const db = await readJsonFile();

  //Get categories
  const categories = db.categories;
  //Check if category exists
  if (!categories[data.category])
    return createErrorResponse(404, "Category Doesn't exist");
  //Get users
  const users = db.users;
  //Check if users exists
  if (!users[data.author])
    return createErrorResponse(403, "Unauthorized user or user doesn't exist");
  //Get posts
  const posts = db.posts;
  //Generate unique id
  const id = crypto.randomUUID();
  //Create new post data
  const postData = {
    id,
    ...data,
    created_at: Date.now(),
  };
  //Add new post data to posts
  posts.push(postData);

  //Rewrite the database and send response
  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      ...postData,
    })
  );
}

type LikeDislikeArgs = {
  author: string;
};

export async function likePost(
  id: string,
  body: LikeDislikeArgs
): Promise<DBResponse> {
  if (!body.author)
    return createErrorResponse(404, "Author information missing");
  const author = body.author;
  const db = await readJsonFile();
  const posts = db.posts;
  //Get the index of the post
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex < 0) return createErrorResponse(404, "Post doesn't exist");
  if (!posts[postIndex].hasOwnProperty("likes")) posts[postIndex].likes = [];
  if (posts[postIndex].likes.includes(author)) {
    return createErrorResponse(404, "User already liked the post");
  } else {
    posts[postIndex].likes.push(author);
  }

  db.posts = posts;

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      like_count: posts[postIndex].likes.length,
    })
  );
}

export async function dislikePost(
  id: string,
  body: LikeDislikeArgs
): Promise<DBResponse> {
  if (!body.author)
    return createErrorResponse(404, "Author information missing");
  const author = body.author;
  const db = await readJsonFile();
  const posts = db.posts;
  //Get the index of the post
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex < 0) return createErrorResponse(404, "Post doesn't exist");
  if (!posts[postIndex].hasOwnProperty("likes")) posts[postIndex].likes = [];
  if (posts[postIndex].likes.includes(author)) {
    posts[postIndex].likes = posts[postIndex].likes.filter(
      (user) => user !== author
    );
  } else {
    return createErrorResponse(404, "User didn't like the post");
  }

  db.posts = posts;

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      like_count: posts[postIndex].likes.length,
    })
  );
}

export async function checkPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const db = await readJsonFile();
  const posts = db.posts;
  const postIndex = posts.findIndex((post) => post.id === req.params.postId);
  if (postIndex < 0) {
    res.status(404).send({ error: "Post doesn't exist middleware" });
  } else {
    next();
  }
}
