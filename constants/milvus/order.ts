import { SearchResultData } from "@zilliz/milvus2-sdk-node";

export const defaultOrderData: SearchResultData[] = [
  {
    id: "1",
    score: 100,
    name: "id",
    type: "ID",
    description: "A globally-unique ID.",
    kind: "SCALAR",
    object: "Order",
  },
  {
    id: "2",
    score: 100,
    name: "name",
    type: "String",
    description:
      "The unique identifier for the order that appears on the order page in the Shopify admin and the Order status page. For example, #1001, EN1001, or 1001-A. This value isn't unique across multiple stores.",
    kind: "SCALAR",
    object: "Order",
  },
  {
    id: "3",
    score: 100,
    name: "email",
    type: "String",
    description: "The email address associated with the customer.",
    kind: "SCALAR",
    object: "Order",
  },
  {
    id: "4",
    score: 100,
    name: "phone",
    type: "String",
    description: "The phone number associated with the customer.",
    kind: "SCALAR",
    object: "Order",
  },
  {
    id: "5",
    score: 100,
    name: "processedAt",
    type: "DateTime",
    description:
      "The date and time when the order was processed. This date and time might not match the date and time when the order was created.",
    kind: "SCALAR",
    object: "Order",
  },
];
