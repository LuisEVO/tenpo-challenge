import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { tokenService } from '../services/token-service';

export const UnauthenticatedGuard = ({ children }: PropsWithChildren) => {
  const isTokenValid = tokenService.isTokenValid();
  if (isTokenValid) return <Navigate to="/admin" />;

  return children;
};
