from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd.hash(password)

def verify_password(password, hashed):
    return pwd.verify(password, hashed)

def create_token(data, expires=60):
    data["exp"] = datetime.utcnow() + timedelta(minutes=expires)
    return jwt.encode(data, settings.JWT_SECRET, settings.JWT_ALGORITHM)
