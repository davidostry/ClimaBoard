from fastapi import APIRouter
from app.services.open_meteo import search_cities


router = APIRouter(prefix= "/cities")

@router.get("/search")
def search(name:str):
    
    data = search_cities(name)
    return data
    

