<script lang="ts">
  import { onMount } from 'svelte'
  import { Chart } from '$lib'
  import type { ECMouseEvent } from '$lib/constants/events'

  import { init } from 'echarts'
  import type { EChartsOption } from 'echarts'

  const randomData = (length = 1, multiplier = 1) =>
    Array.from({ length }, () => Math.floor(Math.random() * multiplier))

  let data = randomData(7, 100)

  $: options = {
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
  } as EChartsOption

  const updateData = () => {
    data = randomData(7, 100)
  }

  let interval: number

  const handleClick = ({ detail }: CustomEvent<ECMouseEvent>) => {
    alert(`${detail.name} ${detail.value}`)
  }

  onMount(() => {
    interval = setInterval(updateData, 10000)
    return () => clearInterval(interval)
  })
</script>

<svelte:head>
  <title>Classic Example - svelte-echarts</title>
</svelte:head>

<Chart {init} {options} on:click={handleClick} />
