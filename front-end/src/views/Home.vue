<template>
  <div class="h-100 text-white">
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

    <div class="vh-100 w-100 d-flex flex-row justify-content-start align-items-center m-0">
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
              style="background-color: rgb(52, 52, 52)"
            >
              <i class="bi bi-house mb-0 me-1"></i>
              <h6 class="mb-0 ms-1 d-lg-block d-none">Home</h6>
            </div></router-link
          >
          <router-link :to="{ path: '/tables' }" class="h6 mb-0 text-decoration-none w-100">
            <div
              class="w-100 text-center text-white d-flex flex-row justify-content-center align-items-center p-3 another-section"
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
        class="h-100 text-black d-flex flex-column justify-content-start align-items-start"
        style="width: 84%"
        id="dashboard"
      >
        <div class="w-100 d-flex flex-column justify-content-center align-items-start">
          <h3 class="ms-5 mt-5">Statistics</h3>
          <p class="h5 ms-5">Take A Look At Your Statistics</p>
          <hr class="w-100" />
        </div>

        <div class="w-100 mt-4 d-flex flex-column justify-content-center align-items-center">
          <div
            class="d-flex flex-md-row flex-column justify-content-center align-items-center w-75"
          >
            <select class="form-select text-black ms-1 mt-1" v-model="filtrationBySubject">
              <option value="Filter By Subject" selected disabled>Filter By Subject</option>
              <option v-for="subject in userInfo[0].userSubjects" :value="subject">
                {{ subject }}
              </option>
            </select>

            <select class="form-select text-black ms-1 mt-1" v-model="filtrationByYear">
              <option value="Filter By Year" selected disabled>Filter By Year</option>
              <option v-for="year in lastFiveYears" :value="year">{{ year }}</option>
            </select>

            <select class="form-select text-black ms-1 mt-1" v-model="filtrationByTrimester">
              <option value="Filter By Trimester" selected disabled>Filter By Trimester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div class="d-flex flex-row justify-content-center align-items-center w-100">
            <button class="btn btn-dark w-25 ms-1 mt-3" @click="resetFiltrations">Reset</button>
          </div>
          <hr class="w-100" />
        </div>

        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
          No information was found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()
const store = useUserStore()
const userId = ref<string | null>(localStorage.getItem('userId'))
const lastFiveYears = ref<number[]>([])
const currentYear = ref<number>(new Date().getFullYear())

const filtrationBySubject = ref<string>('Filter By Subject')
const filtrationByYear = ref<string>('Filter By Year')
const filtrationByTrimester = ref<string>('Filter By Trimester')

const userInfo = computed(() => {
  return store.userInfo
})

const getLastFiveYears = () => {
  for (let i = 0; i <= 5; i++) {
    lastFiveYears.value.push(currentYear.value - i)
  }
}

const resetFiltrations = () => {
  filtrationBySubject.value = 'Filter By Subject'
  filtrationByYear.value = 'Filter By Year'
  filtrationByTrimester.value = 'Filter By Trimester'
}

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

getLastFiveYears()
store.getUserInfo()
</script>

<style>
.another-section {
  transition: all 0.7s ease;
}

.another-section:hover {
  background-color: rgb(52, 52, 52);
  cursor: pointer;
}

@media only screen and (max-width: 991px) {
  #dashboard {
    width: 100% !important;
  }
}
</style>
