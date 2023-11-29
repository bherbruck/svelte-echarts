import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/svelte'
import Chart, {
  type EChartsTheme,
  type EChartsOptions,
} from '../src/lib/Chart.svelte'
import * as echarts from 'echarts'

vi.mock('echarts', () => ({
  init: vi.fn().mockReturnValue({
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
  }),
}))

const options: EChartsOptions = {
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
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
    },
  ],
}

const newOptions: EChartsOptions = {
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
      data: [430, 762, 690, 803, 1010, 1170, 1220], // New data points
      type: 'line',
    },
  ],
}

const customTheme: EChartsTheme = {
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
  it('initializes with provided options', () => {
    render(Chart, { options })
    expect(echarts.init).toHaveBeenCalled()
    expect(echarts.init().setOption).toHaveBeenCalledWith(options)
  })

  it('updates chart options', async () => {
    const { component } = render(Chart, { options })
    await component.$set({ options: newOptions })
    expect(echarts.init().setOption).toHaveBeenCalledWith(newOptions)
  })

  it('responds to window resize', () => {
    render(Chart, { options })
    window.dispatchEvent(new Event('resize'))
    expect(echarts.init().resize).toHaveBeenCalled()
  })

  it('cleans up on destruction', () => {
    const { component } = render(Chart, { options })
    component.$destroy()
    expect(echarts.init().dispose).toHaveBeenCalled()
  })

  it('handles custom props', () => {
    const customRenderer = 'svg'
    render(Chart, {
      options,
      theme: customTheme,
      renderer: customRenderer,
    })
    expect(echarts.init).toHaveBeenCalledWith(expect.anything(), customTheme, {
      renderer: customRenderer,
    })
  })
})
