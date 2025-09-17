import { environment } from '../config/environment';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: environment.apiBaseUrl,
});
