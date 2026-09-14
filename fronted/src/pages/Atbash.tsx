import { useState } from "react";

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
        <div>
            <h1>אתב"ש</h1>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="הקלד טקסט..."
                rows={5}
            />

            <br />

            <button
                onClick={handleAtbash}
                disabled={loading}
            >
                {loading ? "מצפין..." : "הצפן"}
            </button>

            {error && <p>{error}</p>}

            {result && (
                <div>
                    <h2>תוצאה</h2>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}