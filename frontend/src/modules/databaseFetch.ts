import { promises } from 'dns';
import {PostListResponse, ResponseDataType, CategoryListResponse,CategoryResponse, CommentListResponse, UserListResponse, UserResponse} from '../types/res.types'

export async function fetchFromDatabase(endpoint: string): Promise<ResponseDataType> {
  const res = await fetch(`http://localhost:3000/${endpoint}`, {
    method: 'get',
    headers: {
      "Content-type": "application/json"
    }
  });
  let responseData = await res.json() as Promise<ResponseDataType>;
  return responseData;
}

export async function getCategories(): Promise<CategoryListResponse> {
  const resultFromDatabase = fetchFromDatabase('categories') as Promise<CategoryListResponse>;
  return resultFromDatabase; 
}

export async function getCategory(id: string): Promise<CategoryResponse>{
  const resultFromDatabase = fetchFromDatabase(`categories/${id}`) as Promise<CategoryResponse>;
  return resultFromDatabase; 
}

export async function getPostsByCategory(id: string): Promise<PostListResponse>{
  const resultFromDatabase = fetchFromDatabase(`categories/${id}/posts`) as Promise<PostListResponse>;
  return resultFromDatabase;
}

export async function getLatestPosts(): Promise<PostListResponse>{
  const resultFromDatabase = fetchFromDatabase(`posts`) as Promise<PostListResponse>;
  return resultFromDatabase;
}

export async function getAllCommentsByPost(id: string): Promise<CommentListResponse>{
  const resultFromDatabase = fetchFromDatabase(`posts/${id}/comments`) as Promise<CommentListResponse>;
  return resultFromDatabase;
}

export async function getUser(id: string): Promise<UserResponse>{
  const resultFromDatabase = fetchFromDatabase(`users/${id}`) as Promise<UserResponse> 
  return resultFromDatabase;
}

export async function getUsers(): Promise<UserListResponse>{
  const resultFromDatabase = fetchFromDatabase(`users`) as Promise<UserListResponse> 
  return resultFromDatabase;
}
