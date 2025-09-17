import { z } from 'zod';

// TODO: for future improvements, add environment variables validation on build time

const envSchema = z.object({
  VITE_API_BASE_URL: z.url().default('http://localhost:3000'),
  DEV: z.boolean().default(true),
});

const parsedEnv = envSchema.parse(import.meta.env);

export type Environment = {
  apiBaseUrl: string;
  isDevelopment: boolean;
};

export const environment: Environment = {
  apiBaseUrl: parsedEnv.VITE_API_BASE_URL,
  isDevelopment: parsedEnv.DEV,
};
