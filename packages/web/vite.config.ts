import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    host: '0.0.0.0',
    proxy: {
      '/auth': 'http://127.0.0.1:3000',
      '/api': 'http://127.0.0.1:3000',
      '/slack': 'http://127.0.0.1:3000',
    },
  },
})
