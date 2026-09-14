import { useNavigate } from "react-router-dom";
import type { City } from "../types/city";
import { useFavoritesStore } from "../store/favoritesStore";

type CityCardProps = {
    city: City;
};

export default function CityCard({ city }: CityCardProps) {
    const navigate = useNavigate();

    const {
        addFavorite,
        removeFavorite,
        isFavorite
    } = useFavoritesStore();

    const favorite = isFavorite(city.id);

    function handleFavorite() {
        if (favorite) {
            removeFavorite(city.id);
        } else {
            addFavorite(city);
        }
    }

    function handleDetails() {
        navigate(
            `/app/city/${city.id}?name=${encodeURIComponent(
                city.name
            )}&latitude=${city.latitude}&longitude=${city.longitude}`
        );
    }

    return (
        <div className="city-card">
            <h3>{city.name}</h3>

            <p>{city.country}</p>

            <p>
                Latitude: {city.latitude}
            </p>

            <p>
                Longitude: {city.longitude}
            </p>

            <button onClick={handleDetails}>
                לפרטי העיר
            </button>

            <button onClick={handleFavorite}>
                {favorite
                    ? "⭐ הסר ממועדפים"
                    : "☆ הוסף למועדפים"}
            </button>
        </div>
    );
}