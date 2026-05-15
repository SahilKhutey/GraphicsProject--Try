import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Aether Engine GUI Configuration
export default defineConfig({
  plugins: [react()],
  root: '.',
  base: './',
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/GUI',
    },
  },
});
