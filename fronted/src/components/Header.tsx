import { Link, useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("explorerName");
        navigate("/");
    }

    return (
        <div>
            <Link to="/app">לוח תחזית</Link>

            <nav>
                <Link to="/app">דשבורד</Link>
                <Link to="/app/search">חיפוש</Link>
                <Link to="/app/favorites">מועדפים</Link>
                <Link to="/app/compare">השוואה</Link>
                <Link to="/app/atbash">אתב"ש</Link>

                <button onClick={handleLogout}>
                    התנתק
                </button>
            </nav>
        </div>
    );
}