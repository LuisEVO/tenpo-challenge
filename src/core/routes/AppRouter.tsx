import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../../modules/auth/AuthRoutes';
import { AuthenticatedRouteGuard } from '../guards/AuthenticatedRouteGuard';
import { UnauthenticatedRouteGuard } from '../guards/UnauthenticatedRouteGuard';

const AdminRoutes = lazy(() => import('@/modules/admin/AdminRoutes'));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AuthenticatedRouteGuard />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="*" element={<AdminRoutes />} />
        </Route>
        <Route path="/auth" element={<UnauthenticatedRouteGuard />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="*" element={<AuthRoutes />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
