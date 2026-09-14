import { Link } from "react-router";
import "./Dashboard.css";

export default function Dashboard() {
  const explorerName = localStorage.getItem("explorerName");

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">
        שלום {explorerName}
      </h2>

      <p className="dashboard-text">
        ברוך הבא ללוח מזג האוויר למטיילים
      </p>

      <div className="dashboard-cards">
        <Link className="dashboard-card" to="/app/search">
          <h3>חיפוש עיר</h3>
          <p>חפש עיר וקבל את תחזית מזג האוויר</p>
        </Link>

        <Link className="dashboard-card" to="/app/favorites">
          <h3>מועדפים</h3>
          <p>צפה בערים ששמרת כמועדפות</p>
        </Link>

        <Link className="dashboard-card" to="/app/compare">
          <h3>השוואת ערים</h3>
          <p>השווה את מזג האוויר בין שתי ערים</p>
        </Link>
      </div>
    </div>
  );
}