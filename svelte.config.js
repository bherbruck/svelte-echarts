import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

const ROOT_ROUTE = '/svelte-echarts'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    paths: {
      assets: ROOT_ROUTE,
      base: ROOT_ROUTE,
    },
  },
}

export default config
