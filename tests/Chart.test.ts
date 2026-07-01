import { describe, it, expect, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import { Chart } from '$lib/svelte-echarts'
import ChartTest from './Chart.test.svelte'
import * as echarts from 'echarts/core'
import type { EChartsOption, EChartsType } from 'echarts'
import { BarChart } from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import { get, writable, type Writable } from 'svelte/store'
import type { SvelteComponent } from 'svelte'

const initOptions: Parameters<typeof echarts.init>[2] = {
  renderer: 'svg',
  height: 400,
  width: 600,
}

const options: EChartsOption = {
  title: {
    text: 'Test Line Chart',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
}

const newOptions: EChartsOption = {
  title: {
    text: 'Updated Line Chart',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      data: [430, 762, 690, 803, 1010, 1170, 1220], // New data points
    },
  ],
}

const customTheme = {
  color: ['#70c1b3', '#fcbf49', '#ff1654', '#247ba0'], // Custom color palette
  textStyle: {
    fontFamily: 'Arial, sans-serif', // Custom font
    fontSize: 12, // Custom font size
  },
  title: {
    textStyle: {
      color: '#247ba0', // Title color
      fontSize: 16, // Title font size
    },
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#247ba0', // Custom color for xAxis line
      },
    },
  },
  yAxis: {
    axisLine: {
      lineStyle: {
        color: '#247ba0', // Custom color for yAxis line
      },
    },
  },
}

describe('Chart Component', () => {
  echarts.use([
    BarChart,
    DatasetComponent,
    GridComponent,
    TransformComponent,
    SVGRenderer,
    TitleComponent,
    TooltipComponent,
  ])

  it('initializes with provided options', async () => {
    const screen = render(Chart, {
      init: echarts.init,
      options,
      initOptions,
    })
    expect(screen.container.querySelector('div[_echarts_instance_]')).not.undefined
    expect(screen.container.querySelector('svg')).not.undefined
  })

  it('two-way binds chart', async () => {
    // ref: https://testing-library.com/docs/svelte-testing-library/example/#two-way-data-binding
    const chartStore = writable<EChartsType>()
    const screen = render(ChartTest, {
      init: echarts.init,
      options,
      chartStore,
    })
    expect(get(chartStore)).not.undefined
    expect(screen.getByText('Updated Line Chart').query()).null
    get(chartStore).setOption(newOptions)
    expect(screen.getByText('Updated Line Chart').query()).not.null
  })

  it('does not call chart.resize() on mount', async () => {
    let chartInstance: ReturnType<typeof echarts.init> | undefined
    const wrappedInit: typeof echarts.init = (dom, theme, opts) => {
      const instance = echarts.init(dom, theme, opts)
      chartInstance = instance
      return instance
    }

    render(Chart, { init: wrappedInit, options })

    // Spy synchronously before any ResizeObserver callback can fire
    const resizeSpy = vi.spyOn(chartInstance!, 'resize')

    // Wait long enough for any async ResizeObserver callbacks to have run
    await new Promise<void>((resolve) => setTimeout(resolve, 200))

    expect(resizeSpy).not.toHaveBeenCalled()
  })

  it('calls chart.resize() when the DOM element size changes', async () => {
    let chartInstance: ReturnType<typeof echarts.init> | undefined
    const wrappedInit: typeof echarts.init = (dom, theme, opts) => {
      const instance = echarts.init(dom, theme, opts)
      chartInstance = instance
      return instance
    }

    const screen = render(Chart, { init: wrappedInit, options })

    // Spy synchronously before any ResizeObserver callback can fire
    const resizeSpy = vi.spyOn(chartInstance!, 'resize')

    // Force a layout change on the chart's root div to trigger ResizeObserver
    const chartDiv = screen.container.querySelector('div[_echarts_instance_]') as HTMLElement
    chartDiv.style.width = '800px'
    chartDiv.style.height = '600px'

    // Wait for the ResizeObserver callback to run
    await new Promise<void>((resolve) => setTimeout(resolve, 200))

    expect(resizeSpy).toHaveBeenCalled()
  })
})
