<script lang="ts">
  import { onMount } from 'svelte'
  import '../app.css'

  // let transferSize: number | undefined

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  const getTransferSize = async () =>
    performance
      .getEntriesByType('resource')
      // @ts-expect-error
      .reduce((acc, resource) => acc + resource.transferSize, 0)

  onMount(() => {})
</script>

<div class="app">
  {#await getTransferSize()}
    <span>Loading...</span>
  {:then bytes}
    <span>Transfer Size: {formatBytes(bytes)}</span>
    <span>Refresh without cache to see real size (CTRL+F5)</span>
  {:catch error}
    <span>Error: {error.message}</span>
  {/await}

  <slot />
</div>

<style>
  .app {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
