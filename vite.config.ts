import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules[\\/](three|@react-three|three-stdlib|maath|troika|camera-controls)/.test(id)) {
            return 'webgl'
          }
          if (/node_modules[\\/](gsap|@gsap)/.test(id)) return 'gsap'
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
})
