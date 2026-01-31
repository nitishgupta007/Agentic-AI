from fastapi import APIRouter, HTTPException, Depends
from .schemas import ProfileRequest,ProfileResponse
from .service import upsert_user_profile, get_user_profile_by_email
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.post("/update_profile")
def create_or_update_profile(profile: ProfileRequest, current_user: dict = Depends(get_current_user)):
    
    email = current_user["email"]

    success = upsert_user_profile(
        email=email,
        name=profile.name,
        gender=profile.gender,
        age=profile.age
    )

    if not success:
        raise HTTPException(status_code=400, detail="Profile update failed")

    return {"message": "Profile updated successfully"}


@router.get("/me", response_model=ProfileResponse)
def get_my_profile(current_user: dict = Depends(get_current_user)):
    email = current_user["email"]

    user = get_user_profile_by_email(email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user