import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <header>
        <Link to="/app">ClimaBoard</Link>

        <nav>
          <Link to="/app">Dashboard</Link>
          <Link to="/app/search">Search</Link>
          <Link to="/app/favorites">Favorites</Link>
          <Link to="/app/compare">Compare</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        Weather data by Open-Meteo.com
      </footer>
    </>
  );
}