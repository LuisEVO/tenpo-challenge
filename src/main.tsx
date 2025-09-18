import '@/core/config/zod-translation.ts';
import { validateAndEnableMocking } from '@/mocks/index.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function startApp() {
  await validateAndEnableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

startApp();
