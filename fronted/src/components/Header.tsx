import { Link } from "react-router"

export default function Header() {
    return (
        <div>
            <Link to="/app">לוח תחזית</Link>

            <nav>
                <Link to="/app">דשבורד</Link>
                <Link to="/app/search">חיפוש</Link>
                <Link to="/app/favorites">מועדפים</Link>
                <Link to="/app/compare">השוואה</Link>
            </nav>
        </div>
    )
}
