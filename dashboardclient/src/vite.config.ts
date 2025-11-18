import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import nodePolyfills from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    // React plugin for Vite
    react(),
    // Node.js polyfills plugin
    nodePolyfills({
      protocolImports: true, // Enable Node.js protocol imports
    }),
  ],
  resolve: {
    alias: {
      // Alias to use the process module in the browser
      process: 'process/browser',
    },
  },
  server: {
    // port: 3000, // Specify the port for the dev server
    // open: true, // Open the browser on server start
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173, // Specify the port
    strictPort: true, // Exit if the port is already in use
    watch: {
      usePolling: true, // Enable polling for file watching
    },
    proxy: {
      '/api': 'http://backend:5000', // Redirect API calls to the backend service
    },
  },
  build: {
    sourcemap: true, // Enable source maps for debugging
    target: 'esnext', // Use modern browser features
  },
});
