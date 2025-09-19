import type { AuthUser } from './auth-user';

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export interface AuthContextType extends AuthState {
  setToken: (token: string) => void;
  clearToken: () => void;
}
