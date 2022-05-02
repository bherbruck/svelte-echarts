import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

// check for if we are in a github actions environment
// if so, we need to use a different path for the static files
const paths = process.env.GITHUB_ACTIONS
  ? {
      base: '/svelte-echarts',
    }
  : undefined

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    prerender: { default: true },
    paths,
  },
}

export default config
