import { tokenService } from '../services/token-service';
import { CanActivateGuard } from './canActivateGuard';

export const UnauthenticatedRouteGuard = () => {
  const isTokenValid = tokenService.isTokenValid();
  return (
    <CanActivateGuard canActivate={!isTokenValid} redirectTo="/admin/home" />
  );
};
