import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { MILVUS_TOKEN, MILVUS_URI } from "./env";

export const milvus = new MilvusClient({
  address: MILVUS_URI,
  token: MILVUS_TOKEN,
});
