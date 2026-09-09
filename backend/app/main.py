from fastapi import FastAPI
from app.routes import cities, favorites, weather, atbash


app = FastAPI()

app.include_router(cities.router)
app.include_router(favorites.router)
app.include_router(weather.router)
app.include_router(atbash.router)

@app.get("/health")
def health():
    return {"status": "ok"}




