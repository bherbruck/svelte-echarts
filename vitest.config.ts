import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  test: {
    browser: {
      provider: 'playwright',
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
  resolve: {
    alias: {
      $lib: '/src/lib',
      'svelte-echarts': '/src/lib/svelte-echarts',
    },
  },
})
