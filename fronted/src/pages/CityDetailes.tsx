
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

type Weather = {
    current: {
        temperature: number;
        apparent_temperature: number;
        wind_speed: number;
        weather_code: number;
    };

    daily: {
        date: string;
        temperature_min: number;
        temperature_max: number;
        weather_code: number;
    }[];
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

export default function CityDetails() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const name = searchParams.get("name");
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadWeather() {
            if (!latitude || !longitude) {
                setError("חסרים נתוני מיקום");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:8000/weather?latitude=${latitude}&longitude=${longitude}`
                );

                if (!response.ok) {
                    throw new Error("Weather request failed");
                }

                const data: Weather = await response.json();

                setWeather(data);
            } catch (error) {
                console.error(error);
                setError("לא ניתן לטעון את מזג האוויר");
            } finally {
                setLoading(false);
            }
        }

        loadWeather();
    }, [latitude, longitude]);

    if (loading) {
        return <p>טוען מזג אוויר...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!weather) {
        return <p>לא נמצאו נתוני מזג אוויר</p>;
    }

    return (
        <div>
            <h1>{name}</h1>

            <p>City ID: {id}</p>

            <h2>מזג אוויר נוכחי</h2>

            <p>
                טמפרטורה: {weather.current.temperature}°C
            </p>

            <p>
                תחושה: {weather.current.apparent_temperature}°C
            </p>

            <p>
                רוח: {weather.current.wind_speed} km/h
            </p>

            <p>
                מצב:{" "}
                {getWeatherDescription(
                    weather.current.weather_code
                )}
            </p>

            <h2>תחזית</h2>

            {weather.daily.map((day) => (
                <div key={day.date}>
                    <h3>{day.date}</h3>

                    <p>
                        מינימום: {day.temperature_min}°C
                    </p>

                    <p>
                        מקסימום: {day.temperature_max}°C
                    </p>

                    <p>
                        מצב:{" "}
                        {getWeatherDescription(
                            day.weather_code
                        )}
                    </p>
                </div>
            ))}

            <p>
                Weather data by Open-Meteo.com
            </p>
        </div>
    );
}

