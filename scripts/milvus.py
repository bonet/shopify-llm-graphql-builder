import json
import os
from dotenv import load_dotenv
from pymilvus import MilvusClient
from openai import OpenAI

load_dotenv()

client = MilvusClient(uri=os.getenv("MILVUS_URI"), token=os.getenv("MILVUS_TOKEN"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

DIMENSION = 1536
BATCH_SIZE = 50
BASE_URL = "https://shopify.dev/docs/api/admin-graphql/latest"
OUTPUT_FILE = "shopify-api-docs.json"
OBJECT_COLLECTION = "Object"

def get_embeddings(texts):
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    return [data.embedding for data in response.data]

def reset(collection):
    if client.has_collection(collection_name=collection):
        client.drop_collection(collection_name=collection)
    client.create_collection(
        collection_name=collection,
        dimension=DIMENSION,
    )

def insert(collection, data):
    for i in range(0, len(data), BATCH_SIZE):
        descriptions = [d["description"] for d in data[i:i+BATCH_SIZE]]
        vectors = get_embeddings(descriptions)

        for j in range(len(vectors)):
            data[i+j]["id"] = i+j
            data[i+j]["vector"] = vectors[j]

        client.insert(collection_name=collection, data=data[i:i+BATCH_SIZE])

def search(collection, query, limit=5, threshold=0.8):
    query_vector = get_embeddings([query])[0]
    res = client.search(
        collection_name=collection,
        data=[query_vector],
        limit=limit,
        output_fields=["name", "type", "description", "kind"],
        filter="object == 'Order'"
    )

    relevant_res = []
    for i in range(len(res[0])):
        if (res[0][i]["distance"] > threshold):
            relevant_res.append(res[0][i])
    return relevant_res

if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    reset(OBJECT_COLLECTION)
    insert(OBJECT_COLLECTION, data)
