<template>
  <div class="w-75 d-flex flex-column justify-content-center align-items-center">
    <div
      class="w-100 d-flex flex-md-row flex-column flex-wrap justify-content-center align-items-center mb-2"
      v-if="showErrorForNotCompletedYear == false"
    >
      <div
        class="d-flex flex-column justify-content-center align-items-center p-3 border rounded me-2 ms-2 mt-2 col-6"
        style="width: 30%"
        id="statisticsCard"
        v-motion-pop-visible
        v-for="grade in yearGrades"
      >
        <h6 class="mb-0">Grade: {{ grade }}%</h6>
      </div>
    </div>

    <canvas ref="statisticsGraph" v-if="showErrorForNotCompletedYear == false"></canvas>

    <div
      class="d-flex flex-row justify-content-center align-items-center mt-5"
      id="errorForNotCompletedYearModal"
      style="width: 75%"
      v-motion-pop-visible
      v-if="showErrorForNotCompletedYear"
    >
      <div
        class="w-100 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      >
        <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-2">
          <h5 class="text-center">{{ errorForNotCompletedYear }}</h5>
          <hr class="w-100" />
          <h6 class="text-center">The year isn't completed</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Chart from 'chart.js/auto'

const statisticsGraph = ref()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const currentYear = ref<number>(new Date().getFullYear() - 1)
const yearGrades = ref<number[]>([])
const labels = ref<string[]>([])
const showErrorForNotCompletedYear = ref<boolean>(false)
const errorForNotCompletedYear = ref<string>('')

let graphData: any
let graphConfig: any

const getGradesByYear = async (): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        year: currentYear.value.toString(),
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/getGradesByYear',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      yearGrades.value = data.data
      if (yearGrades.value.length == 3) {
        labels.value = ['First', 'Second', 'Third']
        createGraph(yearGrades.value, labels.value)
      } else {
        errorForNotCompletedYear.value = "The data isn't enough"
        showErrorForNotCompletedYear.value = true
      }
    } else {
      errorForNotCompletedYear.value = data.message
      showErrorForNotCompletedYear.value = true
    }
  } catch (err) {
    console.log(err)
  }
}

const createGraph = (data: number[], labels: string[]) => {
  graphData = {
    labels: labels,
    datasets: [
      {
        label: 'Grade',
        backgroundColor: 'rgba(0,0,0)',
        borderColor: 'rgba(0,0,0)',
        data: data,
      },
    ],
  }
  graphConfig = {
    type: 'line',
    data: graphData,
    options: {},
  }

  let graph = new Chart(statisticsGraph.value, graphConfig)
}

getGradesByYear()
</script>

<style>
@media only screen and (max-width: 991px) {
  #statisticsCard {
    width: 80% !important;
  }
  #errorForNotCompletedYearModal {
    width: 100% !important;
  }
}
</style>
