import requests


def search_cities(name):
    city = requests.get("https://geocoding-api.open-meteo.com/v1/search", params={"name": name, "count":5 ,"language": "en", "format": "json"})
    return city.json()