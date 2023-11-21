import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: { chunkSizeWarningLimit: 50000},
  base: "https://noela-portfolio.onrender.com",
  server: {
    host: true,
    strictPort: true,
    port: 8000,
  }
})
