export type Session = {
  token: string;
  user_id: string;
  username: string;
};

const STORAGE_KEY = 'reader-session';

type Listener = (session: Session | null) => void;
const listeners = new Set<Listener>();

/**
 * Reads the `exp` claim (seconds since epoch) from a JWT without verifying it.
 * The backend verifies the token; this is only used to drop expired sessions early.
 */
function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === 'number' ? exp : null;
  } catch {
    return null;
  }
}

function isExpired(token: string): boolean {
  const exp = getTokenExpiry(token);
  return exp === null || exp * 1000 <= Date.now();
}

/**
 * Returns the stored session, or null if there is none or its token has expired.
 */
export function getSession(): Session | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return null;
    const session: Session = JSON.parse(stored);
    if (isExpired(session.token)) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Could not save session', err);
  }
  listeners.forEach((listener) => listener(session));
}

export function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable, nothing to clear */
  }
  listeners.forEach((listener) => listener(null));
}

/**
 * Subscribes to session changes (login, logout, expired token). Returns an unsubscribe function.
 */
export function onSessionChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
