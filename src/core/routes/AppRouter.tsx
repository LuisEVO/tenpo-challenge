import { AuthRoutes } from '@/modules/auth/AuthRoutes';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticatedGuard } from '../guards/AuthenticatedGuard';
import { UnauthenticatedGuard } from '../guards/UnauthenticatedGuard';

const AdminRoutes = lazy(() => import('@/modules/admin/AdminRoutes'));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AuthenticatedGuard>
              <AdminRoutes />
            </AuthenticatedGuard>
          }
        />
        <Route
          path="/auth/*"
          element={
            <UnauthenticatedGuard>
              <AuthRoutes />
            </UnauthenticatedGuard>
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
