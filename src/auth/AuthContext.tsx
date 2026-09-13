import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, authStorage } from '../api/client';
import type { User } from '../types/api';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authStorage.getToken()) {
      setIsLoading(false);
      return;
    }
    api.me()
      .then(setUser)
      .catch(() => {
        authStorage.clear();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const response = await api.login(email, password);
    authStorage.setToken(response.access_token);
    setUser(response.user);
    return response.user;
  }

  function logout() {
    authStorage.clear();
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return context;
}
