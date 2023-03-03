import { defineConfig } from 'cypress'
import react from '@vitejs/plugin-react'
import vitePreprocessor from 'cypress-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3003'
    },
  },
  e2e: {
    setupNodeEvents(on) {
      on(
        'file:preprocessor',
        vitePreprocessor(path.resolve(__dirname, './vite.config.js'))
      )
    }
  },
})
