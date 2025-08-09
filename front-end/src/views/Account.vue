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
              style="background-color: rgb(52, 52, 52)"
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
          <h3 class="ms-5 mt-5">{{ userInfo[0].username }}</h3>
          <p class="h5 ms-5">{{ userInfo[0].email }}</p>
          <hr class="w-100" />
        </div>

        <div class="w-100 d-flex flex-column justify-content-start align-items-start">
          <button
            class="btn btn-dark w-25 ms-5"
            v-if="showUserSubjects == false"
            @click="showUserSubjectsList"
          >
            Show Subjects List
          </button>
          <button
            class="btn btn-dark w-25 ms-5"
            v-else="showUserSubjects"
            @click="showUserSubjectsList"
          >
            Close Subjects List
          </button>
          <button
            class="btn btn-dark w-25 ms-5 mt-1"
            data-bs-toggle="modal"
            data-bs-target="#addNewSubjectModal"
          >
            Add New Subject
          </button>
          <hr class="w-100" />
        </div>

        <transition name="bounce" class="w-100">
          <div
            class="w-100 d-flex flex-column justify-content-start align-items-center p-3"
            v-if="showUserSubjects"
          >
            <ul class="list-group mx-5 border rounded shadow p-2 w-50" id="subjectsList">
              <li
                class="list-group-item d-flex flex-row justify-content-between align-items-center"
                v-for="subject in userInfo[0].userSubjects"
              >
                <h5>{{ subject }}</h5>
                <div class="d-flex flex-row justify-content-center align-items-center">
                  <button class="btn btn-danger" @click="deleteSubject(subject)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

    <div
      class="modal fade"
      id="addNewSubjectModal"
      tabindex="-1"
      aria-labelledby="addNewSubjectModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addNewSubjectModalLabel">Add New Subject</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex flex-column justify-content-center align-items-center w-100"
          >
            <transition name="bounce">
              <div
                class="alert alert-danger w-100 text-center"
                role="alert"
                v-if="showCreateSubjectError"
              >
                {{ createSubjectError }}
              </div>
            </transition>

            <div class="form-floating w-100">
              <input
                type="text"
                class="form-control"
                placeholder="Subject"
                id="addNewSubjectInput"
                v-model="newSubject"
              />
              <label for="addNewSubjectInput">Subject</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-dark" @click="createSubject">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const store = useUserStore()
const router = useRouter()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const showUserSubjects = ref<boolean>(false)
const newSubject = ref<string>('')
const showCreateSubjectError = ref<boolean>(false)
const createSubjectError = ref<string>('')
const showDeleteSubjectError = ref<boolean>(false)
const deleteSubjectError = ref<string>('')

const userInfo = computed(() => {
  return store.userInfo
})

const showUserSubjectsList = () => {
  showUserSubjects.value = !showUserSubjects.value
}

const createSubject = async (): Promise<void> => {
  try {
    if (newSubject.value != '') {
      const requestOptions: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
        body: JSON.stringify({
          userId: userId.value,
          newSubject: newSubject.value,
        }),
      }

      const response = await fetch(
        'http://127.0.0.1:3000/subjects-management/createSubject',
        requestOptions,
      )
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        window.location.reload()
      } else {
        createSubjectError.value = data.message
        showCreateSubjectError.value = true
        setTimeout(() => (showCreateSubjectError.value = false), 3000)
      }
    } else {
      createSubjectError.value = 'Please fill the field'
      showCreateSubjectError.value = true
      setTimeout(() => (showCreateSubjectError.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}

const deleteSubject = async (subject: string): Promise<void> => {
  try {
    const requestOptions: any = {
      method: 'DELETE',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        subject: subject,
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/subjects-management/deleteSubject',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      window.location.reload()
    } else {
      deleteSubjectError.value = data.message
      showDeleteSubjectError.value = true
      setTimeout(() => (showDeleteSubjectError.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
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

store.getUserInfo()
</script>

<style scoped>
@media only screen and (max-width: 991px) {
  #subjectsList {
    width: 100% !important;
  }
}
</style>
