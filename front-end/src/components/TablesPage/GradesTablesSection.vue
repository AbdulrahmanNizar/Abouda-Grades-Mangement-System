<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-start">
    <h3 class="ms-5 mt-5">Grades Tables</h3>
    <p class="h5 ms-5">Manage Your Grades Tables</p>
    <hr class="w-100" />
  </div>

  <div class="w-100 mt-4 d-flex flex-column justify-content-center align-items-center">
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <router-link :to="{ path: '/createTable' }" class="btn btn-dark w-50"
        >Create New Table</router-link
      >
      <button class="btn btn-dark w-50 mt-1" @click="resetFiltrations">Reset</button>
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
      class="d-flex flex-column justify-content-center align-items-center p-3 border rounded me-2 ms-2 mt-2"
      style="width: 30%"
      id="gradesTable"
      v-motion-pop-visible
      v-for="gradesTable in userGradesTables"
    >
      <h5>Year: {{ gradesTable.userGradesTableYear }}</h5>
      <h5>Trimester: {{ gradesTable.userGradesTableTrimester }}</h5>
      <h5>Grade: {{ gradesTable.userGradesAverage }}%</h5>
      <hr class="w-100" />
      <router-link :to="{ path: '/table/' + gradesTable._id }" class="btn btn-dark w-100"
        >View Details</router-link
      >
      <router-link :to="{ path: '/editTable/' + gradesTable._id }" class="btn btn-dark w-100 mt-1"
        >Edit</router-link
      >
      <button
        class="btn btn-danger w-100 mt-1"
        @click="setDeleteGradesTableIntention(gradesTable._id)"
      >
        Delete
      </button>
    </div>

    <transition-group name="slideUp">
      <div
        class="d-flex flex-row justify-content-center align-items-center p-5 mt-2 shadow rounded"
        v-if="showNotFoundGradesTablesMessage"
      >
        <h3 class="text-black">No tables were found</h3>
      </div>

      <div
        class="toast bg-white d-block position-fixed"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style="bottom: 3%; right: 1%"
        v-if="showDeleteTableModal"
      >
        <div class="toast-header w-100">
          <strong class="me-auto h6 mb-0 w-100 text-center">Are You Sure</strong>
        </div>
        <div class="toast-body d-flex flex-row justify-content-center align-items-center w-100">
          <button class="btn btn-dark me-1" @click="cancelDeleteGradesTableIntention">
            Cancel
          </button>
          <button class="btn btn-danger" @click="deleteTable" v-if="loading == false">
            Delete
          </button>
          <button
            class="btn btn-danger d-flex flex-row justify-content-center align-items-center"
            disabled
            v-else
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden mb-0">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { useGradesTablesStore } from '@/store'

const router: Router = useRouter()
const gradesTablesStore = useGradesTablesStore()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const showDeleteTableError = ref<boolean>(false)
const deleteTableError = ref<string>('')
const userGradesTables = ref<userGradesTablesInterface[]>([])
const gradesTablesYear = ref<string>('Filter By Year')
const gradesTablesTrimester = ref<string>('Filter By Trimester')
const loading = ref<boolean>(false)
const showDeleteTableModal = ref<boolean>(false)
const deleteGradesTableId = ref<string>('')

interface userGradesTablesInterface {
  _id: string
  userId: string
  userSubjects: string[]
  userGradesTableTrimester: string
  userGradesTableYear: string
  userGradesTable: string[]
  userGradesAverage: number
}

const userGradesTablesYears = computed(() => {
  return gradesTablesStore.userGradesTablesYears.sort((a, b) => Number(b) - Number(a))
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
    const requestOptions: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/getGradesTables?userId=' + userId.value,
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      userGradesTables.value = data.data
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
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
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
    } else if (data.statusCode == 403) {
      router.push({ path: '/registration' })
    }
  } else if (
    gradesTablesTrimester.value == 'Filter By Trimester' &&
    newGradesTablesYear != 'Filter By Year'
  ) {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
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
    } else if (data.statusCode == 403) {
      router.push({ path: '/registration' })
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
      const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
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
      } else if (data.statusCode == 403) {
        router.push({ path: '/registration' })
      }
    } else if (
      gradesTablesYear.value == 'Filter By Year' &&
      newGradesTablesTrimester != 'Filter By Trimester'
    ) {
      const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
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
      } else if (data.statusCode == 403) {
        router.push({ path: '/registration' })
      }
    }
  },
)

const setDeleteGradesTableIntention = (gradesTableId: string): void => {
  deleteGradesTableId.value = gradesTableId
  showDeleteTableModal.value = true
}

const cancelDeleteGradesTableIntention = (): void => {
  deleteGradesTableId.value = ''
  showDeleteTableModal.value = false
}

const deleteTable = async (): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        tableId: deleteGradesTableId.value,
      }),
    }

    loading.value = true
    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/deleteGradesTable',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      loading.value = false
      window.location.reload()
    } else if (data.statusCode == 403) {
      router.push({ path: '/registration' })
    } else {
      loading.value = false
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
