import { CreateCommentArgs, DatabaseApiBody } from '../types/db.types';
import { PostListResponse, ResponseDataType, CategoryListResponse, CategoryResponse, CommentListResponse, UserListResponse, UserResponse } from '../types/res.types'

export async function doFetchToDatabase(endpoint: string, method: string, body?: DatabaseApiBody): Promise<ResponseDataType> {
  const res = await fetch(`http://localhost:3000${endpoint}`, {
    method: method,
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
  let responseData = await res.json() as Promise<ResponseDataType>;
  return responseData;
}

export async function getCategories(): Promise<CategoryListResponse> {
  const resultFromDatabase = doFetchToDatabase('/categories', 'get') as Promise<CategoryListResponse>;
  return resultFromDatabase;
}

export async function getCategory(id: string): Promise<CategoryResponse> {
  const resultFromDatabase = doFetchToDatabase(`/categories/${id}`, 'get') as Promise<CategoryResponse>;
  return resultFromDatabase;
}

export async function getPostsByCategory(id: string): Promise<PostListResponse> {
  const resultFromDatabase = doFetchToDatabase(`/categories/${id}/posts`, 'get') as Promise<PostListResponse>;
  return resultFromDatabase;
}

export async function getLatestPosts(): Promise<PostListResponse> {
  const resultFromDatabase = doFetchToDatabase(`/posts`, 'get') as Promise<PostListResponse>;
  return resultFromDatabase;
}

export async function getAllCommentsByPost(id: string): Promise<CommentListResponse> {
  const resultFromDatabase = doFetchToDatabase(`/posts/${id}/comments`, 'get') as Promise<CommentListResponse>;
  return resultFromDatabase;
}

export async function getUser(id: string): Promise<UserResponse> {
  const resultFromDatabase = doFetchToDatabase(`/users/${id}`, 'get') as Promise<UserResponse>
  return resultFromDatabase;
}

export async function getUsers(): Promise<UserListResponse> {
  const resultFromDatabase = doFetchToDatabase(`/users`, 'get') as Promise<UserListResponse>
  return resultFromDatabase;
}

export async function getUsersPosts(id: string): Promise<PostListResponse> {
  const resultFromDatabase = doFetchToDatabase(`/users/${id}/posts`, 'get') as Promise<PostListResponse>;
  return resultFromDatabase;
}

//post api call functions

export async function postComment(postId: string, author: string, comment: string): Promise<ResponseDataType> {
  const body: CreateCommentArgs = {
    author: author,
    postId: postId,
    body: comment
  }
  const resultFromDatabase = doFetchToDatabase(`/posts/${postId}/comments`, 'post', body) as Promise<ResponseDataType>;
  return resultFromDatabase
}

//delete api call functions
export async function deletePost(postId: string): Promise<void> {
  const resultFromDatabase = doFetchToDatabase(`/posts/${postId}`, 'delete') as Promise<ResponseDataType>;
}
export async function deleteComment(postId: string, commentId: string): Promise<void> {
  const resultFromDatabase = doFetchToDatabase(`/posts/${postId}/comments/${commentId}`, 'delete') as Promise<ResponseDataType>;
}
