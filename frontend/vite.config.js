import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
    watch: {
      usePolling: true,
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@components": path.resolve(__dirname, './src/components'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@icons": path.resolve(__dirname, './src/utils/icons.jsx'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@screens": path.resolve(__dirname, './src/screens'),
    }
  }
});
