import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginRequest } from '@/api/auth';
import { Session, clearSession, getSession, onSessionChange, setSession } from '@/lib/session';

interface AuthContextValue {
  session: Session | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(() => getSession());

  // Keep in sync with logins/logouts elsewhere, e.g. apiFetch clearing the session on a 401.
  useEffect(() => onSessionChange(setSessionState), []);

  async function login(username: string, password: string) {
    const { token, user_id } = await loginRequest(username, password);
    setSession({ token, user_id, username });
  }

  return (
    <AuthContext.Provider value={{ session, login, logout: clearSession }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === null) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
