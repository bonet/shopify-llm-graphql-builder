import { SearchResultData } from "@zilliz/milvus2-sdk-node";

export const defaultCustomerData: SearchResultData[] = [
  {
    id: "1",
    score: 100,
    name: "id",
    type: "ID",
    description: "A globally-unique ID.",
    kind: "SCALAR",
    object: "Customer",
  },
  {
    id: "2",
    score: 100,
    name: "displayName",
    type: "String",
    description:
      "The full name of the customer, based on the values for first_name and last_name. If the first_name and last_name are not available, then this falls back to the customer's email address, and if that is not available, the customer's phone number.",
    kind: "SCALAR",
    object: "Customer",
  },
];
