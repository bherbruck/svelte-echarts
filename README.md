# svelte-echarts

A simple [Apache ECharts](https://echarts.apache.org/) component for [Svelte](https://svelte.dev/)! Check out this [demo](https://bherbruck.github.io/svelte-echarts/).

## 💿 Installation

```bash
npm i -D svelte-echarts echarts
```

## ⌨️ Usage [demo](https://bherbruck.github.io/svelte-echarts/)

```html
<script>
  import { Chart } from 'svelte-echarts'

  import { init, use } from 'echarts/core'
  import { BarChart } from 'echarts/charts'
  import { GridComponent, TitleComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'

  // now with tree-shaking
  use([BarChart, GridComponent, CanvasRenderer, TitleComponent])

  let options = {
    title: {
      text: 'ECharts Example',
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
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
  }
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
```
