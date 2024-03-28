import { randomUUID } from "crypto";
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

// All functions related to /categories/

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

export async function createCategory(
  data: CreateCategoryArg
): Promise<DBResponse> {
  const { id, name, description } = data;
  const db = await readJsonFile();

  if (db.categories[id])
    return createErrorResponse(401, "category already exists");

  const newCategoryData = {
    id,
    name,
    description,
  };

  db.categories[id] = newCategoryData;

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      ...newCategoryData,
    })
  );
}

export async function deleteCategory(id: string): Promise<DBResponse> {
  const db = await readJsonFile();

  delete db.categories[id];
  await writeJsonFile(db);

  if (!db.users[id]) return createErrorResponse(404, "Category not found");

  console.log(db);
  return createSuccessResponse({
    id: id,
  });
}

// let id = randomUUID();
// const categories = (db.categories[id] = {
//   name: data.name,
//   description: data.description,
// });

// // if (id === categories.id) createErrorResponse(401, "Category already exists");

// if (!categories.name || !categories.description)
