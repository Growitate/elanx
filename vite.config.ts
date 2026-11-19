import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 1911,
    allowedHosts: ['elanx.cyberpunk.co.in', '.cyberpunk.co.in'],
  },
  preview: {
    host: '0.0.0.0',
    port: 1911,
    allowedHosts: ['elanx.cyberpunk.co.in', '.cyberpunk.co.in'],
  },
})
