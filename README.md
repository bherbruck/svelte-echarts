# svelte-echarts

A simple [ECharts](https://echarts.apache.org/) component for [Svelte](https://svelte.dev/)! Check out this [demo](https://bherbruck.github.io/svelte-echarts/).

## 💿 Installation

```bash
npm i -D svelte-echarts echarts
```

## ⌨️ Usage [demo](https://bherbruck.github.io/svelte-echarts/minimal/)

```html
<script>
  import { Chart } from 'svelte-echarts'

  const options = {
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
```
