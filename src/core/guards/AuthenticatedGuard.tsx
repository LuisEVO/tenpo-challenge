import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { tokenService } from '../services/token-service';

export const AuthenticatedGuard = ({ children }: PropsWithChildren) => {
  const isTokenValid = tokenService.isTokenValid();
  if (!isTokenValid) return <Navigate to="/auth" />;

  return children;
};
