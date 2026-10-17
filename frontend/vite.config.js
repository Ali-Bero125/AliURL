import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/url': {
        target: 'https://url-shortner-jmzw.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/url(?=\/)/, ''),
      },
    },
  },
})
