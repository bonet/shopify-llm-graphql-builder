import express, { Request, Response } from "express";
import { InferCreationAttributes, Op } from "sequelize";
import { callConversationTier1 } from "../../services/openai";
import { HumanMessage, UserChannel, ChatMessage } from "../../models";
import { logger } from "../../config/logger";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { user_channel_id, content } = req.body;
  console.log("req.body", req.body);
  if (!user_channel_id || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userChannel = await UserChannel.findByPk(user_channel_id);

    if (!userChannel) {
      return res.status(404).json({ error: "User channel not found" });
    }

    await HumanMessage.create({
      userChannelId: userChannel.id,
      content,
      createdAt: new Date(),
    } as InferCreationAttributes<ChatMessage>);

    let chatMessages = await ChatMessage.findAll({
      where: {
        userChannelId: user_channel_id,
      },
      order: [["createdAt", "ASC"]],
    });

    const botTier1Response = await callConversationTier1(chatMessages);

    res.json(botTier1Response.queries);
  } catch (error) {
    logger.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
