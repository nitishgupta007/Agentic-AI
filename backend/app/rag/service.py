from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

from app.core.config import settings
from app.rag.vector_store import get_vector_store

# Build once (singleton-style)
_qa_chain = None


def build_rag_chain():
    global _qa_chain
    if _qa_chain:
        return _qa_chain

    # 1. Load documents
    loader = TextLoader("docs/data.txt")
    documents = loader.load()

    # 2. Split text
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = splitter.split_documents(documents)

    # 3. Vector DB
    vector_db = get_vector_store(chunks)

    # 4. LLM
    llm = ChatOpenAI(
        temperature=0,
        openai_api_key=settings.OPENAI_API_KEY
    )

    # 5. RAG Chain
    _qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vector_db.as_retriever()
    )

    return _qa_chain


def ask_question(question: str) -> str:
    qa = build_rag_chain()
    return qa.run(question)
