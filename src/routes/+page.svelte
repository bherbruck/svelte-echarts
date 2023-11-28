<script lang="ts">
  import { Chart, type EChartsOptions } from '$lib'

  const options: EChartsOptions = {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
      },
    ],
  }
</script>

<div class="app">
  <Chart {options} />
</div>

<style>
  .app {
    width: 100vw;
    height: 100vh;
  }
</style>
