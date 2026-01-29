from fastapi import APIRouter, HTTPException
from .schemas import Signup, Login
from .service import create_user, authenticate
from app.core.security import create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
def signup(data: Signup):
    if not create_user(data.name, data.email, data.password):
        raise HTTPException(400, "User exists")
    return {"message": "User created"}

@router.post("/login")
def login(data: Login):
    user = authenticate(data.email, data.password)
    if not user:
        raise HTTPException(401, "Invalid credentials")
    return {"access_token": create_token({"sub": user["email"]}),
            "name":user["name"]}