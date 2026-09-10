import { useParams } from "react-router";

export default function CityDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>פרטי עיר</h1>

      <p>City ID: {id}</p>

      <h2>מזג אוויר נוכחי</h2>
      <p>טמפרטורה: --</p>
      <p>תחושה: --</p>
      <p>רוח: --</p>

      <h2>תחזית</h2>
      <p>התחזית תופיע כאן.</p>

      <button>הוסף למועדפים</button>
    </div>
  );
}