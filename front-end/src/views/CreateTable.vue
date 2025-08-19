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
          <div
            class="w-100 d-flex flex-column justify-content-center align-items-center"
            v-if="userInfo[0].userAccountPicture"
          >
            <img
              :src="userInfo[0].userAccountPicture"
              alt="profile-photo"
              class="img-fluid"
              style="width: 41%; height: 97%; border-radius: 50%"
            />
            <h6 class="text-center text-white mt-2">{{ userInfo[0].username }}</h6>
          </div>
          <div class="w-100 d-flex flex-column justify-content-center align-items-center" v-else>
            <h5 class="text-center text-white mt-2">{{ userInfo[0].username }}</h5>
            <h5 class="text-center text-white mt-2">{{ userInfo[0].email }}</h5>
          </div>
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

        <div
          class="w-100 d-flex flex-column justify-content-center align-items-center"
          style="height: 19%"
        >
          <hr class="w-100 text-white" />
          <button class="btn btn-outline-danger w-75" @click="logout">Logout</button>
        </div>
      </div>

      <div
        class="h-100 overflow-y-auto text-black d-flex flex-column justify-content-start align-items-center"
        style="width: 84%"
        id="dashboard"
      >
        <div class="w-100 d-flex flex-column justify-content-center align-items-start">
          <h3 class="ms-5 mt-5">Create New Table</h3>
          <hr class="w-100" />
        </div>

        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-3">
          <div class="btn-group w-75">
            <button class="btn btn-dark w-25" :disabled="currentStage != 'Subjects'">
              Subjects
            </button>
            <button class="btn btn-dark w-25" :disabled="currentStage != 'Grades'">Grades</button>
            <button class="btn btn-dark w-25" :disabled="currentStage != 'Create'">Create</button>
          </div>
        </div>

        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-3">
          <Subjects v-if="currentStage == 'Subjects'" @get-checked-subjects="gradesStage" />
          <Grades
            v-if="currentStage == 'Grades'"
            :checkedSubjects="checkedSubjects"
            @get-create-grades-table-requirements="createStage"
          />
          <Create
            v-if="currentStage == 'Create'"
            :createGradesTableRequirements="createGradesTableRequirements"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/index'
import Subjects from '@/components/CreateTablePage/Subjects.vue'
import Grades, {
  type createGradesTableRequirementsInterface,
} from '@/components/CreateTablePage/Grades.vue'
import Create from '@/components/CreateTablePage/Create.vue'

const userStore = useUserStore()
const router = useRouter()
const userId = ref<string | null>(localStorage.getItem('userId'))
const currentStage = ref<string | null>('Subjects')
const checkedSubjects = ref<string[]>([])
const createGradesTableRequirements = ref<createGradesTableRequirementsInterface>()

const userInfo = computed(() => {
  return userStore.userInfo
})

const gradesStage = (subjectsList: string[]): void => {
  checkedSubjects.value = subjectsList
  currentStage.value = 'Grades'
}

const createStage = (
  createGradesTableRequirementsObject: createGradesTableRequirementsInterface,
): void => {
  createGradesTableRequirements.value = createGradesTableRequirementsObject
  currentStage.value = 'Create'
}

const logout = async (): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
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

userStore.getUserInfo()
</script>

<style>
@media only screen and (max-width: 991px) {
  .operationResultModal {
    width: 100% !important;
  }
}

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
