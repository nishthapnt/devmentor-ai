from contextlib import asynccontextmanager
from fastapi import FastAPI

from routes.chat import router as chat_router
from routes.upload import router as upload_router
from routes.search import router as search_router
from fastapi.middleware.cors import CORSMiddleware
from services.pdf_loader import cleanup_uploads

@asynccontextmanager
async def lifespan(app: FastAPI):
    cleanup_uploads()
    yield

app = FastAPI(title="DevMentor AI", lifespan=lifespan)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(upload_router)
app.include_router(search_router)


@app.get("/")
def root():
    return {
        "message": "DevMentor AI Backend is running!"
    }