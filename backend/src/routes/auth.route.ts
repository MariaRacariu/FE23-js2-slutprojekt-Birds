import { Router } from "express";
import { AuthServices } from "../services/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

// LOGIN WITH NO AUTHENTICATION!

router.post("/login", (req, res) => {
  tryCatch(res, () =>
    AuthServices.loginUser(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

export { router as AuthRouter };
