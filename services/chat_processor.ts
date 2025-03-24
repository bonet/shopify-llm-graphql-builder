import { ChatMessage } from "../models";
import { shopifyGraphQlQueryListModel, shopifyGraphQlQueryModel } from "../config/openai";
import { recursiveSearchMilvus } from "./milvus";
import { defaultCustomerData } from "../constants/milvus/customer";
import { defaultOrderData } from "../constants/milvus/order";
import { customerQueryDynamic } from "../constants/prompts/customers";
import { orderQueryDynamic } from "../constants/prompts/orders";
import { fullfillmentOrderQueryDynamic } from "../constants/prompts/fulfillment_orders";
import { tier1SystemPrompt } from "../constants/prompts/tier_1";

export const callConversationTier1 = async (userQueries: ChatMessage[]) => {
  try {
    const response = await shopifyGraphQlQueryListModel.invoke([
      {
        role: "system",
        content: tier1SystemPrompt,
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
) => {

  console.log("In callConversationTier2");
  console.log("userQuery: ", userQuery);
  console.log("shopifyQuery: ", shopifyQuery);
  try {
    let systemPrompt = "";
    if (shopifyQuery === "customers") {
      const data = await recursiveSearchMilvus(
        "Object",
        userQuery,
        `object=='Customer'`
      );

      if (data.length > 0) {
        console.log(data);
        systemPrompt = customerQueryDynamic(data);
      } else {
        systemPrompt = customerQueryDynamic(defaultCustomerData);
      }
    } else if (shopifyQuery === "orders") {
      const data = await recursiveSearchMilvus(
        "Object",
        userQuery,
        `object=='Order'`
      );

      if (data.length > 0) {
        console.log(data);
        systemPrompt = orderQueryDynamic(data);
      } else {
        systemPrompt = orderQueryDynamic(defaultOrderData);
      }
    } else if (shopifyQuery === "fulfillmentOrders") {
      const data = await recursiveSearchMilvus(
        "Object",
        userQuery,
        `object=='FulfillmentOrder'`
      );

      console.log(data);
      systemPrompt = orderQueryDynamic(data);
    }

    const response = await shopifyGraphQlQueryModel.invoke([
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userQuery,
      },
    ]);

    return response;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
