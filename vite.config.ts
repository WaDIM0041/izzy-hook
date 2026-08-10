import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: ['.monkeycode-ai.live']
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096
  }
})
