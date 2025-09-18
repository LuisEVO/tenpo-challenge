// TODO: for future improvements, token can be stored in a more secure way
import CryptoJS from 'crypto-js';
import { environment } from '../config/environment';

export const cryptoService = {
  encrypt: (text: string): string => {
    return CryptoJS.AES.encrypt(text, environment.cryptoSecretKey).toString();
  },
  decrypt: (text: string): string => {
    return CryptoJS.AES.decrypt(text, environment.cryptoSecretKey).toString(
      CryptoJS.enc.Utf8
    );
  },
};
