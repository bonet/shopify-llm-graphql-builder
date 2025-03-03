import express, { Request, Response } from "express";

const router = express.Router();

router.get("/health-check", async (_: Request, res: Response) => {
  res.json({
    message: "Success",
  });
});

export default router;
