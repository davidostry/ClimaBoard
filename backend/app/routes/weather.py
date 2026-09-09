from fastapi import APIRouter, Query
from app.services.open_meteo import get_weather
from app.schemas.weather import Weather

router = APIRouter(prefix="/weather")

@router.get("/", response_model=Weather)
def search(latitude: float = Query(..., ge=-90, le=90), longitude: float= Query(..., ge=-180, le=180)):
    data = get_weather(latitude, longitude)
    return data

@router.get("/forecast")
def forecast(latitude: float = Query(..., ge=-90, le=90), longitude: float= Query(..., ge=-180, le=180), days: int = Query(..., ge=1, le=16)):
    data = get_weather(latitude, longitude, days)
    return data

@router.get("/compare")
def compare(latitude1: float = Query(..., ge=-90, le=90), longitude1: float= Query(..., ge=-180, le=180),latitude2: float = Query(..., ge=-90, le=90), longitude2: float= Query(..., ge=-180, le=180)):
    city1 = get_weather(latitude1, longitude1)
    city2 = get_weather(latitude2, longitude2)
    return {"city1":city1, "city2":city2}