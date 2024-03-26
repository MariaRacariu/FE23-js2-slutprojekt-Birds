import { promises } from 'dns';
import {PostListResponse, ResponseDataType, CategoryListResponse,CategoryResponse, CommentListResponse, LoginResponse} from '../types/res.types'

export async function fetchFromDatabase(endpoint: string, method: string): Promise<ResponseDataType> {
  const res = await fetch(`http://localhost:3000/${endpoint}`, {
    method: method,
    headers: {
      "Content-type": "application/json"
    }
  });
  let responseData = await res.json() as Promise<ResponseDataType>;
  return responseData;
}

export async function getCategories(): Promise<CategoryListResponse> {
  const resultFromDatabase = fetchFromDatabase('categories', 'get') as Promise<CategoryListResponse>;
  return resultFromDatabase; 
}

export async function getCategory(id: string): Promise<CategoryResponse>{
  const resultFromDatabase = fetchFromDatabase(`categories/${id}`, 'get') as Promise<CategoryResponse>;
  return resultFromDatabase; 
}

export async function getPostsByCategory(id: string): Promise<PostListResponse>{
  const resultFromDatabase = fetchFromDatabase(`categories/${id}/posts`, 'get') as Promise<PostListResponse>;
  return resultFromDatabase;
}

export async function getLatestPosts(): Promise<PostListResponse>{
  const resultFromDatabase = fetchFromDatabase(`posts`, 'get') as Promise<PostListResponse>;
  return resultFromDatabase;
}

export async function getAllCommentsByPost(id: string): Promise<CommentListResponse>{
  const resultFromDatabase = fetchFromDatabase (`posts/${id}/comments`, 'get') as Promise<CommentListResponse>;
  return resultFromDatabase;
}

export async function getUser(id: string): Promise<LoginResponse>{
  const resultFromDatabase = fetchFromDatabase (`users/${id}`, "get") as Promise<LoginResponse> 
  return resultFromDatabase;
}