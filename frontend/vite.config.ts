import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on 0.0.0.0 automatically
    port: 5173,
    watch: {
      usePolling: true, // Ensures hot-reloading works seamlessly inside Docker volumes
    },
  },
})
