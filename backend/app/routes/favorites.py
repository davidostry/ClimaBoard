from fastapi import APIRouter, HTTPException
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

@router.delete("/{explorerName}/{name}")
def remove_favorite(explorerName: str, name:str):
    result = [
    favorite
    for favorite in favorites
    if favorite.explorerName == explorerName 
    and favorite.name == name
]
    if result:
        favorites.remove(result[0])
    else:
        raise HTTPException(status_code=404, detail="city not found")
    
    return favorites




