import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Server is running"
  });
});

export default router;
