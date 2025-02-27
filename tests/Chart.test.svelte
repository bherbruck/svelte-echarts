<script lang="ts">
  import { Chart } from '$lib/svelte-echarts'
  import type { EChartsType } from 'echarts'
  import type { ChartProps } from 'svelte-echarts/types'
  import type { Writable } from 'svelte/store'

  let {
    chartStore,
    init,
    options,
  }: Pick<ChartProps, 'init' | 'options'> & {
    chartStore: Writable<EChartsType>
  } = $props()
</script>

<Chart {init} {options} bind:chart={$chartStore} />
