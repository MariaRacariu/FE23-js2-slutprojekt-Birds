import { Router } from "express";
import { dbComments, dbPosts } from "../DatabaseFunctions/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();


// Get all the posts
router.get("/", (req, res) => {
  tryCatch(res, () =>
    dbPosts.getAllPosts().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Create a single post
router.post("/", (req, res) => {
  tryCatch(res, () =>
    dbPosts.createPost(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Get a single post by ID
router.get("/:id", (req, res) => {
  tryCatch(res, () =>
    dbPosts.getPost(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Delete a single post by its ID
router.delete("/:id", (req, res) => {
  tryCatch(res, () =>
    dbPosts.deletePost(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Get all comments for a single post
router.get("/:id/comments", (req, res) => {
  tryCatch(res, () =>
    dbComments.getCommentsByPost(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Create Comment to a single post
router.post("/:id/comments", (req, res) => {
  tryCatch(res, () =>
    dbComments
      .createComment(req.params.id, req.body)
      .then((response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      })
  );
});

// Delete a single comment by its ID
router.delete("/:postId/comments/:commentId", (req, res) => {
  tryCatch(res, () =>
    dbComments
      .deleteComment(req.params.postId, req.params.commentId)
      .then((response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      })
  );
});

export { router as PostRouter };
