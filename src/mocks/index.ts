import { environment } from '../core/config/environment';

export const validateAndEnableMocking = async () => {
  if (!environment.isDevelopment) return;

  const { worker } = await import('./browser');
  return await worker.start({
    onUnhandledRequest: (req) => {
      // Ignore requests to external image services
      if (
        req.url.includes('picsum.photos') ||
        req.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i)
      ) {
        return;
      }
      // For other unhandled requests, log a warning
      console.warn('Found an unhandled %s request to %s', req.method, req.url);
    },
  });
};
