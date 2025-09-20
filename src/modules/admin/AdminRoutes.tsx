import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ArticlesPage } from './modules/articles/pages/ArticlesPage';
import { HomePage } from './pages/HomePage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="*" element={<Navigate to="../articles" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
