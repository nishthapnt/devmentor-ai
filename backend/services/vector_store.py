import os
import uuid

import chromadb
from dotenv import load_dotenv

load_dotenv()

client = chromadb.CloudClient(
    tenant=os.getenv("CHROMA_TENANT"),
    database=os.getenv("CHROMA_DATABASE"),
    api_key=os.getenv("CHROMA_API_KEY"),
)

collection = client.get_or_create_collection(
    name="documents"
)


def store_chunks(filename, chunks):
    ids = []
    documents = []
    metadata = []

    for i, chunk in enumerate(chunks):
        ids.append(str(uuid.uuid4()))

        documents.append(chunk["text"])

        metadata.append({
            "filename": filename,
            "page": chunk["page"],
            "chunk": i
        })

    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadata
    )


def search_chunks(query: str, k: int = 3):
    results = collection.query(
        query_texts=[query],
        n_results=k
    )

    return {
        "documents": results["documents"][0],
        "metadata": results["metadatas"][0]
    }