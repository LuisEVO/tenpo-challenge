import { AdminRoutes } from '@/modules/admin/AdminRoutes';
import { AuthRoutes } from '@/modules/auth/AuthRoutes';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
