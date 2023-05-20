import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    open: true
  },

  build: {
    assetsInlineLimit: 0,
  },

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

  optimizeDeps: {
    include: ['@fontsource/roboto'],
  },
})
