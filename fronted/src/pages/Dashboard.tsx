import { Link } from "react-router";

export default function Dashboard() {
  const explorerName = localStorage.getItem("explorerName");

  return (
    <div>
      <h2>שלום {explorerName}</h2>

      <h2>לוח תחזית</h2>

      <p>ברוך הבא ללוח מזג האוויר למטיילים</p>

      <div>
        <Link to="/app/search">חיפוש עיר</Link>
      </div>

      <div>
        <Link to="/app/favorites">מועדפים</Link>
      </div>

      <div>
        <Link to="/app/compare">השוואת ערים</Link>
      </div>
    </div>
  );
}