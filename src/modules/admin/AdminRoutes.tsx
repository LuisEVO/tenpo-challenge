import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="../home" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
