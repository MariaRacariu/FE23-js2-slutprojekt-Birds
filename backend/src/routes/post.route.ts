import { Router } from "express";
import { CommentServices, PostServices } from "../services/index.js";
import { tryCatch } from "../util/tryCatch.js";
import { DBResponse } from "../types/res.types.js";

const router = Router();

// ALL METHODS RELATED TO /posts
router.get("/", (req, res) => {
  tryCatch(res, () =>
    PostServices.getAllPosts().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.post("/", (req, res) => {
  tryCatch(res, () =>
    PostServices.createPost(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.get("/:id", (req, res) => {
  tryCatch(res, () =>
    PostServices.getPost(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.delete("/:id", (req, res) => {
  tryCatch(res, () =>
    PostServices.deletePost(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Get all comments for a single post
router.get("/:id/comments", (req, res) => {
  tryCatch(res, () =>
    CommentServices.getCommentsByPost(req.params.id).then(
      (response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      }
    )
  );
});

// Create Comment to a single post
router.post("/:id/comments", (req, res) => {
  tryCatch(res, () =>
    CommentServices.createComment(req.params.id, req.body).then(
      (response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      }
    )
  );
});

router.delete("/:postId/comments/:commentId", (req, res) => {
  tryCatch(res, () =>
    CommentServices.deleteComment(req.params.postId, req.params.commentId).then(
      (response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      }
    )
  );
});

export { router as PostRouter };
