import { SearchResultData } from "@zilliz/milvus2-sdk-node";

export const convertToObject = (nodeData: SearchResultData[]) => {
  const fields: { [key: string]: any } = {};
  for (const node of nodeData) {
    fields[node.name] = {};
    fields[node.name]["type"] = node.type;
    fields[node.name]["description"] = node.description;
    if (node.kind === "OBJECT") {
      fields[node.name]["fields"] = convertToObject(node.fields);
    }
  }
  return fields;
};
