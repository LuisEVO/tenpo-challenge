import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRouter } from '@/modules/private/PrivateRouter';
import { PublicRouter } from '@/modules/public/PublicRouter';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/private/*" element={<PrivateRouter />} />
        <Route path="/*" element={<PublicRouter />} />
      </Routes>
    </BrowserRouter>
  );
};
