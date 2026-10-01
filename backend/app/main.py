from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.api.analyze import router as analyze_router

app = FastAPI(title="SECURECODE AI")


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)


app.include_router(analyze_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}