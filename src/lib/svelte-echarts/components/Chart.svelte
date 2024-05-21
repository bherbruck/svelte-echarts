<script lang="ts">
  import type { init as baseInit, EChartsType as BaseEchartsType } from 'echarts'
  import type { init as coreInit, EChartsType as CoreEchartsType } from 'echarts/core'
  import type { EChartsOption, EChartsInitOpts } from 'echarts'
  import { createEventDispatcher } from 'svelte'
  import { EVENT_NAMES, type EventHandlers } from '$lib/svelte-echarts/constants/events'
  import type { Action } from 'svelte/action'

  export let init: typeof baseInit | typeof coreInit
  export let theme: string | object | null = 'light'
  export let initOptions: EChartsInitOpts = {}

  export let options: EChartsOption
  export let chart: (BaseEchartsType | CoreEchartsType) | undefined = undefined

  $: chart && chart.setOption(options)

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
