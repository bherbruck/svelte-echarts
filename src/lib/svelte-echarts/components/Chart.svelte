<script lang="ts">
  import type {
    init as baseInit,
    EChartsType as BaseEchartsType,
    EChartsOption,
    SetOptionOpts,
  } from 'echarts'
  import type { init as coreInit, EChartsType as CoreEchartsType } from 'echarts/core'
  import type { EChartsInitOpts } from 'echarts'
  import { EVENT_NAMES, type EventHandlers } from '$lib/svelte-echarts/constants/events'
  import { onMount } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  let {
    init,
    theme = 'light',
    initOptions = {},
    options,
    notMerge = true,
    lazyUpdate = false,
    silent = false,
    replaceMerge,
    transition,
    chart,
    ...restProps
  }: {
    init: typeof baseInit | typeof coreInit
    options: EChartsOption
    theme?: 'light' | 'dark' | object
    initOptions?: EChartsInitOpts
    notMerge?: SetOptionOpts['notMerge']
    lazyUpdate?: SetOptionOpts['lazyUpdate']
    silent?: SetOptionOpts['silent']
    replaceMerge?: SetOptionOpts['replaceMerge']
    transition?: SetOptionOpts['transition']
    chart?: BaseEchartsType | CoreEchartsType
  } & EventHandlers &
    OmitHandlers<HTMLAttributes<HTMLDivElement>> = $props()

  type OmitHandlers<T> = {
    [K in keyof T as K extends `on${string}` ? never : K]: T[K]
  }

  let element: HTMLDivElement

  $effect(() => {
    if (chart) {
      chart.setOption(options, { notMerge, lazyUpdate, silent, replaceMerge, transition })
    }
  })

  const initChart = () => {
    if (chart) chart.dispose()

    chart = init(element, theme, initOptions)

    EVENT_NAMES.forEach((eventName) => {
      // @ts-ignore
      chart!.on(eventName, (event) => {
        // @ts-ignore
        restProps['on' + eventName]?.(event)
      })
    })
  }

  onMount(() => {
    initChart()
    const resizeObserver = new ResizeObserver(() => {
      chart?.resize()
    })
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      chart?.dispose()
    }
  })

  const otherProps = $derived(
    Object.keys(restProps)
      .filter((key) => !key.startsWith('on'))
      .reduce(
        (r, k) => ({ ...r, [k]: (restProps as any)[k] }),
        {} as HTMLAttributes<HTMLDivElement>,
      ),
  )
</script>

<!-- restProps is currently broken with typescript -->
<div
  bind:this={element}
  style="width: 100%; height: 100%; {otherProps.style}"
  {...otherProps}
></div>
