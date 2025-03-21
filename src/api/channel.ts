import express, { Request, Response } from "express";
import { InferCreationAttributes, Op } from "sequelize";
import { Channel } from "../../models";
import { logger } from "../../config/logger";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { name } = req.body;
  // console.log("req.body", req.body);

  if (!name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const channel = await Channel.create({
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as InferCreationAttributes<Channel>);

    res.json({ status: "success", channel_id: channel.id });
  } catch (error) {
    logger.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
