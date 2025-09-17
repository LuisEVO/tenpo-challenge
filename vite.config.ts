import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@/core': path.resolve(__dirname, 'src/core'),
      '@/modules': path.resolve(__dirname, 'src/modules'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/mocks': path.resolve(__dirname, 'src/mocks'),
    },
  },
  // Configuración para MSW
  define: {
    global: 'globalThis',
  },
});
