<template>
  <div class="w-75 d-flex flex-row justify-content-center align-items-center">
    <canvas ref="statisticsChart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const statisticsChart = ref()

const labels = ['First', 'Second', 'Third']

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Test',
      backgroundColor: 'rgb(0,0,0)',
      borderColor: 'rgb(0,0,0)',
      data: [],
    },
  ],
}

const config: any = {
  type: 'line',
  data: data,
  options: {},
}

onMounted(() => {
  const chart = new Chart(statisticsChart.value, config)
})
</script>
