import requests
from app.schemas.city import City



def search_cities(name):
    response = requests.get("https://geocoding-api.open-meteo.com/v1/search", params={ "name": name, "count": 20, "language": "en", "format": "json"})

    data = response.json()
    results = data.get("results", [])

    cities = []

    for c in results:
        city = City(
            name=c["name"],
            latitude=c["latitude"],
            longitude=c["longitude"],
            country=c["country"]
        )

        cities.append(city)

    return cities

def get_weather(latitude, longitude):
    response = requests.get("https://api.open-meteo.com/v1/forecast", params= {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,wind_speed_10m,weather_code",
        "daily": "temperature_2m_max,temperature_2m_min,weather_code",
        "forecast_days": 7,
        "timezone": "auto"})
    data = response.json()
    return data


























