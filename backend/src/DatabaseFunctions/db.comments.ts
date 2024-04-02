import { DBResponse } from "../types/res.types.js";
import { readJsonFile, writeJsonFile } from "../util/db.util.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../util/response.util.js";



// Handle comments in database
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
  postId: string,
  data: CreateCommentArgs
): Promise<DBResponse> {
  //if any of the below doesn't exists send error
  if (!data.author || !data.body)
    return createErrorResponse(404, "Missing comment information");

  const db = await readJsonFile();

  const posts = db.posts;
  if (posts.filter((post) => post.id === postId).length < 1)
    return createErrorResponse(404, "Post Not Found");

  const users = db.users;
  if (!users[data.author]) return createErrorResponse(404, "User Not Found");

  const id = crypto.randomUUID();

  if (!db.comments[postId]) db.comments[postId] = [];

  const commentData = {
    id,
    author: data.author,
    body: data.body,
    created_at: Date.now(),
  };

  db.comments[postId].push(commentData);

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

type LikeDislikeArgs = {
  author: string;
};

export async function likeComment(
  postId: string,
  commentId: string,
  body: LikeDislikeArgs
): Promise<DBResponse> {
  //if the request body doesn't have "author" send error
  if (!body.author)
    return createErrorResponse(404, "Missing author information");
  const author = body.author;
  const db = await readJsonFile();
  const users = db.users;
  //Check if author exists
  if (!users[author]) return createErrorResponse(404, "User doesn't exist");
  const posts = db.posts;
  //Check if post with postId exists
  if (posts.filter((post) => post.id === postId).length < 1)
    return createErrorResponse(404, "Post Not Found");
  const comments = db.comments;
  //Check if post has any comments
  if (!comments[postId])
    return createErrorResponse(400, "Post doesn't have any comments");
  //find the index of this particular comment
  const commentIndex = db.comments[postId].findIndex(
    (comment) => comment.id === commentId
  );
  //if particular comment exists
  if (commentIndex < 0) return createErrorResponse(404, "Comment not found");
  //if like array doesn't exists, create it.
  if (!comments[postId][commentIndex].hasOwnProperty("likes"))
    comments[postId][commentIndex].likes = [];
  //check if user already liked the comment
  if (comments[postId][commentIndex].likes.includes(author)) {
    return createErrorResponse(403, "User already liked the comment");
  } else {
    comments[postId][commentIndex].likes.push(author);
  }

  db.comments = comments;

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      like_count: comments[postId][commentIndex].likes.length,
    })
  );
}

export async function dislikeComment(
  postId: string,
  commentId: string,
  body: LikeDislikeArgs
): Promise<DBResponse> {
  //if the request body doesn't have "author" send error
  if (!body.author)
    return createErrorResponse(404, "Missing author information");
  const author = body.author;
  const db = await readJsonFile();
  const users = db.users;
  //Check if author exists
  if (!users[author]) return createErrorResponse(404, "User doesn't exist");
  const posts = db.posts;
  //Check if post with postId exists
  if (posts.filter((post) => post.id === postId).length < 1)
    return createErrorResponse(404, "Post Not Found");
  const comments = db.comments;
  //Check if post has any comments
  if (!comments[postId])
    return createErrorResponse(400, "Post doesn't have any comments");
  //find the index of this particular comment
  const commentIndex = db.comments[postId].findIndex(
    (comment) => comment.id === commentId
  );
  //Check if the comment exists at all
  if (commentIndex < 0) return createErrorResponse(404, "Comment not found");
  //Check if comment has any likes, if likes property doesn't exists, create it
  if (!comments[postId][commentIndex].hasOwnProperty("likes"))
    return createErrorResponse(404, "No likes on the comment");
  const likes = comments[postId][commentIndex].likes;
  //check if author already liked the comment
  if (comments[postId][commentIndex].likes.includes(author)) {
    comments[postId][commentIndex].likes = likes.filter(
      (user: string) => user !== author
    );
  } else {
    return createErrorResponse(403, "User didn't like the comment");
  }

  db.comments = comments;

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      like_count: comments[postId][commentIndex].likes.length,
    })
  );
}
