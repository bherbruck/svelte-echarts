<script lang="ts">
  import { onMount } from 'svelte'
  import { Chart } from 'svelte-echarts'

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

  const randomData = (length = 1, multiplier = 1) =>
    Array.from({ length }, () => Math.floor(Math.random() * multiplier))

  let data = randomData(7, 100)

  $: options = {
    title: {
      text: 'Tree-shaking ECharts Example',
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

  onMount(() => {
    const interval = setInterval(updateData, 10000)
    return () => clearInterval(interval)
  })
</script>

<svelte:head>
  <title>Tree-shaking | svelte-echarts</title>
</svelte:head>

<Chart {init} {options} />
