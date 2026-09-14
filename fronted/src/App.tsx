import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import CityDetails from "./pages/CityDetailes"
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Welcome />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/app" element={<Dashboard />} />
                    <Route path="/app/search" element={<Search />} />
                    <Route
                        path="/app/city/:id"
                        element={<CityDetails />}
                    />
                    <Route
                        path="/app/favorites"
                        element={<Favorites />}
                    />
                    <Route
                        path="/app/compare"
                        element={<Compare />}
                    />
                </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;