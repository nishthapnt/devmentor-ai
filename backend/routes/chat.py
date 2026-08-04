from fastapi import APIRouter
from pydantic import BaseModel

from services.llm import chat_with_llm
from services.memory import add_message, get_history
from services.vector_store import search_chunks

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):

    results = search_chunks(request.message)

    context = "\n\n".join(results["documents"])

    history = get_history()

    answer = chat_with_llm(
        request.message,
        context,
        history
    )

    add_message("user", request.message)
    add_message("assistant", answer)
    
    print(results["metadata"])#test

    return {
        "question": request.message,
        "answer": answer,
        "sources": results["metadata"]
    }