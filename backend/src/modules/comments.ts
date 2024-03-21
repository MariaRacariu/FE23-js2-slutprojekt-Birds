import { DBResponse } from "../res.types.js";

import {
  createErrorResponse,
  createSuccessResponse,
  readJsonFile,
  writeJsonFile,
} from "../util.js";

export async function getCommentsByPost(postId: string): Promise<DBResponse> {
  const db = await readJsonFile();
  const posts = db.posts;
  if (posts.filter((post) => post.id === postId).length < 1)
    return createErrorResponse(404, "Post Not Found");

  const comments = db.comments;

  if (!comments[postId])
    return createSuccessResponse({
      count: 0,
      comments: [],
    });

  return createSuccessResponse({
    count: comments[postId].length,
    comments: comments[postId],
  });
}

type CreateCommentArgs = {
  author: string;
  postId: string;
  body: string;
};

export async function createComment(
  data: CreateCommentArgs
): Promise<DBResponse> {
  //if any of the below doesn't exists send error
  if (!data.author || !data.body || !data.body || !data.postId)
    return createErrorResponse(404, "Missing comment information");

  const db = await readJsonFile();

  const posts = db.posts;
  if (posts.filter((post) => post.id === data.postId).length < 1)
    return createErrorResponse(404, "Post Not Found");

  const users = db.users;
  if (!users[data.author]) return createErrorResponse(404, "User Not Found");

  const id = crypto.randomUUID();

  if (!db.comments[data.postId]) db.comments[data.postId] = [];

  const commentData = {
    id,
    author: data.author,
    body: data.body,
    created_at: Date.now(),
  };

  db.comments[data.postId].push(commentData);

  //Rewrite the database and send response
  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      ...commentData,
    })
  );
}

export async function deleteComment(
  postId: string,
  commentId: string
): Promise<DBResponse> {
  //if any of the below doesn't exists send error

  const db = await readJsonFile();

  const posts = db.posts;
  if (posts.filter((post) => post.id === postId).length < 1)
    return createErrorResponse(404, "Post Not Found");

  const comments = db.comments;
  if (!comments[postId])
    return createErrorResponse(400, "Post doesn't have any comments");

  db.comments[postId] = db.comments[postId].filter(
    (comment) => comment.id !== commentId
  );

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      id: commentId,
    })
  );
}
