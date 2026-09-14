import CityCard from "../components/CityCard";
import { useFavoritesStore } from "../store/favoritesStore";

export default function Favorites() {
    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    return (
        <div>
            <h1>⭐ הערים המועדפות שלי</h1>

            {favorites.length === 0 ? (
                <p>אין עדיין ערים במועדפים</p>
            ) : (
                <div>
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