import { Response } from "express";

export function tryCatch(res: Response, func: Function) {
  try {
    func();
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}
