import { useAuthContext } from '../auth/contexts/AuthContext';
import { CanActivateGuard } from './CanActivateGuard';

export const UnauthenticatedRouteGuard = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <CanActivateGuard canActivate={!isAuthenticated} redirectTo="/admin/home" />
  );
};
