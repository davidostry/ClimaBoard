import type { City } from "../types/city";
import { useFavoritesStore } from "../store/favoritesStore"

type CityCardProps = {
    city: City;
};

export default function CityCard({ city }: CityCardProps) {
    const addFavorite = useFavoritesStore(
        (state) => state.addFavorite
    );

    const removeFavorite = useFavoritesStore(
        (state) => state.removeFavorite
    );

    const isFavorite = useFavoritesStore(
        (state) => state.isFavorite
    );

    const favorite = isFavorite(city.id);

    function handleFavorite() {
        if (favorite) {
            removeFavorite(city.id);
        } else {
            addFavorite(city);
        }
    }

    return (
        <div className="city-card">
            <h2>{city.name}</h2>

            <button onClick={handleFavorite}>
                {favorite ? "❤️" : "🤍"}
            </button>
        </div>
    );
}