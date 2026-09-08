import requests
from app.schemas.city import City


def search_cities(name):
    response = requests.get("https://geocoding-api.open-meteo.com/v1/search", params={ "name": name, "count": 5, "language": "en", "format": "json"})

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