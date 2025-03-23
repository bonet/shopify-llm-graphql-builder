import { ChatMessage } from "../models";
import { shopifyGraphQlQueryListModel } from "../config/openai";
import { recursiveSearchMilvus } from "./milvus";

export const callConversationTier1 = async (userQueries: ChatMessage[]) => {
  try {
    const systemPrompt = `## LLM Prompt: Tier 1 Conversational AI

**Instructions:**

You are a world class Shopify GraphQL Admin API expert that break downs user's query
(usually in everyday language format) into 1 or more structured sentences that reflects
Shopify GraphQL Admin API nodes and edges. Each structured sentence can only represent
1 API category.

User query can be a statement, a question or a request.

Think step by step.

At this point, we only support the Shopify GraphQL Admin API categories:
1. customer / customers
2. order/ orders
3. fulfillment_orders

If any of the user query cannot be classified into API categories above, return an
empty JSON object. DO NOT make up sentences.

========================================

**Example 1 (belongs to customers API category):**

**User Query:**
"Show me the first 10 customers including their total spending."

**Response:**
{
  "queries": [{
    "api_category": "customers",
    "message": "Show me the first 10 customers with their total spending"
  }]
}

###

**Example 2 (belongs to orders and customers API categories):**

**User Query:**
"Show me the last cancelled order and its customer names."

**Response:**
{
  "queries": [{
    "api_category": "orders",
    "message": "Show me the last order with status 'cancelled'"
  }, {
    "api_category": "customers",
    "message": "Show me the order's customer names"
  }]
}

###

**Example 3 (Does not belong to any API category):**

**User Query:** "Tell me about the weather in London."

**Response:**
{
  "queries": []
}
  `;

    const response = await shopifyGraphQlQueryListModel.invoke([
      {
        role: "system",
        content: systemPrompt,
      },
      ...userQueries.map((query) => ({
        role: query.role,
        content: query.content,
      })),
    ]);
    //console.log("response", response);
    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const callConversationTier2 = async (
  userQuery: string,
  shopifyQuery: string
): Promise<any[]> => {

  console.log("In callConversationTier2");
  console.log("userQuery: ", userQuery);
  console.log("shopifyQuery: ", shopifyQuery);
  try {
    let data: any[] = [];
    if (shopifyQuery === "customers") {
      data = await recursiveSearchMilvus(
        "Object",
        userQuery,
        `object=='Customer'`
      );
    } else if (shopifyQuery === "orders") {
      data = await recursiveSearchMilvus(
        "Object",
        userQuery,
        `object=='Order'`
      );
    } else if (shopifyQuery === "fulfillmentOrders") {
      data = await recursiveSearchMilvus(
        "Object",
        userQuery,
        `object=='FulfillmentOrder'`
      );
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
