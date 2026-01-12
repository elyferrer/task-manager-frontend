import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // required for the dev server to work inside a Docker container
    port: 5000,
    watch: {
      usePolling: true // might be needed for file watching across different OS
    }
  }
});