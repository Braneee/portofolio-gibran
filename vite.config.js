import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Enable hot-reload for file changes
    watch: {
      usePolling: true,
    },
  },
  // GitHub Pages builds provide the repository subpath; Vercel uses root.
  base: process.env.VITE_BASE_PATH || '/',
});
