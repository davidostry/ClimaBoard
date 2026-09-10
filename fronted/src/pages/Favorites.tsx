import { useFavoritesStore } from "../store/favoritesStore"

export default function Favorites() {
  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  const removeFavorite = useFavoritesStore(
    (state) => state.removeFavorite
  );

  return (
    <div>
      <h1>מועדפים</h1>

      {favorites.length === 0 ? (
        <p>אין עדיין ערים מועדפות</p>
      ) : (
        favorites.map((city) => (
          <div key={city.id}>
            <h2>{city.name}</h2>

            <p>{city.country}</p>

            <p>
              {city.latitude}, {city.longitude}
            </p>

            <button
              onClick={() => removeFavorite(city.id)}
            >
              הסר ממועדפים
            </button>
          </div>
        ))
      )}
    </div>
  );
}