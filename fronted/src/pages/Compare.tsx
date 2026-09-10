import { useState } from "react";
import type { City } from "../types/city";
import type { Weather } from "../types/weather";




type CompareResult = {
  city1: Weather;
  city2: Weather;
};

export default function Compare() {
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");

  const [cities1, setCities1] = useState<City[]>([]);
  const [cities2, setCities2] = useState<City[]>([]);

  const [city1, setCity1] = useState<City | null>(null);
  const [city2, setCity2] = useState<City | null>(null);

  const [comparison, setComparison] =
    useState<CompareResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCity(
    query: string,
    setCities: React.Dispatch<React.SetStateAction<City[]>>
  ) {
    if (query.length < 2) {
      setError("יש להזין לפחות 2 תווים");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `http://localhost:8000/cities/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setCities(data);
    } catch {
      setError("שגיאה בחיפוש העיר");
    }
  }

  async function compareCities() {
    if (!city1 || !city2) {
      setError("יש לבחור שתי ערים");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setComparison(null);

      const response = await fetch(
        `http://localhost:8000/weather/compare?latitude1=${city1.latitude}&longitude1=${city1.longitude}&latitude2=${city2.latitude}&longitude2=${city2.longitude}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setComparison(data);
    } catch {
      setError("שגיאה בהשוואת הערים");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>השוואת ערים</h1>

      {error && <p>{error}</p>}

      <section>
        <h2>עיר ראשונה</h2>

        <input
          type="text"
          value={search1}
          onChange={(e) => setSearch1(e.target.value)}
          placeholder="חפש עיר..."
        />

        <button
          onClick={() => searchCity(search1, setCities1)}
        >
          חפש
        </button>

        {cities1.map((city) => (
          <div key={city.id}>
            <button onClick={() => setCity1(city)}>
              {city.name}, {city.country}
            </button>
          </div>
        ))}

        {city1 && (
          <p>
            נבחרה: {city1.name}, {city1.country}
          </p>
        )}
      </section>

      <hr />

      <section>
        <h2>עיר שנייה</h2>

        <input
          type="text"
          value={search2}
          onChange={(e) => setSearch2(e.target.value)}
          placeholder="חפש עיר..."
        />

        <button
          onClick={() => searchCity(search2, setCities2)}
        >
          חפש
        </button>

        {cities2.map((city) => (
          <div key={city.id}>
            <button onClick={() => setCity2(city)}>
              {city.name}, {city.country}
            </button>
          </div>
        ))}

        {city2 && (
          <p>
            נבחרה: {city2.name}, {city2.country}
          </p>
        )}
      </section>

      <hr />

      <button
        onClick={compareCities}
        disabled={!city1 || !city2 || loading}
      >
        {loading ? "משווה..." : "השווה"}
      </button>

      {comparison && (
        <section>
          <h2>תוצאות השוואה</h2>

          <div>
            <h3>{city1?.name}</h3>

            <p>
              טמפרטורה: {comparison.city1.current.temperature}°
            </p>

            <p>
              רוח: {comparison.city1.current.wind_speed} km/h
            </p>

            <p>
              קוד מזג אוויר: {comparison.city1.current.weather_code}
            </p>
          </div>

          <div>
            <h3>{city2?.name}</h3>

            <p>
              טמפרטורה: {comparison.city2.current.temperature}°
            </p>

            <p>
              רוח: {comparison.city2.current.wind_speed} km/h
            </p>

            <p>
              קוד מזג אוויר: {comparison.city2.current.weather_code}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}