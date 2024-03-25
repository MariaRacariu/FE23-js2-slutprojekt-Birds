import express, { Response } from "express";
import cors from "cors";
import { createUser, loginUser } from "./src/modules/user.js";
import { DBResponse } from "./src/res.types.js";
import { getAllCategorise, getCategory } from "./src/modules/category.js";
import { tryCatch } from "./src/util.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getPostsByCategory,
  getPostsByUser,
} from "./src/modules/posts.js";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
} from "./src/modules/comments.js";

const app = express();

app.use(express.json(), cors());



app.post("/login", (req, res) => {
  tryCatch(res, () =>
    loginUser(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// CREATE USER
app.post("/users", (req, res) => {
  tryCatch(res, () =>
    createUser(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET CATEGORIES
app.get("/categories", (req, res) => {
  tryCatch(res, () =>
    getAllCategorise().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET CATEG0RY BY ID
app.get("/categories/:id", (req, res) => {
  tryCatch(res, () =>
    getCategory(req.params.id).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET POSTS
app.get("/posts", (req, res) => {
  tryCatch(res, () =>
    getAllPosts().then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET POSTS BY ITS CATEGORY
app.get("/categories/:categoryId/posts", (req, res) => {
  tryCatch(res, () =>
    getPostsByCategory(req.params.categoryId).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET USER'S POSTS
app.get("/users/:userId/posts", (req, res) => {
  tryCatch(res, () =>
    getPostsByUser(req.params.userId).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET POST
app.get("/posts/:postId", (req, res) => {
  tryCatch(res, () =>
    getPost(req.params.postId).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// DELETE POST
app.delete("/posts/:postId", (req, res) => {
  tryCatch(res, () =>
    deletePost(req.params.postId).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// CREATE POST
app.post("/posts", (req, res) => {
  tryCatch(res, () =>
    createPost(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// GET COMMENTS FOR THE POST THROUGH POST ID
app.get("/comments/:postid", (req, res) => {
  tryCatch(res, () =>
    getCommentsByPost(req.params.postid).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// CREATE COMMENT
app.post("/comments", (req, res) => {
  tryCatch(res, () =>
    createComment(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
  );
});

// DELETE COMMENT
app.delete("/posts/:postId/comments/:commentId", (req, res) => {
  tryCatch(res, () =>
    deleteComment(req.params.postId, req.params.commentId).then(
      (response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      }
    )
  );
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000");
});
