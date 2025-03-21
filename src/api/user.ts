import express, { Request, Response } from "express";
import { InferCreationAttributes, Op } from "sequelize";
import { User } from "../../models";
import { logger } from "../../config/logger";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { first_name, last_name, email  } = req.body;
  //console.log("req.body", req.body);

  if (!first_name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await User.create({
      firstName: first_name,
      lastName: last_name,
      email: email,
    } as InferCreationAttributes<User>);

    res.json({ status: "success", user_id: user.id });
  } catch (error) {
    logger.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
