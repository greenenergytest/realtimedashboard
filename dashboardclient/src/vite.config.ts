import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import NodePolyfills from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    NodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
});
