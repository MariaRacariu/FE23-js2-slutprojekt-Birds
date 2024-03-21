import { DBResponse } from "../res.types.js";
import {
  createErrorResponse,
  createSuccessResponse,
  readJsonFile,
  writeJsonFile,
} from "../util.js";

type LoginUserArgs = {
  username: string;
  password: string;
};

type CreateUserArgs = {
  username: string;
  password: string;
  name: string;
  profile_pic: string;
};

export async function loginUser(data: LoginUserArgs): Promise<DBResponse> {
  const db = await readJsonFile();
  const { username, password } = data;

  if (!db.users[username]) return createErrorResponse(404, "User not found");

  if (db.users[username].password === password) {
    return createSuccessResponse({
      username,
      profile_pic: db.users[username].profile_pic,
    });
  } else {
    return createErrorResponse(403, "Wrong Password");
  }
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
