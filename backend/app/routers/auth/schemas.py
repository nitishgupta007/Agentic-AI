from pydantic import BaseModel, EmailStr

class Signup(BaseModel):
    name: str
    email: EmailStr
    password: str

class Login(BaseModel):
    email: EmailStr
    password: str

# 🔹 Forgot password
class ForgotPassword(BaseModel):
    email: EmailStr

# 🔹 Reset password (for next step)
class ResetPassword(BaseModel):
    token: str
    new_password: str

