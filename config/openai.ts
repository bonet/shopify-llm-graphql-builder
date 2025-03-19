import { OpenAIEmbeddings } from "@langchain/openai";
import { OPENAI_API_KEY } from "./env";

export const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: OPENAI_API_KEY,
});
