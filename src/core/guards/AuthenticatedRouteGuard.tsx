import { useAuthContext } from '../auth/contexts/AuthContext';
import { CanActivateGuard } from './CanActivateGuard';

export const AuthenticatedRouteGuard = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <CanActivateGuard canActivate={isAuthenticated} redirectTo="/auth/login" />
  );
};
