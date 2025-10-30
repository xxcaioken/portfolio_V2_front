import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth/storage';
import { isAdmin } from '../auth/roles';

export default function ProtectedRoute() {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (!isAdmin()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
}