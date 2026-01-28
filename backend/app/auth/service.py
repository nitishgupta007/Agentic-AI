from app.database.collections import users_collection
from app.core.security import hash_password, verify_password

def create_user(email, password):
    if users_collection.find_one({"email": email}):
        return False
    users_collection.insert_one({
        "email": email,
        "password": hash_password(password)
    })
    return True

def authenticate(email, password):
    user = users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        return None
    return user
