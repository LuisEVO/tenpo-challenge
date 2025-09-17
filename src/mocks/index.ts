import { environment } from '../core/config/environment';

export const validateAndEnableMocking = async () => {
  if (!environment.isDevelopment) return;

  const { worker } = await import('./browser');
  return await worker.start();
};
