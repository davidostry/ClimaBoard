import requests
from app.schemas.city import City
from app.schemas.weather import Weather, Current, Daily



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
            country=c.get("country", "")
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

    current = Current(
        temperature=data["current"]["temperature_2m"],
        wind_speed=data["current"]["wind_speed_10m"],
        weather_code=data["current"]["weather_code"]
    )

    daily_data = data["daily"]

    daily = []

    for i in range(len(daily_data["time"])):
        day = Daily(
            date=daily_data["time"][i],
            temperature_min=daily_data["temperature_2m_min"][i],
            temperature_max=daily_data["temperature_2m_max"][i],
            weather_code=daily_data["weather_code"][i]
        )

        daily.append(day)

    return Weather(
        current=current,
        daily=daily
    )



























