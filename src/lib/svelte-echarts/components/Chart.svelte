<script lang="ts">
  import type {
    init as baseInit,
    EChartsType as BaseEchartsType,
    EChartsOption,
    SetOptionOpts,
  } from 'echarts'
  import type { init as coreInit, EChartsType as CoreEchartsType } from 'echarts/core'
  import type { EChartsInitOpts } from 'echarts'
  import type { Action } from 'svelte/action'
  import { createEventDispatcher } from 'svelte'
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

  $: if (chart) chart.setOption(options, { notMerge, lazyUpdate, silent, replaceMerge, transition })

  const dispatch = createEventDispatcher<EventHandlers>()

  const handleResize = () => {
    if (chart && !chart.isDisposed()) chart.resize()
  }

  const initChart: Action<HTMLDivElement> = (element) => {
    chart = init(element, theme, initOptions)

    EVENT_NAMES.forEach((eventName) => {
      // @ts-expect-error
      chart!.on(eventName, (event) => dispatch(eventName, event))
    })

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(element)

    return {
      destroy() {
        resizeObserver.disconnect()
        chart!.dispose()
      },
    }
  }
</script>

<!-- restProps is currently broken with typescript -->
<div use:initChart style="width: 100%; height: 100%" {...$$restProps} />
