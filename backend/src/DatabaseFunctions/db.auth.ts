import { DBResponse } from "../types/res.types.js";
import { readJsonFile } from "../util/db.util.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../util/response.util.js";

type LoginUserArgs = {
  username: string;
  password: string;
};

// Handle database LOGIN
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
