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
      base: '/tokyo26',
    },
  },
  preprocess: vitePreprocess(),
}
