import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'scss',
      enforce: 'pre',
      test: /\.(scss|sass)$/,
      use: [
        'sass-loader',
      ],
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['@fontsource/roboto'],
  },
})
