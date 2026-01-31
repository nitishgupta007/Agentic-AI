from fastapi import APIRouter, HTTPException
from .schemas import Signup, Login, ForgotPassword
from .service import (
    create_user,
    authenticate,
    get_user_by_email,
    create_reset_token,
    save_reset_token,
    send_reset_email,
)
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

@router.post("/forgot-password")
def forgot_password(data: ForgotPassword):
    user = get_user_by_email(data.email)

    if user:
        token = create_reset_token()
        save_reset_token(data.email, token)
        send_reset_email(data.email, token)

    # 🔐 Always return same message (security)
    return {
        "message": "If this email exists, a password reset link has been sent "
    }
