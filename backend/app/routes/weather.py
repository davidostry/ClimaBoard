from fastapi import APIRouter
from app.services.open_meteo import get_weather

router = APIRouter(prefix= "/weather")

@router.get("/search")
def search(longitude, latitude):
    
    data = get_weather(longitude, latitude)
    return data