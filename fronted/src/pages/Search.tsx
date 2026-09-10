import { useState } from "react";
import type { City } from "../types/city";

export default function Search() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCities() {
    if (query.length < 2) {
      setError("יש להזין לפחות 2 תווים");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:8000/cities/search?query=${query}`
      );

      if (!response.ok) {
        throw new Error("שגיאה בחיפוש");
      }

      const data = await response.json();

      setCities(data);
    } catch {
      setError("לא ניתן לבצע את החיפוש");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>חיפוש עיר</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="הקלד שם עיר..."
      />

      <button onClick={searchCities}>חפש</button>

      {loading && <p>טוען...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && cities.length === 0 && (
        <p>אין תוצאות</p>
      )}

      {cities.map((city) => (
        <div key={city.id}>
          <h2>{city.name}</h2>
          <p>{city.country}</p>
          <p>
            {city.latitude}, {city.longitude}
          </p>
        </div>
      ))}
    </div>
  );
}