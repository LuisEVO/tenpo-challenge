import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { tokenService } from '../../services/token-service';
import type { AuthContextType, AuthState } from '../interfaces/auth-context';
import type { AuthUser } from '../interfaces/auth-user';

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const defaultAuthContext: AuthContextType = {
  ...defaultAuthState,
  setToken: () => {},
  clearToken: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// TODO: for future improvements
// - add refresh token
// - listen to storage changes
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  const updateAuthState = useCallback(() => {
    const isTokenValid = tokenService.isTokenValid();

    if (isTokenValid) {
      const payload = tokenService.getTokenPayload<AuthUser>();
      setAuthState({
        isAuthenticated: true,
        user: payload,
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
    }
  }, []);

  const setToken = useCallback(
    (token: string) => {
      tokenService.setToken(token);
      updateAuthState();
    },
    [updateAuthState]
  );

  const clearToken = useCallback(() => {
    tokenService.removeToken();
    updateAuthState();
  }, [updateAuthState]);

  /*
   * This is to refresh the auth state when the component is mounted
   */
  useEffect(() => {
    updateAuthState();
  }, [updateAuthState]);

  const value: AuthContextType = {
    ...authState,
    setToken,
    clearToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextType => useContext(AuthContext)!;
