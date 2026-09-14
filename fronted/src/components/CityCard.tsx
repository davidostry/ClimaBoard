import { useNavigate } from "react-router-dom";
import type { City } from "../types/city";
import { useFavoritesStore } from "../store/favoritesStore";
import "./CityCard.css";

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
            <h3 className="city-card-title">
                {city.name}
            </h3>

            <p className="city-card-country">
                {city.country}
            </p>

            <p className="city-card-info">
                Latitude: {city.latitude}
            </p>

            <p className="city-card-info">
                Longitude: {city.longitude}
            </p>

            <div className="city-card-actions">
                <button
                    className="city-card-details"
                    onClick={handleDetails}
                >
                    לפרטי העיר
                </button>

                <button
                    className={`city-card-favorite ${
                        favorite ? "is-favorite" : ""
                    }`}
                    onClick={handleFavorite}
                >
                    {favorite
                        ? "⭐ הסר ממועדפים"
                        : "☆ הוסף למועדפים"}
                </button>
            </div>
        </div>
    );
}
