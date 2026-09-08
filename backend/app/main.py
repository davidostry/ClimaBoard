from fastapi import FastAPI
from app.routes import cities
from app.routes import favorites

app = FastAPI()

app.include_router(cities.router)
app.include_router(favorites.router)

@app.get("/health")
def health():
    return {"status": "ok"}




