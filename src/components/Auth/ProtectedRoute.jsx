import { Outlet } from "react-router";
import { getUserFromToken } from "../../lib/auth";
import { Navigate } from "react-router";

export default function ProtectedRoute() {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}