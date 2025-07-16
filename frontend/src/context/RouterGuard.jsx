import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

// -- RUTAS PROTEGIDAS
function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

// -- RUTAS PUBLICAS
function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/home" replace />;

  return <Outlet />;
}

export { ProtectedRoute, PublicRoute };
