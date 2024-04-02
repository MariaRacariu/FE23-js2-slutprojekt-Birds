import { Router } from "express";
import { dbCategories, dbPosts } from "../DatabaseFunctions/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

// GET ALL THE CATEGORIES
router.get("/", (req, res) => {
  tryCatch(res, () =>
    dbCategories.getAllCategorise().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET A SINGLE CATEGORY BY ID
router.get("/:id", (req, res) => {
  tryCatch(res, () =>
    dbCategories.getCategory(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET ALL POSTS OF A SINGLE CATEGORY
router.get("/:id/posts", (req, res) => {
  tryCatch(res, () =>
    dbPosts.getPostsByCategory(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// CREATE A SINGLE CATEGORY
router.post("/", (req, res) => {
  tryCatch(res, () =>
    dbCategories.createCategory(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// DELETE SINGLE CATEGORY WITH ITS ID
router.delete("/:id", (req, res) => {
  tryCatch(res, () =>
    dbCategories.deleteCategory(req.body.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

export { router as CategoryRouter };
