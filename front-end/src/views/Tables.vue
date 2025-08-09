<template>
  <div class="h-100 text-black">
    <nav class="navbar navbar-expand-lg bg-black bg-gradient text-white d-md-none d-block">
      <div class="container-fluid text-white">
        <a class="navbar-brand text-white"
          >Abouda Grades <br />
          Management System</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-theme="light"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" data-bs-theme="light"></span>
        </button>
        <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-white">
            <li class="nav-item">
              <router-link class="nav-link text-white active" :to="{ path: '/' }">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="{ path: '/tables' }"
                >Tables</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="{ path: '/account' }"
                >Account</router-link
              >
            </li>
            <li class="nav-item text-danger" style="cursor: pointer" @click="logout">Logout</li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="vh-100 w-100 d-flex flex-row justify-content-center align-items-center m-0">
      <div
        class="bg-black bg-gradient shadow d-none d-md-flex flex-column justify-content-start align-items-center h-100"
        style="width: 16%"
      >
        <div class="w-100 d-flex flex-column justify-content-center align-items-center">
          <h5 class="text-white text-center mt-4">
            Abouda Grades <br />
            Management System
          </h5>
          <hr class="w-100 text-white" />
        </div>

        <div class="w-100 d-flex flex-column justify-content-center align-items-center mb-3">
          <img
            src="../images/Abouda-AN.jpg"
            alt="profile-photo"
            class="img-fluid"
            style="width: 41%; height: 97%; border-radius: 50%"
          />
          <h6 class="text-center text-white mt-2">{{ userInfo[0].username }}</h6>
        </div>

        <div
          class="w-100 d-flex flex-column justify-content-start align-items-center mt-5"
          style="height: 54%"
        >
          <router-link :to="{ path: '/' }" class="h6 mb-0 text-decoration-none w-100">
            <div
              class="w-100 text-center text-white d-flex flex-row justify-content-center align-items-center p-3 another-section"
            >
              <i class="bi bi-house mb-0 me-1"></i>
              <h6 class="mb-0 ms-1 d-lg-block d-none">Home</h6>
            </div></router-link
          >
          <router-link :to="{ path: '/tables' }" class="h6 mb-0 text-decoration-none w-100">
            <div
              class="w-100 text-center text-white d-flex flex-row justify-content-center align-items-center p-3 another-section"
              style="background-color: rgb(52, 52, 52)"
            >
              <i class="bi bi-table mb-0 me-1"></i>
              <h6 class="mb-0 ms-1 d-lg-block d-none">Tables</h6>
            </div>
          </router-link>
          <router-link :to="{ path: '/account' }" class="h6 mb-0 text-decoration-none w-100"
            ><div
              class="w-100 text-center text-white d-flex flex-row justify-content-center align-items-center p-3 another-section"
            >
              <i class="bi bi-person-circle mb-0 me-1"></i>
              <h6 class="mb-0 ms-1 d-lg-block d-none">Account</h6>
            </div></router-link
          >
        </div>

        <div class="w-100 d-flex flex-column justify-content-center align-items-center">
          <hr class="w-100 text-white" />
          <button class="btn btn-outline-danger w-75" @click="logout">Logout</button>
        </div>
      </div>

      <div
        class="h-100 overflow-y-auto text-black d-flex flex-column justify-content-start align-items-start"
        style="width: 84%"
        id="dashboard"
      >
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

          <div
            class="d-flex flex-md-row flex-column justify-content-center align-items-center w-75 mt-2"
          >
            <select class="form-select text-black ms-1 mt-1" v-model="gradesTablesYear">
              <option value="Filter By Year" selected disabled>Filter By Year</option>
              <option v-for="year in lastFiveYears" :value="year">{{ year }}</option>
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
          <GradesTable v-for="gradesTable in userGradesTables" :gradesTable="gradesTable" />

          <div
            class="d-flex flex-row justify-content-center align-items-center p-5 mt-2 shadow rounded"
            v-motion-fade
            v-if="showNotFoundGradesTablesMessage"
          >
            <h3 class="text-black">No tables were found</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import GradesTable from '@/components/GradesTableCard.vue'

const store = useUserStore()
const router = useRouter()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const userGradesTables = ref<string[] | object[]>([])
const lastFiveYears = ref<number[]>([])
const currentYear = ref<number>(new Date().getFullYear())
const gradesTablesYear = ref<string>('Filter By Year')
const gradesTablesTrimester = ref<string>('Filter By Trimester')

const userInfo = computed(() => {
  return store.userInfo
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

const getLastFiveYears = (): void => {
  for (let i = 0; i <= 5; i++) {
    lastFiveYears.value.push(currentYear.value - i)
  }
}

const resetFiltrations = () => {
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
  if (gradesTablesTrimester.value != 'Filter By Trimester') {
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
  } else if (gradesTablesTrimester.value == 'Filter By Trimester') {
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
    if (gradesTablesYear.value != 'Filter By Year') {
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
    } else if (gradesTablesYear.value == 'Filter By Year') {
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

const logout = async (): Promise<void> => {
  try {
    const requestInfo: any = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }

    const response = await fetch(
      'http://127.0.0.1:3000/registration/logout/' + userId.value,
      requestInfo,
    )
    const data = await response.json()

    if (data.statusCode >= 200 && data.statusCode < 300) {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('userId')
      router.push({ path: '/registration' })
    }
  } catch (err) {
    console.log(err)
  }
}

store.getUserInfo()
getLastFiveYears()
getTables()
</script>
