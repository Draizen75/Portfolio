import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Image maps are generated once by the prebuild script in package.json.
// Avoid running the same filesystem scan again from Vite's buildStart hook.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
