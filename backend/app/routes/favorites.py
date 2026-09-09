from fastapi import APIRouter
from app.schemas.favorites import Favorite

router = APIRouter(prefix= "/favorites")
favorites = []

@router.post("/")
def add_favorite(favorite: Favorite):
    
    favorites.append(favorite)
    return favorites

@router.get("/{explorerName}")
def get_favorites(explorerName):
    result = [
    favorite
    for favorite in favorites
    if favorite.explorerName == explorerName
]
    return result




