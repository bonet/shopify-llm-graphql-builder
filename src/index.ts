import express from "express";
import cors from "cors";
import healthCheckRouter from "./api/health_check";
import { logger } from "../config/logger";
import { PORT } from "../config/env";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthCheckRouter);

app.listen(PORT, async () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
