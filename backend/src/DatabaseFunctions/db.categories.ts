import { DBResponse } from "../types/res.types.js";
import { readJsonFile, writeJsonFile } from "../util/db.util.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../util/response.util.js";

type CreateCategoryArg = {
  id: string;
  name: string;
  description: string;
};

// Handle categories in database

export async function getAllCategorise(): Promise<DBResponse> {
  const db = await readJsonFile();
  const categories = db.categories;

  const categoryIds = Object.keys(categories);

  //[{id:"anime",name:"Anime"},"meme","datorit"]
  return createSuccessResponse({
    count: categoryIds.length,
    categories: categoryIds.map((id) => ({ id, name: categories[id].name })),
  });
}

export async function getCategory(id: string): Promise<DBResponse> {
  const db = await readJsonFile();
  const categories = db.categories;
  if (!categories[id]) return createErrorResponse(404, "Category Not Found");

  const category = categories[id];
  return createSuccessResponse({
    id: id,
    ...category,
  });
}

//thanks to chatgpt
function isValidString(str: string) {
  // Check if the string contains only letters from a to z
  return /^[a-z]+$/.test(str.toLowerCase());
}

export async function createCategory(
  data: CreateCategoryArg
): Promise<DBResponse> {
  const { id, name, description } = data;
  if (!isValidString(id))
    return createErrorResponse(
      401,
      "Category id is invalid, only use charachters from a-z"
    );

  const db = await readJsonFile();

  if (db.categories[id])
    return createErrorResponse(401, "category already exists");

  const newCategoryData = {
    id,
    name,
    description,
  };

  db.categories[id] = { name, description };

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      ...newCategoryData,
    })
  );
}

export async function deleteCategory(id: string): Promise<DBResponse> {
  const db = await readJsonFile();
  if (!db.categories[id]) return createErrorResponse(404, "Category not found");

  const posts = db.posts.filter((post) => post.category !== id);
  db.posts = posts;
  delete db.categories[id];

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      id,
    })
  );
}
