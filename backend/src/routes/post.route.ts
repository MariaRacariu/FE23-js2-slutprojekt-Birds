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
router.get("/:postId", (req, res) => {
  tryCatch(res, () =>
    dbPosts.getPost(req.params.postId).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// Delete a single post by its ID

// http://localhost:3000/posts/saasdasdasd/
router.delete("/:postId", (req, res) => {
  tryCatch(res, () =>
    dbPosts.deletePost(req.params.postId).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

router.post("/:postId/like", (req, res) => {
  tryCatch(res, () =>
    dbPosts
      .likePost(req.params.postId, req.body)
      .then((response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      })
  );
});

router.post("/:postId/dislike", (req, res) => {
  tryCatch(res, () =>
    dbPosts
      .dislikePost(req.params.postId, req.body)
      .then((response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      })
  );
});

// Get all comments for a single post
router.get("/:postId/comments", (req, res) => {
  tryCatch(res, () =>
    dbComments
      .getCommentsByPost(req.params.postId)
      .then((response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      })
  );
});

// Create Comment to a single post
router.post("/:postId/comments", (req, res) => {
  tryCatch(res, () =>
    dbComments
      .createComment(req.params.postId, req.body)
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

// Add a like to a single comment
router.post("/:postId/comments/:commentId/like", (req, res) => {
  tryCatch(res, () =>
    dbComments
      .likeComment(req.params.postId, req.params.commentId, req.body)
      .then((response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      })
  );
});

router.post("/:postId/comments/:commentId/dislike", (req, res) => {
  tryCatch(res, () =>
    dbComments
      .dislikeComment(req.params.postId, req.params.commentId, req.body)
      .then((response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      })
  );
});

export { router as PostRouter };
