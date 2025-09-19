import { AxiosError } from 'axios';

export const DEFAULT_ERROR_MESSAGE_MAP = new Map<number, string>([
  [401, 'Usted no esta autorizado para acceder a este recurso'],
  [500, 'Ocurrió un error, por favor intente nuevamente'],
]);

/**
 * Utility function to get the error message from an HTTP error
 * @param error the error response from the API (AxiosError)
 * @param messageMap custom error message map (optional)
 * @returns the error message
 */
export const getHttpErrorMessage = (
  error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  messageMap: Map<number, string> = DEFAULT_ERROR_MESSAGE_MAP
): string => {
  const status =
    error instanceof AxiosError && error.status ? error.status : 500;

  return messageMap.get(status) ?? DEFAULT_ERROR_MESSAGE_MAP.get(500)!;
};
