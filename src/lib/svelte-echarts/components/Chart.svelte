<script lang="ts">
  import type {
    init as baseInit,
    EChartsType as BaseEchartsType,
    EChartsOption,
    SetOptionOpts,
  } from 'echarts'
  import type { init as coreInit, EChartsType as CoreEchartsType } from 'echarts/core'
  import type { EChartsInitOpts } from 'echarts'
  import { createEventDispatcher, onMount } from 'svelte'
  import { EVENT_NAMES, type EventHandlers } from '$lib/svelte-echarts/constants/events'

  export let init: typeof baseInit | typeof coreInit
  export let theme: string | object | null = 'light'
  export let initOptions: EChartsInitOpts = {}

  export let options: EChartsOption
  export let notMerge: SetOptionOpts['notMerge'] = true // deviation from ECharts default, works better with Svelte
  export let lazyUpdate: SetOptionOpts['lazyUpdate'] = false
  export let silent: SetOptionOpts['silent'] = false
  export let replaceMerge: SetOptionOpts['replaceMerge'] = undefined
  export let transition: SetOptionOpts['transition'] = undefined

  export let chart: (BaseEchartsType | CoreEchartsType) | undefined = undefined

  let element: HTMLDivElement

  $: if (chart) chart.setOption(options, { notMerge, lazyUpdate, silent, replaceMerge, transition })

  const dispatch = createEventDispatcher<EventHandlers>()

  const initChart = () => {
    if (chart) chart.dispose()

    chart = init(element, theme, initOptions)

    EVENT_NAMES.forEach((eventName) => {
      // @ts-expect-error
      chart!.on(eventName, (event) => dispatch(eventName, event))
    })
  }

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (!chart) initChart()
      else chart.resize()
    })
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      chart?.dispose()
    }
  })
</script>

<!-- restProps is currently broken with typescript -->
<div bind:this={element} style="width: 100%; height: 100%" {...$$restProps}></div>
