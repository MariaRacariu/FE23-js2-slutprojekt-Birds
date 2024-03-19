// REDDIT => FAKKIT (FAKE IT)

import express from "express";
import cors from "cors";
import { createUser, loginUser } from "./src/modules/user.js";
import { DBResponse } from "./src/res.types.js";

const app = express();

app.use(express.json(), cors());

app.post("/login", (req, res) => {
  try {
    loginUser(req.body).then((response: DBResponse) => {
      const { status, data } = response;
      res.status(status).send(data);
    });
  } catch (error) {
    res.status(404).send({ error: "Something went wrong" });
  }
});

app.post("/users", (req, res) => {
  try {
    // req.body.username and req.body.password
    const {
      username,
      password,
      name,
      profile_pic,
    }: {
      username: string;
      password: string;
      name: string;
      profile_pic: string;
    } = req.body;

    createUser(username, password, name, profile_pic).then(
      (response: DBResponse) => {
        const { status, data } = response;
        res.status(status).send(data);
      }
    );
  } catch (error) {
    res.status(404).send({ error: "Something went wrong" });
  }
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000");
});
