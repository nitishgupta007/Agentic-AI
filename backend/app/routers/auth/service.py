from app.database.collections import users_collection
from app.core.security import hash_password, verify_password
from datetime import datetime

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
