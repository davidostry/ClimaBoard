from pydantic import BaseModel

class Current(BaseModel):
    temperature: float
    wind_speed: float
    weather_code: int


class Daily(BaseModel):
    date: str
    temperature_min: float
    temperature_max: float
    weather_code: int

class Weather(BaseModel):
    current: Current
    daily: list[Daily]