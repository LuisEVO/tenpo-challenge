import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './auth/pages/LoginPage';

export const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
