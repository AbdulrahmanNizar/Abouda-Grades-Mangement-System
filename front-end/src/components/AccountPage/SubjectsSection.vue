<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-center mb-1">
    <h3 class="mb-1">Subjects ({{ searchSubjectResult.length }})</h3>
    <p class="mb-0">Manage Your Subjects</p>
    <hr class="w-100" />
  </div>

  <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-1">
    <button
      class="btn btn-dark w-50 mb-1"
      data-bs-toggle="modal"
      data-bs-target="#addNewSubjectModal"
    >
      Add New Subject
    </button>

    <div class="form-floating w-50 mt-1">
      <input
        type="text"
        id="searchSubject"
        class="form-control"
        placeholder="Search Subject"
        v-model="searchSubject"
      />
      <label for="searchSubject">Search Subject</label>
    </div>

    <hr class="w-100" />
  </div>

  <div
    class="w-100 d-flex flex-md-row flex-column flex-wrap justify-content-center align-items-center"
  >
    <transition-group :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <div
        class="d-flex flex-column justify-content-center align-items-center p-3 border rounded me-2 ms-2 mt-2"
        style="width: 30%"
        id="subjectCard"
        v-motion-pop-visible
        v-for="subject in searchSubjectResult"
      >
        <h5 class="mb-0">{{ subject }}</h5>
        <hr class="w-100" />
        <button class="btn btn-danger w-100 mt-1" @click="setDeleteSubjectIntention(subject)">
          Delete
        </button>
      </div>
    </transition-group>
  </div>

  <transition-group name="slideUp">
    <div
      class="toast bg-white d-block position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="bottom: 3%; right: 1%"
      v-if="showDeleteSubjectModal"
    >
      <div class="toast-header w-100">
        <strong class="me-auto h6 mb-0 w-100 text-center">Are You Sure</strong>
      </div>
      <div class="toast-body d-flex flex-row justify-content-center align-items-center w-100">
        <button class="btn btn-dark me-1" @click="cancelDeleteSubjectIntention">Cancel</button>
        <button class="btn btn-danger" @click="deleteSubject" v-if="loading == false">
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { useSubjectsStore } from '@/store'
import gsap from 'gsap'

const userSubjectsStore = useSubjectsStore()
const router: Router = useRouter()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const showDeleteSubjectError = ref<boolean>(false)
const deleteSubjectError = ref<string>('')
const searchSubject = ref<string>('')
const deleteSubjectName = ref<string>('')
const showDeleteSubjectModal = ref<boolean>(false)
const loading = ref<boolean>(false)

const userSubjects = computed(() => {
  return userSubjectsStore.userSubjects
})

const searchSubjectResult = computed(() => {
  return userSubjects.value.filter((subject) =>
    subject.toLowerCase().includes(searchSubject.value.toLowerCase()),
  )
})

const deleteSubject = async (): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        subject: deleteSubjectName.value,
      }),
    }

    loading.value = true
    const response = await fetch(
      'http://127.0.0.1:3000/subjects-management/deleteSubject',
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
      deleteSubjectError.value = data.message
      showDeleteSubjectError.value = true
      setTimeout(() => (showDeleteSubjectError.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}

const setDeleteSubjectIntention = (subject: string): void => {
  deleteSubjectName.value = subject
  showDeleteSubjectModal.value = true
}

const cancelDeleteSubjectIntention = (): void => {
  deleteSubjectName.value = ''
  showDeleteSubjectModal.value = false
}

const onBeforeEnter = (el: any) => {
  el.style.opacity = 0
  el.style.height = 0
}

const onEnter = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}

const onLeave = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}

userSubjectsStore.getSubjects()
</script>

<style>
@media only screen and (max-width: 991px) {
  #subjectCard {
    width: 80% !important;
  }
}
</style>
