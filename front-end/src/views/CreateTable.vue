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
        class="h-100 text-black d-flex flex-column justify-content-start align-items-center"
        style="width: 84%"
        id="dashboard"
      >
        <div class="w-100 d-flex flex-column justify-content-center align-items-start">
          <h3 class="ms-5 mt-5">Create New Table</h3>
          <hr class="w-100" />
        </div>

        <div
          class="w-75 d-flex flex-md-row flex-column justify-content-center align-items-center p-3"
        >
          <select class="form-select ms-1 mt-1" v-model="gradesTableYear">
            <option value="Select A Year" selected disabled>Select A Year</option>
            <option v-for="year in lastFiveYears" :value="year">{{ year }}</option>
          </select>

          <select class="form-select ms-1 mt-1" v-model="gradesTableTrimester">
            <option value="Select A Trimester" selected disabled>Select A Trimester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <hr class="w-100" />

        <div
          class="w-75 d-flex flex-md-row flex-column flex-wrap justify-content-center align-items-center p-3"
        >
          <div class="w-100 d-flex flex-row justify-content-center align-items-center mb-1">
            <h6 v-if="changeTheNoteColorToRed == false" class="text-center">
              The grade must be less than 100 <br />
              and more than 0
            </h6>
            <h6 v-else="changeTheNoteColorToRed" class="text-danger text-center">
              The grade must be less than 100 <br />
              and more than 0
            </h6>
          </div>

          <div class="form-floating mb-1 ms-1 w-50">
            <input
              type="number"
              class="form-control"
              id="subject_grade"
              placeholder="Subject Grade"
              v-model="subjectGrade"
              :disabled="disableSubjectGradeInputAndButton"
            />
            <label for="subject_grade">{{
              userInfo[0].userSubjects[currentUserSubjectGrade]
            }}</label>
          </div>
        </div>

        <div class="w-100 d-flex flex-row justify-content-center align-items-center">
          <button
            class="btn btn-dark w-25"
            @click="setGradeForNextSubject"
            v-if="userInfo[0].userSubjects[currentUserSubjectGrade + 1] != undefined"
          >
            {{ userInfo[0].userSubjects[currentUserSubjectGrade + 1] }}
            <i class="bi bi-arrow-right"></i>
          </button>
          <button
            class="btn btn-dark w-25"
            :disabled="disableSubjectGradeInputAndButton"
            @click="setUserGrades"
            v-if="userInfo[0].userSubjects[currentUserSubjectGrade + 1] == undefined"
          >
            Done
          </button>
        </div>

        <hr class="w-100" />

        <div class="w-100 d-flex flex-row justify-content-center align-items-center mb-1">
          <button class="btn btn-dark w-50" @click="resetInputs">Reset</button>
        </div>

        <div class="w-100 d-flex flex-row justify-content-center align-items-center">
          <button class="btn btn-dark w-50" @click="createTable">Create</button>
        </div>

        <transition name="bounce">
          <div
            class="w-75 d-flex flex-row justify-content-center align-items-center mt-5"
            v-if="showErrorModel"
          >
            <div
              class="w-50 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
            >
              <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
                <h5 class="text-center">Operation Failed ❌</h5>
              </div>

              <hr class="w-100" />

              <div class="w-100 d-flex flex-row justify-content-center align-items-center">
                <h6 class="text-center">{{ errorForCreationOperation }}</h6>
              </div>
            </div>
          </div>
        </transition>

        <div
          class="w-100 d-flex flex-row justify-content-center align-items-center mt-5"
          v-if="showSuccessModel"
        >
          <div
            class="w-25 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
            v-motion-pop-visible
          >
            <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
              <h4>Operation Completed ✅</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/index.ts'

const store = useUserStore()
const router = useRouter()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const lastFiveYears = ref<number[]>([])
const currentYear = ref<number>(new Date().getFullYear())
const currentUserSubjectGrade = ref<number | any>(0)
const gradesTableYear = ref<string>('Select A Year')
const gradesTableTrimester = ref<string>('Select A Trimester')
const subjectGrade = ref<number>(0)
const gradesTable = ref<number[]>([])
const disableSubjectGradeInputAndButton = ref<boolean>(false)
const showErrorModel = ref<boolean>(false)
const showSuccessModel = ref<boolean>(false)
const errorForCreationOperation = ref<string>('')

const userInfo: any = computed(() => {
  return store.userInfo
})

const changeTheNoteColorToRed = computed(() => {
  if (subjectGrade.value > 100 || subjectGrade.value < 0) {
    return true
  } else {
    return false
  }
})

const getLastFiveYears = () => {
  for (let i = 0; i <= 5; i++) {
    lastFiveYears.value.push(currentYear.value - i)
  }
}

const resetInputs = () => {
  gradesTable.value = []
  currentUserSubjectGrade.value = 0
  subjectGrade.value = 0
  gradesTableYear.value = 'Select A Year'
  gradesTableTrimester.value = 'Select A Trimester'
  disableSubjectGradeInputAndButton.value = false
}

const setGradeForNextSubject = () => {
  if (subjectGrade.value <= 100 && subjectGrade.value > 0) {
    gradesTable.value.push(subjectGrade.value)
    subjectGrade.value = 0
    currentUserSubjectGrade.value += 1
  }
}

const setUserGrades = () => {
  gradesTable.value.push(subjectGrade.value)
  disableSubjectGradeInputAndButton.value = true
}

const createTable = async (): Promise<void> => {
  try {
    if (
      gradesTableYear.value != 'Select A Year' &&
      gradesTableTrimester.value != 'Select A Trimester'
    ) {
      const requestOptions: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
        body: JSON.stringify({
          userId: userId.value,
          userGradesYear: gradesTableYear.value,
          userGradesTrim: gradesTableTrimester.value,
          userGrades: gradesTable.value,
        }),
      }

      const response = await fetch(
        'http://127.0.0.1:3000/grades-management/createGradesTable',
        requestOptions,
      )
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        showSuccessModel.value = true
        setTimeout(() => router.push({ path: '/tables' }), 2000)
      } else {
        errorForCreationOperation.value = data.message
        showErrorModel.value = true
        setTimeout(() => (showErrorModel.value = false), 3000)
      }
    } else {
      errorForCreationOperation.value = 'Please fill the fields'
      showErrorModel.value = true
      setTimeout(() => (showErrorModel.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}

const logout = async (): Promise<void> => {
  try {
    const requestOptions: any = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }

    const response = await fetch(
      'http://127.0.0.1:3000/registration/logout/' + userId.value,
      requestOptions,
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
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
