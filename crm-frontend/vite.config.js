import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'https://mini-crm-backend-cb6s.onrender.com',
        changeOrigin: true,
      },
      '/auth': {
        target: 'https://mini-crm-backend-cb6s.onrender.com',
        changeOrigin: true,
      },
    },
  },
}); 