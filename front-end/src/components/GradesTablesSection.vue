<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-start">
    <h3 class="ms-5 mt-5">Grades Tables</h3>
    <p class="h5 ms-5">Manage Your Grades Tables</p>
    <hr class="w-100" />
  </div>

  <div class="w-100 mt-4 d-flex flex-column justify-content-center align-items-center">
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <router-link :to="{ path: '/createTable' }" class="btn btn-dark w-25"
        >Create New Table</router-link
      >
      <button class="btn btn-dark w-25 mt-1" @click="resetFiltrations">Reset</button>
    </div>

    <div class="d-flex flex-md-row flex-column justify-content-center align-items-center w-75 mt-2">
      <select class="form-select text-black ms-1 mt-1" v-model="gradesTablesYear">
        <option value="Filter By Year" selected disabled>Filter By Year</option>
        <option v-for="year in userGradesTablesYears" :value="year">{{ year }}</option>
      </select>

      <select class="form-select text-black ms-1 mt-1" v-model="gradesTablesTrimester">
        <option value="Filter By Trimester" selected disabled>Filter By Trimester</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>

    <hr class="w-100 mt-4" />
  </div>

  <div
    class="w-100 d-flex flex-md-row flex-column flex-wrap justify-content-center align-items-center"
    id="tables"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center p-3 border rounded me-2 ms-2 mt-2 col-6"
      style="width: 30%"
      id="gradesTable"
      v-motion-pop-visible
      v-for="gradesTable in userGradesTables"
    >
      <h5>Year: {{ gradesTable.userGradesTableYear }}</h5>
      <h5>Term: {{ gradesTable.userGradesTableTrim }}</h5>
      <h5>Grade: {{ gradesTable.userGradesAverage }}%</h5>
      <hr class="w-100" />
      <router-link :to="{ path: '/table/' + gradesTable._id }" class="btn btn-dark w-100"
        >View Details</router-link
      >
      <button class="btn btn-danger w-100 mt-1" @click="deleteTable(gradesTable._id)">
        Delete
      </button>
    </div>

    <div
      class="d-flex flex-row justify-content-center align-items-center p-5 mt-2 shadow rounded"
      v-motion-fade
      v-if="showNotFoundGradesTablesMessage"
    >
      <h3 class="text-black">No tables were found</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useGradesTablesStore } from '@/store'

const gradesTablesStore = useGradesTablesStore()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const showDeleteTableError = ref<boolean>(false)
const deleteTableError = ref<string>('')
const userGradesTables = ref<userGradesTablesInterface[]>([])
const gradesTablesYear = ref<string>('Filter By Year')
const gradesTablesTrimester = ref<string>('Filter By Trimester')

interface userGradesTablesInterface {
  _id: string
  userId: string
  userSubjects: string[]
  userGradesTableTrim: string
  userGradesTableYear: string
  userGradesTable: string[]
  userGradesAverage: number
}

const userGradesTablesYears = computed(() => {
  return gradesTablesStore.userGradesTablesYears
})

const showNotFoundGradesTablesMessage = computed((): boolean => {
  if (
    userGradesTables.value.length == 0 &&
    (gradesTablesTrimester.value != 'Filter By Trimester' ||
      gradesTablesYear.value != 'Filter By Year')
  ) {
    return true
  } else {
    return false
  }
})

const resetFiltrations = (): void => {
  gradesTablesYear.value = 'Filter By Year'
  gradesTablesTrimester.value = 'Filter By Trimester'
  getTables()
}

const getTables = async (): Promise<void> => {
  try {
    const requestOptions: any = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/getGradesTables/' + userId.value,
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      userGradesTables.value = data.data.userGradesTables
    }
  } catch (err) {
    console.log(err)
  }
}

watch(gradesTablesYear, async (newGradesTablesYear, oldGradesTablesYear): Promise<void> => {
  if (
    gradesTablesTrimester.value != 'Filter By Trimester' &&
    newGradesTablesYear != 'Filter By Year'
  ) {
    const requestOptions: any = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        yearFiltration: newGradesTablesYear,
        trimesterFiltration: gradesTablesTrimester.value,
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/getFilteredGradesTables',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      userGradesTables.value = data.data
    }
  } else if (
    gradesTablesTrimester.value == 'Filter By Trimester' &&
    newGradesTablesYear != 'Filter By Year'
  ) {
    const requestOptions: any = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        yearFiltration: newGradesTablesYear,
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/getFilteredGradesTables',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      userGradesTables.value = data.data
    }
  }
})

watch(
  gradesTablesTrimester,
  async (newGradesTablesTrimester, oldGradesTablesTrimester): Promise<void> => {
    if (
      gradesTablesYear.value != 'Filter By Year' &&
      newGradesTablesTrimester != 'Filter By Trimester'
    ) {
      const requestOptions: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
        body: JSON.stringify({
          userId: userId.value,
          yearFiltration: gradesTablesYear.value,
          trimesterFiltration: newGradesTablesTrimester,
        }),
      }

      const response = await fetch(
        'http://127.0.0.1:3000/grades-management/getFilteredGradesTables',
        requestOptions,
      )
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        userGradesTables.value = data.data
      }
    } else if (
      gradesTablesYear.value == 'Filter By Year' &&
      newGradesTablesTrimester != 'Filter By Trimester'
    ) {
      const requestOptions: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
        body: JSON.stringify({
          userId: userId.value,
          trimesterFiltration: newGradesTablesTrimester,
        }),
      }

      const response = await fetch(
        'http://127.0.0.1:3000/grades-management/getFilteredGradesTables',
        requestOptions,
      )
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        userGradesTables.value = data.data
      }
    }
  },
)

const deleteTable = async (gradesTableId: string): Promise<void> => {
  try {
    const requestOptions: any = {
      method: 'DELETE',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        tableId: gradesTableId,
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/deleteGradesTable',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      window.location.reload()
    } else {
      deleteTableError.value = data.message
      showDeleteTableError.value = true
      setTimeout(() => (showDeleteTableError.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}

gradesTablesStore.getTablesYears()
getTables()
</script>

<style scoped>
@media only screen and (max-width: 991px) {
  #gradesTable {
    width: 80% !important;
  }
}
</style>
