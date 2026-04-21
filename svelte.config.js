import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  kit: {
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: undefined,
      strict: true,
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/tokyo26' : '',
    },
  },
  preprocess: vitePreprocess(),
}
