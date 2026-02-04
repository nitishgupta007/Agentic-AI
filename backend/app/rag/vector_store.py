from langchain.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from app.core.config import settings

PERSIST_DIR = "chroma_db"

def get_vector_store(documents):
    embeddings = OpenAIEmbeddings(
        openai_api_key=settings.OPENAI_API_KEY
    )

    return Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory=PERSIST_DIR
    )
