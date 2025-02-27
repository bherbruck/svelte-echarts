<script lang="ts">
  import { onMount } from 'svelte'
  import { Chart } from 'svelte-echarts'

  import { init } from 'echarts'
  import type { EChartsOption } from 'echarts'

  const randomData = (length = 1, multiplier = 1) =>
    Array.from({ length }, () => Math.floor(Math.random() * multiplier))

  let data = $state(randomData(7, 100))

  let options = $derived({
    title: {
      text: 'Classic ECharts Example',
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
  } as EChartsOption)

  const updateData = () => {
    data = randomData(7, 100)
  }

  onMount(() => {
    const interval = setInterval(updateData, 10000)
    return () => clearInterval(interval)
  })
</script>

<svelte:head>
  <title>Classic Example - svelte-echarts</title>
</svelte:head>

<Chart {init} {options} />
