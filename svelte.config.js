import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

// check for if we are in a github actions environment
// if so, we need to use a different path for the static files
const paths =
  Boolean(process.env.GITHUB_ACTIONS) || true
    ? {
        base: '/svelte-echarts',
        assets: 'https://bherbruck.github.io/svelte-echarts',
      }
    : undefined

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    paths,
  },
}

export default config
