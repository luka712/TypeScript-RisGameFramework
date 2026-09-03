import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Runtime implementation lives in the sibling package (no package exports yet).
      'ris-framework': path.resolve(__dirname, '../ris-framework/src/core/Framework.ts'),
      'ris-ktx2': path.resolve(__dirname, '../ris-ktx2/src/index.ts'),
      'ris-ktx2-api': path.resolve(__dirname, '../ris-ktx2-api/src/index.ts'),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
  optimizeDeps: {
    exclude: ['ris-framework', 'ris-ktx2', 'ris-ktx2-api'],
  },
})
