import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './AuthProvider';

/**
 * Renders the child routes when logged in, otherwise redirects to /login
 * and returns to the current page after logging in.
 */
export function RequireAuth() {
  const { session } = useAuth();
  const location = useLocation();

  if (session === null) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }
  return <Outlet />;
}
