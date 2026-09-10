import { Route, Routes } from "react-router"
import Layout from "./Layout"
import Dashboard from "./pages/Dashboard"
import Search from "./pages/Search"
import CityDetailes from "./pages/CityDetailes"
import Favorites from "./pages/Favorites"
import Compare from "./pages/Compare"
import Welcome from "./pages/Welcome"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/app/search" element={<Search />} />
            <Route path="/app/city:id" element={<CityDetailes />} />
            <Route path="/app/favorites" element={<Favorites />} />
            <Route path="/app/compare" element={<Compare />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App










