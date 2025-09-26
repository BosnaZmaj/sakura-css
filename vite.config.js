import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    devSourcemap: true
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'sakura.css'
          return assetInfo.name
        }
      }
    }
  }
})