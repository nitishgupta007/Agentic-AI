from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth.router import router as auth_router
from app.routers.profile.router import router as profile_router
# from app.rag.router import router as rag_router
from app.middleware.logging import LoggingMiddleware
from app.rag.router import router as rag_router

app = FastAPI(title="MongoDB RAG Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(LoggingMiddleware)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(rag_router)
# app.include_router(rag_router)
