import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const explorerName = localStorage.getItem("explorerName");

  if (!explorerName) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}