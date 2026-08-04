from fastapi import APIRouter, File, UploadFile

from services.pdf_loader import save_pdf, extract_pages
from services.chunker import chunk_pages
from services.vector_store import store_chunks

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    path = save_pdf(file)

    pages = extract_pages(path)

    chunks = chunk_pages(pages)

    store_chunks(
        file.filename,
        chunks
    )

    return {
        "filename": file.filename,
        "pages": len(pages),
        "chunks": len(chunks)
    }