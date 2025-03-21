import express from "express";
import cors from "cors";
import { logger } from "../config/logger";
import { PORT } from "../config/env";
import healthCheckRouter from "./api/health_check";
import graphqlRouter from "./api/graphql";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthCheckRouter);
app.use("/graphql", graphqlRouter);

app.listen(PORT, async () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
