import { Link, useNavigate } from "react-router";
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("explorerName");
        navigate("/");
    }

    return (
        <header className="header">
            <Link className="header-logo" to="/app">
                לוח תחזית
            </Link>

            <nav className="header-nav">
                <Link to="/app">דשבורד</Link>
                <Link to="/app/search">חיפוש</Link>
                <Link to="/app/favorites">מועדפים</Link>
                <Link to="/app/compare">השוואה</Link>
                <Link to="/app/atbash">אתב"ש</Link>

                <button onClick={handleLogout}>
                    התנתק
                </button>
            </nav>
        </header>
    );
}

