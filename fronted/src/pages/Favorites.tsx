import CityCard from "../components/CityCard";
import { useFavoritesStore } from "../store/favoritesStore";

export default function Favorites() {
    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    return (
        <div className="favorites-page">

            <h1 className="favorites-title">
                ⭐ הערים המועדפות שלי
            </h1>

            {favorites.length === 0 ? (
                <p className="favorites-empty">
                    אין עדיין ערים במועדפים
                </p>
            ) : (
                <div className="favorites-grid">

                    {favorites.map((city) => (
                        <CityCard
                            key={city.id}
                            city={city}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}