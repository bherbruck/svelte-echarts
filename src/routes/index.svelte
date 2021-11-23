<script lang="ts">
  import { Chart, EChartsOptions } from '$lib'

  let maxValue = 100
  let numValues = 10

  let data = []

  $: values = data.map((item) => item.value)
  $: labels = data.map((item) => item.time)

  $: options = {
    xAxis: {
      type: 'category',
      data: labels,
      max: numValues,
    },
    yAxis: {
      type: 'value',
      max: maxValue,
    },
    series: [
      {
        data: values,
        type: 'bar',
      },
    ],
  } as EChartsOptions

  function addData() {
    const value = Math.round(Math.random() * maxValue)
    const time = new Date().valueOf()
    data = [
      ...(data.length < numValues ? data : data.slice(1, numValues)),
      { time, value },
    ]
  }

  setInterval(addData, 500)
</script>

<div class="app">
  <div class="flex-container">
    <div class="controls-container">
      <div class="control">
        <span>Values</span>
        <input type="number" bind:value={numValues} />
      </div>

      <div class="control">
        <span>Max Value</span>
        <input type="number" bind:value={maxValue} />
      </div>
    </div>

    <Chart {options} renderer={'svg'} />
  </div>
</div>

<style>
  .app {
    width: 100vw;
    height: 100vh;
  }

  .flex-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .controls-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .control {
    display: flex;
    flex-direction: column;
    margin: 6px;
  }
</style>
