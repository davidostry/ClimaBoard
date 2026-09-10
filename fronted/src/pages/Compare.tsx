import { useState } from "react";

export default function Compare() {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");

  return (
    <div>
      <h1>השוואת ערים</h1>

      <input
        value={city1}
        onChange={(e) => setCity1(e.target.value)}
        placeholder="עיר ראשונה"
      />

      <input
        value={city2}
        onChange={(e) => setCity2(e.target.value)}
        placeholder="עיר שנייה"
      />

      <button>השווה</button>

      <div>
        <h2>{city1 || "עיר ראשונה"}</h2>
        <p>טמפרטורה: --</p>
        <p>רוח: --</p>
      </div>

      <div>
        <h2>{city2 || "עיר שנייה"}</h2>
        <p>טמפרטורה: --</p>
        <p>רוח: --</p>
      </div>
    </div>
  );
}


