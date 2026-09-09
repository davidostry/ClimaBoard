from pydantic import BaseModel, Field

class Favorite(BaseModel):

    explorerName: str = Field(..., min_length=2, max_length=30)
    name: str
    latitude:float = Field(..., ge= -90, le= 90)
    longitude: float = Field(..., ge=-180, le=180)
    country: str




















