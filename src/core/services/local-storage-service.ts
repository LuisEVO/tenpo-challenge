import { cryptoService } from './crypto-service';

export const localStorageService = {
  getItem: (key: string): string | null => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      return cryptoService.decrypt(encryptedValue);
    } catch (error) {
      console.error('Error getting item from localStorage', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      const encryptedValue = cryptoService.encrypt(value);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error setting item in localStorage', error);
    }
  },
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};
