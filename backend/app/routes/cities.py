from fastapi import APIRouter, Query
from app.services.open_meteo import search_cities
from app.schemas.city import City


router = APIRouter(prefix= "/cities")

@router.get("/search", response_model=list[City])
def search(name: str = Query(..., min_length=2, max_length=50)):
    
    data = search_cities(name)
    return data
    

