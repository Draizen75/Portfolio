import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Auto-generate image map before build
    {
      name: 'generate-image-map',
      buildStart() {
        try {
          execSync('node scripts/generateImageMap.js', { stdio: 'inherit' });
        } catch (error) {
          console.warn('Failed to generate image map:', error);
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
