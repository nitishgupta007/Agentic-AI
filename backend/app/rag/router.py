from fastapi import APIRouter, Depends
from app.rag.schemas import AskRequest, AskResponse
from app.rag.service import ask_question
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/rag",
    tags=["RAG"]
)

@router.post("/ask", response_model=AskResponse)
def ask_rag(
    payload: AskRequest,
    user=Depends(get_current_user)   # JWT protection
):
    answer = ask_question(payload.question)
    return {"answer": answer}
