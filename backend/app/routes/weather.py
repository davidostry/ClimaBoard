from fastapi import APIRouter, Query
from app.services.open_meteo import get_weather
from app.schemas.weather import Weather

router = APIRouter(prefix="/weather")

@router.get("/", response_model=Weather)
def search(latitude: float = Query(..., ge=-90, le=90), longitude: float= Query(..., ge=-180, le=180)):
    data = get_weather(latitude, longitude)
    return data