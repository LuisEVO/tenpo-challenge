import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './home/pages/HomePage';

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="../home" />} />
    </Routes>
  );
};
