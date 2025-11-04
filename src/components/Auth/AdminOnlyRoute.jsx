import { getUserFromToken } from "../../lib/auth";
import { Navigate, Outlet } from "react-router";

export default function AdminOnlyRoute() {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" replace />
  const isAdmin = user.role === 'ADMIN' || user.is_superuser
  return isAdmin? <Outlet /> : <Navigate to={'/tasks'}  replace />
}