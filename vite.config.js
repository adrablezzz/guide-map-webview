/*
 * @Date: 2025-03-24 16:19:20
 * @LastEditTime: 2025-03-25 09:31:55
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
})
