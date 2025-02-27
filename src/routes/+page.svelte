<script lang="ts">
  import { onMount } from 'svelte'
  import { Chart, type ECMouseEvent } from 'svelte-echarts'

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

  let interval = 1000
  let numRecords = 10

  let data: { timestamp: Date; value: number }[] = $state(
    Array.from({ length: numRecords }, (_, i) => ({
      timestamp: new Date(Date.now() - (numRecords - i) * interval),
      value: Math.random() * 100,
    })),
  )

  let options = $derived({
    title: {
      text: 'ECharts example',
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        formatter: (value) =>
          new Date(value).toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
      },
      data: data.map(({ timestamp }) => timestamp),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: data.map(({ value }) => value),
      },
    ],
  } as EChartsOption)

  const updateData = () => {
    data.shift()
    data.push({
      timestamp: new Date(),
      value: Math.random() * 100,
    })
    data = [...data]
  }

  const handleClick = (event: ECMouseEvent) => {
    alert(`${event.name} ${event.value}`)
  }

  onMount(() => {
    const id = setInterval(updateData, interval)
    return () => clearInterval(id)
  })
</script>

<svelte:head>
  <title>Examples - svelte-echarts</title>
</svelte:head>

<Chart init={init as any} options={options as any} onclick={handleClick} />
