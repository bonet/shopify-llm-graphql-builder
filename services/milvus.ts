import { milvus } from "../config/milvus";
import { embeddings } from "../config/openai";

export const searchMilvus = async (
  collectionName: string,
  query: string,
  filter = ""
) => {
  const vector = await embeddings.embedQuery(query);

  try {
    const search = await milvus.search({
      vector: vector,
      collection_name: collectionName,
      output_fields: ["object", "name", "kind"],
      filter: filter,
    });
    const res = search.results.filter((result) => result.score > 0.7);
    if (res.length > 0) {
      return res;
    }

    return res;
  } catch (error) {
    throw error;
  }
};
