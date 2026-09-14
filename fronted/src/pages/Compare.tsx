import { useState } from "react";
import type { City } from "../types/city";
import type { Weather } from "../types/weather";
import "./Compare.css"

type CompareResult = {
  city1: Weather;
  city2: Weather;
};

function getWeatherDescription(code: number) {
  const descriptions: Record<number, string> = {
    0: "☀️ שמיים בהירים",
    1: "🌤️ בעיקר בהיר",
    2: "⛅ מעונן חלקית",
    3: "☁️ מעונן",

    45: "🌫️ ערפל",
    48: "🌫️ ערפל קפוא",

    51: "🌦️ טפטוף קל",
    53: "🌦️ טפטוף בינוני",
    55: "🌧️ טפטוף חזק",

    56: "🌧️ טפטוף קפוא קל",
    57: "🌧️ טפטוף קפוא חזק",

    61: "🌧️ גשם קל",
    63: "🌧️ גשם בינוני",
    65: "🌧️ גשם חזק",

    66: "🌧️ גשם קפוא קל",
    67: "🌧️ גשם קפוא חזק",

    71: "🌨️ שלג קל",
    73: "🌨️ שלג בינוני",
    75: "❄️ שלג כבד",

    77: "❄️ גרגרי שלג",

    80: "🌦️ ממטרים קלים",
    81: "🌧️ ממטרים בינוניים",
    82: "🌧️ ממטרים חזקים",

    85: "🌨️ ממטרי שלג קלים",
    86: "🌨️ ממטרי שלג כבדים",

    95: "⛈️ סופת רעמים",
    96: "⛈️ סופת רעמים עם ברד קל",
    99: "⛈️ סופת רעמים עם ברד כבד",
  };

  return descriptions[code] ?? "🌡️ תנאי מזג אוויר לא ידועים";
}

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
    if (query.trim().length < 2) {
      setError("יש להזין לפחות 2 תווים");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `http://localhost:8000/cities/search?query=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data: City[] = await response.json();

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

      const data: CompareResult = await response.json();

      setComparison(data);
    } catch {
      setError("שגיאה בהשוואת הערים");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="compare-page">

      <h1 className="compare-title">
        השוואת ערים
      </h1>

      {error && (
        <p className="compare-error">
          {error}
        </p>
      )}

      <div className="compare-search-container">

        {/* עיר ראשונה */}
        <section className="compare-search-card">

          <h2>
            🌍 עיר ראשונה
          </h2>

          <div className="compare-search-row">

            <input
              className="compare-input"
              type="text"
              value={search1}
              onChange={(e) => setSearch1(e.target.value)}
              placeholder="חפש עיר..."
            />

            <button
              className="compare-search-button"
              onClick={() => searchCity(search1, setCities1)}
            >
              חפש
            </button>

          </div>

          {cities1.length > 0 && (
            <div className="compare-city-list">

              {cities1.map((city) => (
                <button
                  className="compare-city-option"
                  key={city.id}
                  onClick={() => {
                    setCity1(city);
                    setCities1([]);
                  }}
                >
                  {city.name}, {city.country}
                </button>
              ))}

            </div>
          )}

          {city1 && (
            <div className="compare-selected-city">
              <strong>נבחרה:</strong>{" "}
              {city1.name}, {city1.country}
            </div>
          )}

        </section>

        {/* עיר שנייה */}
        <section className="compare-search-card">

          <h2>
            🌍 עיר שנייה
          </h2>

          <div className="compare-search-row">

            <input
              className="compare-input"
              type="text"
              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
              placeholder="חפש עיר..."
            />

            <button
              className="compare-search-button"
              onClick={() => searchCity(search2, setCities2)}
            >
              חפש
            </button>

          </div>

          {cities2.length > 0 && (
            <div className="compare-city-list">

              {cities2.map((city) => (
                <button
                  className="compare-city-option"
                  key={city.id}
                  onClick={() => {
                    setCity2(city);
                    setCities2([]);
                  }}
                >
                  {city.name}, {city.country}
                </button>
              ))}

            </div>
          )}

          {city2 && (
            <div className="compare-selected-city">
              <strong>נבחרה:</strong>{" "}
              {city2.name}, {city2.country}
            </div>
          )}

        </section>

      </div>

      {/* כפתור השוואה */}
      <div className="compare-button-container">

        <button
          className="compare-button"
          onClick={compareCities}
          disabled={!city1 || !city2 || loading}
        >
          {loading ? "משווה..." : "השווה"}
        </button>

      </div>

      {/* תוצאות */}
      {comparison && (
        <section className="compare-results">

          <h2 className="compare-results-title">
            תוצאות השוואה
          </h2>

          <div className="compare-results-container">

            {/* עיר ראשונה */}
            <div className="compare-result-card">

              <h3>
                🌍 {city1?.name}, {city1?.country}
              </h3>

              <p>
                <strong>טמפרטורה:</strong>{" "}
                {comparison.city1.current.temperature}°C
              </p>

              <p>
                <strong>תחושה:</strong>{" "}
                {comparison.city1.current.apparent_temperature}°C
              </p>

              <p>
                <strong>רוח:</strong>{" "}
                {comparison.city1.current.wind_speed} km/h
              </p>

              <p>
                <strong>מצב:</strong>{" "}
                {getWeatherDescription(
                  comparison.city1.current.weather_code
                )}
              </p>

            </div>

            {/* עיר שנייה */}
            <div className="compare-result-card">

              <h3>
                🌍 {city2?.name}, {city2?.country}
              </h3>

              <p>
                <strong>טמפרטורה:</strong>{" "}
                {comparison.city2.current.temperature}°C
              </p>

              <p>
                <strong>תחושה:</strong>{" "}
                {comparison.city2.current.apparent_temperature}°C
              </p>

              <p>
                <strong>רוח:</strong>{" "}
                {comparison.city2.current.wind_speed} km/h
              </p>

              <p>
                <strong>מצב:</strong>{" "}
                {getWeatherDescription(
                  comparison.city2.current.weather_code
                )}
              </p>

            </div>

          </div>

        </section>
      )}

    </div>
  );
}