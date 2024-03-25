import express from "express";
import cors from "cors";
import { RootRouter } from "./routes/index.js";

const server = express();

server.use(express.json(), cors());

server.use("/", RootRouter);

export { server };
