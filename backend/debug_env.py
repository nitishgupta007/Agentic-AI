# debug_env.py
import os
from dotenv import load_dotenv

load_dotenv()

print("MONGO_URI:", os.getenv("MONGO_URI"))
print("MONGO_DB:", os.getenv("MONGO_DB"))
