import { Router } from "express";
import { dbPosts, dbUsers } from "../DatabaseFunctions/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

// ALL METHODS RELATED TO /users
router.get("/", (req, res) => {
  tryCatch(res, () =>
    dbUsers.getAllUsers().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.post("/", (req, res) => {
  ///users/
  tryCatch(res, () =>
    dbUsers.createUser(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id", (req, res) => {
  // /users/:id
  tryCatch(res, () =>
    dbUsers.getUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.delete("/:id", (req, res) => {
  // /users/:id
  tryCatch(res, () =>
    dbUsers.deleteUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

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
