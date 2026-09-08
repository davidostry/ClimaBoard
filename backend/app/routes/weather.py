from fastapi import APIRouter
from app.services.open_meteo import get_weather
from app.schemas.weather import Weather

router = APIRouter(prefix="/weather")

@router.get("/", response_model=Weather)
def search(latitude: float, longitude: float):
    data = get_weather(latitude, longitude)
    return data