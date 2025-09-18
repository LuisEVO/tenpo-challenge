import { localStorageService } from './local-storage-service';

// TODO: for future improvements, token can be stored in a more secure way
const TOKEN_KEY = 'token';

export const tokenService = {
  getToken: (): string | null => {
    return localStorageService.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorageService.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    localStorageService.removeItem(TOKEN_KEY);
  },

  /**
   * This is a simple check to validate the token structure and expiration
   * only for FE purposes, endpoints validate the token on the server.
   */
  isTokenValid: (): boolean => {
    const token = tokenService.getToken();
    if (!token) return false;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));

      if (!payload.exp) return false;

      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTime) return false;

      return true;
    } catch (error) {
      console.error('token is not valid', error);
      return false;
    }
  },

  getTokenPayload: <T>(): T | null => {
    const isTokenValid = tokenService.isTokenValid();
    if (!isTokenValid) return null;

    const parts = tokenService.getToken()!.split('.');
    return JSON.parse(atob(parts[1])) as T;
  },
};
