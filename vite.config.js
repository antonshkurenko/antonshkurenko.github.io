import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        keys: resolve(__dirname, 'keys.html'),
        birthday2019: resolve(__dirname, 'birthday2019.html'),
        vibecoded: resolve(__dirname, 'vibecoded.html'),
      },
    },
  },
})
