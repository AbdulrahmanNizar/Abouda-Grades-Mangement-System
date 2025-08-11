<template>
  <div class="w-75 d-flex flex-column justify-content-center align-items-center">
    <canvas ref="statisticsChart"></canvas>

    <div
      class="w-75 d-flex flex-row justify-content-center align-items-center mt-5"
      v-if="showErrorForNotEnoughTrimesters"
      v-motion-pop-visible
    >
      <div
        class="w-75 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      >
        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
          <h5 class="text-center">Operation Failed ❌</h5>
        </div>

        <hr class="w-100" />

        <div class="w-100 d-flex flex-row justify-content-center align-items-center">
          <h6 class="text-center">{{ errorForNotEnoughTrimesters }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const statisticsChart = ref()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtTokne'))
const currentYear = ref<number>(new Date().getFullYear())
const currentYearGrades = ref<number[]>([])
const labels = ref<string[]>([])
const showErrorForNotEnoughTrimesters = ref<boolean>(false)
const errorForNotEnoughTrimesters = ref<string>('')

const getCurrentYearGrades = async (): Promise<void> => {
  try {
    const requestOptions: any = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        year: currentYear.value,
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/getCurrentYearGrades',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      currentYearGrades.value = data.data
      if (currentYearGrades.value.length == 3) {
        labels.value = ['First', 'Second', 'Third']
      } else if (currentYearGrades.value.length == 2) {
        labels.value = ['First', 'Second']
      } else {
        errorForNotEnoughTrimesters.value =
          'The grades table must have 2 completed trimesters at least'
        showErrorForNotEnoughTrimesters.value = true
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const data = {
  labels: labels.value,
  datasets: [
    {
      label: 'Grade',
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: 'rgba(0,0,0,0.8)',
      data: currentYearGrades.value,
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

getCurrentYearGrades()
</script>
