import { Response } from "express";

// reusable function to shorten try and catch
export function tryCatch(res: Response, func: Function) {
  try {
    func();
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}
