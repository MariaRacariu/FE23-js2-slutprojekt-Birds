import { Router } from "express";
import { dbPosts, dbUsers } from "../DatabaseFunctions/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

// Get all the users info
router.get("/", (req, res) => {
  tryCatch(res, () =>
    dbUsers.getAllUsers().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Create a single user
router.post("/", (req, res) => {
  ///users/
  tryCatch(res, () =>
    dbUsers.createUser(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Get a single user by id
router.get("/:id", (req, res) => {
  // /users/:id
  tryCatch(res, () =>
    dbUsers.getUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Delete a single user by its id
router.delete("/:id", (req, res) => {
  // /users/:id
  tryCatch(res, () =>
    dbUsers.deleteUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Get all the posts of a single USER by its ID
router.get("/:id/posts", (req, res) => {
  // /users/:id/posts
  tryCatch(res, () =>
    dbPosts.getPostsByUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

export { router as UserRouter };
