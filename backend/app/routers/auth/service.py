from app.database.collections import users_collection
from app.core.security import hash_password, verify_password
from datetime import datetime, timedelta
import secrets

def create_user(name: str, email: str, password: str) -> bool:
    if users_collection.find_one({"email": email}):
        return False

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hash_password(password),
        "created_at": datetime.utcnow(),
        "is_active": True,
    })
    return True


def authenticate(email: str, password: str):
    user = users_collection.find_one({"email": email})

    if not user:
        return None

    if not verify_password(password, user["password"]):
        return None

    # return minimal safe data
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "name": user.get("name"),
    }

def get_user_by_email(email: str):
    return users_collection.find_one({"email": email})


def create_reset_token() -> str:
    return secrets.token_urlsafe(32)


def save_reset_token(email: str, token: str):
    users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "reset_token": token,
                "reset_token_expiry": datetime.utcnow() + timedelta(minutes=15),
            }
        },
    )


def send_reset_email(email: str, token: str):
    reset_link = f"http://localhost:5173/reset-password?token={token}"

    # 🔴 Replace with real email later
    print(f"Password reset link for {email}: {reset_link}")
