import { useState } from "react";
import "./Atbash.css";

export default function Atbash() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleAtbash() {
        if (!text.trim()) {
            setError("יש להזין טקסט");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setResult("");

            const response = await fetch(
                "http://localhost:8000/atbash",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: text,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();

            setResult(data.result);
        } catch {
            setError("שגיאה בהצפנת הטקסט");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="atbash-container">
            <h1> אתב"ש</h1>

            <p className="atbash-description">
                הצפן את הטקסט שלך באמצעות שיטת אתב"ש
            </p>

            <div className="textarea-wrapper">
                <div className="textarea-label">
                     הטקסט שלך
                </div>

                <textarea
                    className="atbash-textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="כתוב כאן את הטקסט שתרצה להצפין..."
                    rows={6}
                />

                <div className="textarea-hint">
                     הטקסט יוצפן באופן אוטומטי
                </div>
            </div>

            <button
                className="atbash-button"
                onClick={handleAtbash}
                disabled={loading}
            >
                {loading ? " מצפין..." : " הצפן"}
            </button>

            {error && (
                <p className="atbash-error">
                    {error}
                </p>
            )}

            {result && (
                <div className="atbash-result">
                    <h2> התוצאה</h2>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}
