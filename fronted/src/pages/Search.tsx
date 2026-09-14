import { useState } from "react";
import type { City } from "../types/city";
import CityCard from "../components/CityCard";

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
        <div>
            <h1>חיפוש ערים</h1>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="הקלד שם עיר"
            />

            <button onClick={handleSearch}>
                חפש
            </button>

            {loading && <p>טוען...</p>}

            {error && <p>{error}</p>}

            <div>
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