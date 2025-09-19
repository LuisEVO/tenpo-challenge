import { tokenService } from '../services/token-service';
import { CanActivateGuard } from './canActivateGuard';

export const AuthenticatedRouteGuard = () => {
  const isTokenValid = tokenService.isTokenValid();
  return (
    <CanActivateGuard canActivate={isTokenValid} redirectTo="/auth/login" />
  );
};
