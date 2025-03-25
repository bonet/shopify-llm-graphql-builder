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
      output_fields: ["object", "name", "type", "description", "kind"],
      limit: 100,
      filter: filter,
    });
    const result = search.results.filter((result) => result.score > 0.7);
    if (result.length > 0) {
      return result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const recursiveSearchMilvus = async (
  collectionName: string,
  query: string,
  filter = ""
) => {
  try {
    const vector = await embeddings.embedQuery(query);
    console.log("In recursiveSearchMilvus: ", query);
    const search = await milvus.search({
      vector: vector,
      collection_name: collectionName,
      output_fields: ["object", "name", "type", "description", "kind"],
      limit: 100,
      filter: filter,
    });
    console.log("search.results: ", search.results.slice(0, 3));
    const result = search.results.filter((result) => result.score > 0.7);
    if (result.length > 0) {
      for (const res of result) {
        if (res.kind === "OBJECT") {
          res["fields"] = await recursiveSearchMilvus(
            collectionName,
            res.name,
            `object=='${res.type}'`
          );
        }
      }
      return result;
    }

    return result;
  } catch (error) {
    throw error;
  }
};
