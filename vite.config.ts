import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { imagetools } from 'vite-imagetools'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), imagetools()],
  base: '/tokyo26/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        booking: resolve(__dirname, 'booking.html'),
      },
    },
  },
})
