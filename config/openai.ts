import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import OpenAI from "openai";
import { z } from "zod";
import { OPENAI_API_KEY } from "./env";

export const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: OPENAI_API_KEY,
});

export const openAIClient = () => {
  return new OpenAI({
    apiKey: OPENAI_API_KEY,
  })
};

const config = {
  model: "gpt-4o-mini",
  apiKey: OPENAI_API_KEY,
  temperature: 0.7,
};

export const model = new ChatOpenAI(config);

const shopifyGraphQlQueryListSchema = z.object({
  queries: z
    .array(z.object({ api_category: z.string(), message: z.string() }))
    .describe("List of queries, separated by API category, for the Shopify Admin API"),
});

export const shopifyGraphQlQueryListModel = new ChatOpenAI(
  config
).withStructuredOutput(shopifyGraphQlQueryListSchema, {
  name: "extract_queries",
  strict: true,
});
