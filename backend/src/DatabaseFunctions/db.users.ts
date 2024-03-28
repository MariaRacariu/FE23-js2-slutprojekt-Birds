import { DBResponse } from "../types/res.types.js";
import { readJsonFile, writeJsonFile } from "../util/db.util.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../util/response.util.js";

type CreateUserArgs = {
  username: string;
  password: string;
  name: string;
  profile_pic: string;
};

// All database functions related to /users/
export async function getUser(username: string): Promise<DBResponse> {
  const db = await readJsonFile();

  if (!db.users[username]) return createErrorResponse(404, "User not found");

  return createSuccessResponse({
    username,
    profile_pic: db.users[username].profile_pic,
  });
}

export async function getAllUsers(): Promise<DBResponse> {
  const db = await readJsonFile();

  const users = Object.keys(db.users).map((username) => ({
    username,
    profile_pic: db.users[username].profile_pic,
  }));

  return createSuccessResponse({
    users,
  });
}

export async function deleteUser(username: string): Promise<DBResponse> {
  const db = await readJsonFile();

  if (!db.users[username]) return createErrorResponse(404, "User not found");

  delete db.users[username];

  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      id: username,
    })
  );
}

export async function createUser(data: CreateUserArgs): Promise<DBResponse> {
  const { username, password, profile_pic } = data;
  const db = await readJsonFile();
  if (db.users[username])
    return createErrorResponse(401, "Username already exists");

  if (!username || !password || !profile_pic)
    return createErrorResponse(400, "Missing fields");

  const userData = {
    password,
    profile_pic,
  };

  db.users[username] = userData;
  return await writeJsonFile(db).then(() =>
    createSuccessResponse({
      username,
      profile_pic,
    })
  );
}
