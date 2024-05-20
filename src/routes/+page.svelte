<script lang="ts">
  import { onMount } from 'svelte'
  import { Chart } from '$lib'

  // import { init, use } from 'echarts'

  import { init, use } from 'echarts/core'
  import type { EChartsOption } from 'echarts'
  import { BarChart } from 'echarts/charts'
  import {
    DatasetComponent,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    TransformComponent,
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  use([
    BarChart,
    DatasetComponent,
    GridComponent,
    TooltipComponent,
    TransformComponent,
    CanvasRenderer,
    TitleComponent,
  ])

  // data is randomized 7 values
  const randomData = (length = 1, multiplier = 1) =>
    Array.from({ length }, () => Math.floor(Math.random() * multiplier))

  let data = randomData(7, 100)

  $: options = {
    title: {
      text: 'ECharts example',
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
        data,
      },
    ],
  } as EChartsOption

  const updateData = () => {
    data = randomData(7, 100)
  }

  let interval: number

  onMount(() => {
    interval = setInterval(updateData, 10000)
    return () => clearInterval(interval)
  })
</script>

<div class="app">
  <Chart {init} {options} />
</div>

<style>
  .app {
    width: 100vw;
    height: 100vh;
  }
</style>
