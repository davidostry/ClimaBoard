from fastapi import FastAPI
from app.routes import cities
from app.routes import favorites
from app.routes import weather

app = FastAPI()

app.include_router(cities.router)
app.include_router(favorites.router)
app.include_router(weather.router)

@app.get("/health")
def health():
    return {"status": "ok"}




