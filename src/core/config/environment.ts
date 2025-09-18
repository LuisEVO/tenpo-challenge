import { z } from 'zod';

// TODO: for future improvements:
// - add environment variables validation on runtime
// - remove default values
const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default('http://localhost:5173/api'),
  DEV: z.boolean().default(true),
  VITE_CRYPTO_SECRET_KEY: z.string().default('secret'),
});

const parsedEnv = envSchema.parse(import.meta.env);

export type Environment = {
  apiBaseUrl: string;
  isDevelopment: boolean;
  cryptoSecretKey: string;
};

export const environment: Environment = {
  apiBaseUrl: parsedEnv.VITE_API_BASE_URL,
  isDevelopment: parsedEnv.DEV,
  cryptoSecretKey: parsedEnv.VITE_CRYPTO_SECRET_KEY,
};
