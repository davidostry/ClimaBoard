from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import cities
from app.routes import favorites
from app.routes import weather
from app.routes import atbash

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cities.router)
app.include_router(favorites.router)
app.include_router(weather.router)
app.include_router(atbash.router)


@app.get("/health")
def health():
    return {"status": "ok"}




