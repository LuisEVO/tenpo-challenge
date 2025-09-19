import type { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export type CanActivateGuardProps = PropsWithChildren & {
  canActivate: boolean;
  redirectTo: string;
};

export const CanActivateGuard = ({
  canActivate,
  redirectTo,
}: CanActivateGuardProps) => {
  if (!canActivate) return <Navigate to={redirectTo} replace />;

  return <Outlet />;
};
