from app.database.collections import users_collection

def upsert_user_profile(email: str, name: str, gender: str, age: int):
    """
    Create or update user profile fields
    """
    result = users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "name": name,
                "gender": gender,
                "age": age
            }
        },
        upsert=True  # creates profile if not exists
    )

    return result.modified_count >= 0

def get_user_profile_by_email(email: str):
    return users_collection.find_one(
        {"email": email},
        {
            "_id": 0,
            "password": 0
        }
    )

