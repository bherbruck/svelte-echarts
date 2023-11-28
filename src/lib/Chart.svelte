<script lang="ts" context="module">
  import * as echarts from 'echarts'

  export type EChartsOptions = echarts.EChartsOption
  export type EChartsTheme = string | object
  export type EChartsRenderer = 'canvas' | 'svg'

  export type ChartOptions = {
    theme?: EChartsTheme
    renderer?: EChartsRenderer
    options: EChartsOptions
  }

  const DEFAULT_OPTIONS: Partial<ChartOptions> = {
    theme: undefined,
    renderer: 'canvas',
  }

  export function chartable(element: HTMLElement, echartOptions: ChartOptions) {
    const { theme, renderer, options } = {
      ...DEFAULT_OPTIONS,
      ...echartOptions,
    }
    const echartsInstance = echarts.init(element, theme, { renderer })
    echartsInstance.setOption(options)

    function handleResize() {
      echartsInstance.resize()
    }

    window.addEventListener('resize', handleResize)

    return {
      destroy() {
        echartsInstance.dispose()
        window.removeEventListener('resize', handleResize)
      },
      update(newOptions: ChartOptions) {
        echartsInstance.setOption({
          ...echartOptions.options,
          ...newOptions.options,
        })
      },
    }
  }
</script>

<script lang="ts">
  export let options: echarts.EChartsOption
  export let { theme, renderer } = DEFAULT_OPTIONS
</script>

<div class="chart" use:chartable={{ renderer, theme, options }} />

<style>
  .chart {
    height: 100%;
    width: 100%;
  }
</style>
