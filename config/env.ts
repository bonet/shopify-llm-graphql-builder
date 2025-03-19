import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const MILVUS_URI = process.env.MILVUS_URI as string;
export const MILVUS_TOKEN = process.env.MILVUS_TOKEN as string;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
