import { Router } from "express";
import { dbCategories, dbPosts } from "../DatabaseFunctions/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

// ALL METHODS RELATED TO /categories
router.get("/", (req, res) => {
  tryCatch(res, () =>
    dbCategories.getAllCategorise().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id", (req, res) => {
  tryCatch(res, () =>
    dbCategories.getCategory(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id/posts", (req, res) => {
  tryCatch(res, () =>
    dbPosts.getPostsByCategory(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

export { router as CategoryRouter };
