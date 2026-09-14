import { useState } from "react";
import type { City } from "../types/city";
import CityCard from "../components/CityCard";
import "./Search.css";

export default function Search() {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {
        if (query.trim().length < 2) {
            setError("יש להקליד לפחות 2 תווים");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `http://localhost:8000/cities/search?query=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error("שגיאה בחיפוש");
            }

            const data: City[] = await response.json();

            setCities(data);
        } catch {
            setError("לא ניתן לבצע את החיפוש");
            setCities([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="search">
            <h1 className="search-title">
                חיפוש ערים
            </h1>

            <div className="search-form">
                <input
                    className="search-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="הקלד שם עיר"
                />

                <button
                    className="search-button"
                    onClick={handleSearch}
                >
                    חפש
                </button>
            </div>

            {loading && (
                <p className="search-loading">
                    טוען...
                </p>
            )}

            {error && (
                <p className="search-error">
                    {error}
                </p>
            )}

            <div className="search-results">
                {cities.map((city) => (
                    <CityCard
                        key={city.id}
                        city={city}
                    />
                ))}
            </div>
        </div>
    );
}
