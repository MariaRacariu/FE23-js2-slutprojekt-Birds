import { Router } from "express";
import { CategoryServices, PostServices } from "../services/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

router.get("/", (req, res) => {
  tryCatch(res, () =>
    CategoryServices.getAllCategorise().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id", (req, res) => {
  tryCatch(res, () =>
    CategoryServices.getCategory(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id/posts", (req, res) => {
  tryCatch(res, () =>
    PostServices.getPostsByCategory(req.params.id).then(
      (response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      }
    )
  );
});

export { router as CategoryRouter };
