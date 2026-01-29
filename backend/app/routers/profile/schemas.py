from pydantic import BaseModel, Field

class ProfileRequest(BaseModel):
    name: str = Field(..., min_length=2)
    gender: str
    age: int = Field(..., ge=1, le=120)

class ProfileResponse(BaseModel):
    email: str
    name: str | None = None
    gender: str | None = None
    age: int | None = None
    role: str | None = None