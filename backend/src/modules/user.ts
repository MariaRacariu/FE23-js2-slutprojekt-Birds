import { DBResponse } from "../res.types.js";
import { readJsonFile, writeJsonFile } from "../util.js";

export async function loginUser(data: {
  username: string;
  password: string;
}): Promise<DBResponse> {
  const db = await readJsonFile();
  const { username, password } = data;

  if (!db.users[username]) {
    return {
      status: 404,
      data: { error: "User not found" },
    };
  }

  if (db.users[username].password === password) {
    return {
      status: 200,
      data: {
        username,
        name: db.users[username].name,
        profile_pic: db.users[username].profile_pic,
      },
    };
  } else {
    return {
      status: 403,
      data: { error: "Wrong password" },
    };
  }
}

export async function createUser(
  username: string,
  password: string,
  name: string,
  profile_pic: string
): Promise<DBResponse> {
  const db = await readJsonFile();
  try {
    if (db.users[username]) {
      return {
        status: 401,
        data: {
          error: "Username already exists",
        },
      };
    } else {
      const userData = {
        name,
        password,
        profile_pic,
      };

      db.users[username] = userData;
      return await writeJsonFile(db).then(() => ({
        status: 200,
        data: { username, name, profile_pic },
      }));
    }
  } catch (err) {
    return {
      status: 404,
      data: {
        error: "Something went wrong",
      },
    };
  }
}
