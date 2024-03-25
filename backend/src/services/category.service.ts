import { DBResponse } from "../types/res.types.js";
import { readJsonFile } from "../util/db.util.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../util/response.util.js";

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
