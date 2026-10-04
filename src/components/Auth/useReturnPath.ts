import { useLocation } from 'react-router';

const AUTH_PATHS = ['/login', '/signup'];

/** Where to go after logging in: the page that sent the user to /login or /signup, or the front page. */
export function useReturnPath(): string {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  return from && from.startsWith('/') && !AUTH_PATHS.includes(from) ? from : '/';
}

/**
 * Router state for a link to /login or /signup, so the user comes back here afterwards.
 * On the auth pages themselves it passes the existing return path along.
 */
export function useAuthLinkState(): { from: string } {
  const location = useLocation();
  const returnPath = useReturnPath();
  return { from: AUTH_PATHS.includes(location.pathname) ? returnPath : location.pathname };
}
