<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 200 }"
    :visibleOnce="{ opacity: 1, y: 0 }"
    class="w-100 d-flex flex-column justify-content-center align-items-center"
  >
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <div
        class="w-100 my-3 d-flex flex-md-row flex-column justify-content-center align-items-center"
      >
        <div
          class="p-4 mx-2 mt-1 border rounded d-flex flex-column justify-content-start align-items-start gradesTableDetailsCards"
          style="width: 25%"
        >
          <h4 class="mb-0">Grades Table Year</h4>
          <h5 class="mb-0 mt-2">{{ props.createGradesTableRequirements.gradesTableYear }}</h5>
        </div>
        <div
          class="p-4 mx-2 mt-1 border rounded d-flex flex-column justify-content-start align-items-start gradesTableDetailsCards"
          style="width: 25%"
        >
          <h4 class="mb-0">Grades Table Trimester</h4>
          <h5 class="mb-0 mt-2">{{ props.createGradesTableRequirements.gradesTableTrimester }}</h5>
        </div>
      </div>

      <div
        class="w-75 border rounded d-flex flex-row justify-content-center align-items-center my-3"
      >
        <table class="table table-hover w-100">
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="grade in props.createGradesTableRequirements.gradesTable">
              <td>{{ grade.subject }}</td>
              <td>{{ grade.grade }}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr class="w-100" />

      <div class="w-100 d-flex flex-row justify-content-center align-items-center">
        <button class="btn btn-dark w-50 mt-1" @click="createGradesTable" v-if="loading == false">
          Create
        </button>
        <button
          class="btn btn-dark w-50 mt-1 d-flex flex-row justify-content-center align-items-center"
          disabled
          v-else
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden mb-0">Loading...</span>
          </div>
        </button>
      </div>
    </div>
  </div>

  <transition-group name="slideUp">
    <div
      class="toast bg-white d-block position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="bottom: 3%; right: 1%"
      v-if="showSuccessModal"
    >
      <div class="toast-header">
        <strong class="me-auto">Success</strong>
      </div>
      <div class="toast-body">✅ Operation Completed</div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, type Router } from 'vue-router'

const router: Router = useRouter()
const props = defineProps(['createGradesTableRequirements'])
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const showSuccessModal = ref<boolean>(false)
const loading = ref<boolean>(false)

const createGradesTable = async (): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        userGradesTableYear: props.createGradesTableRequirements.gradesTableYear.toString(),
        userGradesTableTrimester:
          props.createGradesTableRequirements.gradesTableTrimester.toString(),
        userGradesTable: props.createGradesTableRequirements.gradesTable,
      }),
    }

    loading.value = true
    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/createGradesTable',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      loading.value = false
      showSuccessModal.value = true
      setTimeout(() => router.push({ path: '/tables' }), 2000)
    } else if (data.statusCode == 403) {
      loading.value = false
      router.push({ path: '/registration' })
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style>
@media only screen and (max-width: 991px) {
  .gradesTableDetailsCards {
    width: 80% !important;
  }
}
</style>
