import { Router } from "express";
import { PostServices, UserServices } from "../services/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

// /users is same as /users/
router.get("/", (req, res) => {
  // /users/
  tryCatch(res, () =>
    UserServices.getAllUsers().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.post("/", (req, res) => {
  ///users/
  tryCatch(res, () =>
    UserServices.createUser(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id", (req, res) => {
  // /users/:id
  tryCatch(res, () =>
    UserServices.getUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.delete("/:id", (req, res) => {
  // /users/:id
  tryCatch(res, () =>
    UserServices.deleteUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id/posts", (req, res) => {
  // /users/:id/posts
  tryCatch(res, () =>
    PostServices.getPostsByUser(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

export { router as UserRouter };
