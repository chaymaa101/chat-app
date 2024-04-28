import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Define Vite configuration
export default defineConfig({
  // Plugins for Vite
  plugins: [react()],
  // Development server configuration
  server: {
    // Port to run the server on
    port: 3000,
    // Proxy configuration to forward requests to "/api" to another server
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Target server URL
      },
    },
  },
  // Build configuration
  build: {
    // Enable dynamic import polyfills
    polyfillDynamicImport: [
      // Add any other necessary polyfills
      'buffer',
    ],
    // External dependencies for Rollup bundling
    rollupOptions: {
      external: ['socket.io-client'] // Specify socket.io-client as external dependency
    }
  },
});
