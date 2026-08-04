from fastapi import APIRouter
from pydantic import BaseModel

from services.vector_store import search_chunks

router = APIRouter()


class SearchRequest(BaseModel):
    query: str


@router.post("/search")
def search(request: SearchRequest):
    chunks = search_chunks(request.query)

    return {
        "query": request.query,
        "results": chunks
    }