import {defineConfig} from 'vite'
import {resolve} from 'node:url'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'pages/sticky': resolve(__dirname, 'pages/sticky/index.html')
      }
    }
  },
  plugins:[react()]
})