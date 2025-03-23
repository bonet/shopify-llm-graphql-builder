import express, { Request, Response } from "express";
import { UserChannel } from "../../models";
import { logger } from "../../config/logger";
import { chatApp } from "../../services/langgraph";
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

    const config = { configurable: { userChannel: userChannel } };
    const chatResult = await chatApp.invoke({
      inputMessage: content
    }, config);

    res.json(chatResult.messages[chatResult.messages.length - 1]);
  } catch (error) {
    logger.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
