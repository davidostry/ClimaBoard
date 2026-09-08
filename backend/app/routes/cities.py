from fastapi import APIRouter
from app.services.open_meteo import search_cities
from app.schemas.city import City


router = APIRouter(prefix= "/cities")

@router.get("/search", response_model=list[City])
def search(name:str):
    
    data = search_cities(name)
    return data
    

